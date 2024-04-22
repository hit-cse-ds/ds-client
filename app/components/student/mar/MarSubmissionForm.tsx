import { Button, Select, SelectItem } from "@nextui-org/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { year } from "../moocs/data";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import {
  useMyMarQuery,
  useUploadMarMutation,
} from "@/redux/features/api/moocs/moocsApi";

type Props = {
  //this contain moocs course list
  marList: Array<{
    _id: string;
    category: string;
    perMarPoints: number;
    maximumMarPoints: number;
    maxFile: number;
  }>;
};
function checkIfFileAreTooBig(file?: any) {
  let valid = false;
  if (file) {
    const size = file.size;
    if (size <= 524288) {
      valid = true;
    }
  }
  return valid;
}

function checkIfFileAreCorrectType(file?: any) {
  let valid = false;
  if (file) {
    if ("application/pdf" === file.type) {
      valid = true;
    }
  }
  return valid;
}

const schema = Yup.object().shape({
  title: Yup.string().required("please Enter Title of Certificate!"),
  date: Yup.string().required("Please select certificate date!"),
  category: Yup.string().required("Please select mar category!"),
  year: Yup.string().required("select year!"),
  file: Yup.mixed()
    .nullable()
    .required("Select file")
    .test(
      "is-correct-file",
      "pdf should be less than 500kb.",
      checkIfFileAreTooBig
    )
    .test(
      "is-big-file",
      "Sorry, only PDF files are supported for upload",
      checkIfFileAreCorrectType
    ),
});

const MarSubmissionForm: FC<Props> = ({ marList }) => {
  const [uploadMar, { isSuccess, error, isLoading }] =
    useUploadMarMutation();

  const { refetch } = useMyMarQuery({}, { refetchOnMountOrArgChange: true });

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      category: "",
      year: "",
      file: null,
    },
    validationSchema: schema,
    onSubmit: async ({ title, category, year, file, date }) => {
      await uploadMar({
        title,
        date,
        category,
        year,
        file,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Submitted!");
      formik.resetForm();
      resetTitle();
      setDate(null);

      setFieldValue("year", null);
      // setLoadUser(true);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik;

  const [category, setCategory] = React.useState("");
  const [selectedCategoy, setSelectedCategory] = useState("");
  const [marPoint, setMarPoint] = React.useState<number | string>("");
  const [Date, setDate] = React.useState<dayjs.Dayjs | null>(null);

  const inputFile = useRef<HTMLInputElement>(null);

  const handleFileReset = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
    const categorySelect = marList.find(
      (category) => category._id === e.target.value
      );
    if (categorySelect) {
      setFieldValue("category", categorySelect._id, true);
      setCategory(categorySelect.category);
      setMarPoint(categorySelect.perMarPoints);
    } else {
      setFieldValue("category", "", true);
      setCategory("");
      setMarPoint("");
    }
  };

  const resetTitle = () => {
    setFieldValue("title", "", true);
    setCategory("");
    setMarPoint("");
    handleFileReset();
  };

  return (
    <div>
      <div className="gradient-bg flex py-2 justify-center items-center rounded-lg">
        <span className="font-semibold text-white">Mar Submission</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-2 bg-slate-100 py-3 px-2 my-2 overflow-hidden">
          <div className="col-span-12">
            <span className="font-semibold mx-2 mt-4">Add Mar Details :</span>
          </div>
          {/* Title Selector  */}
          <div className="flex flex-col col-span-4 max-800px:col-span-5 max-sm:col-span-12">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Event Name
            </span>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              id="title"
              placeholder="Enter Event Name"
              className={`
              input !mt-0 !bg-white text-[.88rem] `}
            />
            {errors.title && touched.title && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.title}
              </span>
            )}
          </div>

          {/* Category selector  */}
          <div className="flex flex-col col-span-3 max-800px:col-span-3 max-sm:col-span-7">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Category
            </span>
            <Select
              label=""
              className="w-full selector-white"
              placeholder="Select Category"
              id="title"
              name="title"
              value={values.category}
              onChange={(e: any) => {
                handleCategoryChange(e);
              }}
            >
              {marList &&
                marList.map((item) => (
                  <SelectItem key={item._id} value={item.category} className="" textValue={item.category}>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{item.category}</span>
                      <span className="text-tiny text-slate-600">Max : {item.maxFile}</span>
                    </div>
                    
                  </SelectItem>
                ))}
            </Select>
            {errors.category && touched.category && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.category}
              </span>
            )}
          </div>

          {/* Credit selector  */}
          <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-5">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Mar Points
            </span>
            <input
              disabled
              type="number"
              name=""
              value={marPoint}
              // onChange={handleChange}
              id="mar_point"
              placeholder="Mar Point"
              className={` input !mt-0 !bg-white text-[.88rem]`}
            />
          </div>

          <div className="col-span-12 grid gap-2 grid-cols-12">
            {/* Start Date selector  */}
            <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-6">
              <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
                Certificate Date
              </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDatePicker"]}>
                  <div className="date-picker-style">
                    <MobileDatePicker
                      name="startDate"
                      value={Date}
                      onChange={(date: any) => {
                        setFieldValue(
                          "date",
                          date ? dayjs(date).format("DD-MM-YYYY") : null,
                          true
                        );
                        setDate(date);
                        // alert(date ? dayjs(date).format('DD-MM-YYYY'): null);
                      }}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
              {errors.date && touched.date && (
                <span className="text-red-500 pt-2 block text-tiny mx-1">
                  {errors.date}
                </span>
              )}
            </div>

            {/* Year selector  */}
            <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-4">
              <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*'] ">
                Year
              </span>
              <Select
                label=""
                className="w-full  selector-white"
                placeholder="Select Year"
                id="year"
                name="year"
                value={values.year}
                onChange={(e: any) => {
                  handleChange("year")(e.target.value);
                }}
              >
                {year.map((year) => (
                  <SelectItem key={year.value} value={year.value} className="">
                    {year.label}
                  </SelectItem>
                ))}
              </Select>
              {errors.year && touched.year && (
                <span className="text-red-500 pt-2 block text-tiny mx-1">
                  {errors.year}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-12 grid grid-cols-12 gap-2">
            {/* Upload button  */}
            <div className="flex flex-col col-span-4 max-800px:col-span-6 max-sm:col-span-12">
              <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
                Certificate
              </span>
              <input
                ref={inputFile}
                type="file"
                name="file"
                id="file"
                className=" block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-500 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                accept="application/pdf"
                onChange={(event: any) => {
                  setFieldValue("file", event.target.files[0], true);
                }}
              />
              {errors.file && touched.file && (
                <span className="text-red-500 pt-2 block text-tiny mx-1">
                  {errors.file}
                </span>
              )}
            </div>
          </div>
          <div className="col-span-12 grid gap-2 grid-cols-12">
            <Button
              color="primary"
              className="!rounded-md gradient-bg my-4 col-span-2 max-md:col-span-3 max-sm:col-span-12 "
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Submitting" : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MarSubmissionForm;
