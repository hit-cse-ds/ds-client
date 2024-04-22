import { Button, Select, SelectItem } from "@nextui-org/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { year } from "./data";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  useMyMoocsQuery,
  useUploadMoocsMutation,
} from "@/redux/features/api/moocs/moocsApi";

interface IEditMoocs {
  _id: string;
  titleId: string;
  startDate: string;
  endDate: string;
  year: string;
  verificationUrl: string;
  fileUrl: string;
}
type Props = {
  //this contain moocs course list
  moocs: Array<{
    _id: string;
    title: string;
    platform: string;
    credit: number;
  }>;
  //for update or edit moocs submission
  editMoocs?: IEditMoocs;
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
  title: Yup.string().required("please Select Title of Course!"),
  startDate: Yup.string().required("Please enter your Date of Joining!"),
  endDate: Yup.string().required("Please enter your Date of Completion!"),
  year: Yup.string().required("select year!"),
  verificationUrl: Yup.string().required(
    "Please enter Certificate Verfication Url"
  ),
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

const MoocsSubmissionForm: FC<Props> = ({ moocs, editMoocs }) => {
  const [uploadMoocs, { isSuccess, error, isLoading }] =
    useUploadMoocsMutation();

  const [loadUser, setLoadUser] = useState(false);
  const {refetch} = useMyMoocsQuery({},{refetchOnMountOrArgChange:true});

  const formik = useFormik({
    initialValues: {
      title: "",
      startDate: null,
      endDate: null,
      year: "",
      verificationUrl: "",
      file: null,
    },
    validationSchema: schema,
    onSubmit: async ({
      title,
      startDate,
      endDate,
      year,
      verificationUrl,
      file,
    }) => {
      await uploadMoocs({
        title,
        startDate,
        endDate,
        year,
        verificationUrl,
        file,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Submitted!");
      formik.resetForm();
      resetTitle();
      setFieldValue("year", null);
      // setLoadUser(true);
      refetch();
      setStartDate(null);
      setEndDate(null);
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

  const [selectedTitle, setSelectedTitle] = useState("");
  const [platform, setPlatform] = React.useState("");
  const [credit, setCredit] = React.useState<number | string>("");
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(null);

  const inputFile = useRef<HTMLInputElement>(null);

  const handleFileReset = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };

  const handleTitleChange = (e: any) => {
    setSelectedTitle(e.target.value);
    const moocsSelect = moocs.find((moocs) => moocs._id === e.target.value);
    if (moocsSelect) {
      setFieldValue("title", moocsSelect._id, true);
      setPlatform(moocsSelect.platform);
      setCredit(moocsSelect.credit);
    } else {
      setFieldValue("title", "", true);
      setPlatform("");
      setCredit("");
    }
  };

  const resetTitle = () => {
    setFieldValue("title", "", true);
    setPlatform("");
    setCredit("");
    handleFileReset();
  };

  useEffect(() => {
    const moocsSelect = moocs.find((moocs) => moocs._id === editMoocs?.titleId);
    if (moocsSelect) {
      setFieldValue("title", moocsSelect._id, true);
      setPlatform(moocsSelect.platform);
      setCredit(moocsSelect.credit);
    }
    if (editMoocs) {
      const sdate = dayjs(editMoocs.startDate, "DD-MM-YYYY");
      const edate = dayjs(editMoocs.endDate, "DD-MM-YYYY");
      setStartDate(sdate);
      setEndDate(edate);
      setFieldValue("year", editMoocs.year);
      setFieldValue("verificationUrl", editMoocs.verificationUrl);
      setFieldValue("startDate", editMoocs.startDate);
      setFieldValue("endDate", editMoocs.endDate);
    }
  }, [editMoocs]);

  return (
    <div>
      <div className="gradient-bg flex py-2 justify-center items-center rounded-lg">
        <span className="font-semibold text-white">
          Moocs {editMoocs ? "Edit" : "Submission"}
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-2 bg-slate-100 py-3 px-2 my-2 overflow-hidden">
          <div className="col-span-12">
            <span className="font-semibold mx-2 mt-4">Add Moocs Details :</span>
          </div>
          {/* Title Selector  */}
          <div className="flex flex-col col-span-4 max-800px:col-span-5 max-sm:col-span-12">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Course Title
            </span>
            <Select
              label=""
              className="w-full selector-white"
              placeholder="Select Title"
              id="title"
              name="title"
              value={values.title}
              onChange={(e: any) => {
                handleTitleChange(e);
              }}
              defaultSelectedKeys={editMoocs ? [editMoocs.titleId] : ""}
            >
              {moocs &&
                moocs.map((item) => (
                  <SelectItem key={item._id} value={item.title} className="">
                    {item.title}
                  </SelectItem>
                ))}
            </Select>
            {errors.title && touched.title && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.title}
              </span>
            )}
          </div>

          {/* Platform selector  */}
          <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-7">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Course Platform
            </span>
            <input
              disabled
              type="text"
              name=""
              value={platform}
              // onChange={handleChange}
              id="course_platform"
              placeholder="Course Platform"
              className={` input !mt-0 !bg-white text-[.88rem]`}
            />
          </div>

          {/* Credit selector  */}
          <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-5">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Credit Earned
            </span>
            <input
              disabled
              type="number"
              name=""
              value={credit}
              // onChange={handleChange}
              id="credit_earned"
              placeholder="Credit Earned"
              className={` input !mt-0 !bg-white text-[.88rem]`}
            />
          </div>

          <div className="col-span-12 grid gap-2 grid-cols-12">
            {/* Start Date selector  */}
            <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-6">
              <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
                Starting Date
              </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDatePicker"]}>
                  <div className="date-picker-style">
                    <MobileDatePicker
                      name="startDate"
                      value={startDate}
                      onChange={(date: any) => {
                        setFieldValue(
                          "startDate",
                          date ? dayjs(date).format("DD-MM-YYYY") : null,
                          true
                        );
                        setStartDate(date);
                        // alert(date ? dayjs(date).format('DD-MM-YYYY'): null);
                      }}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
              {errors.startDate && touched.startDate && (
                <span className="text-red-500 pt-2 block text-tiny mx-1">
                  {errors.startDate}
                </span>
              )}
            </div>

            {/* Start Date selector  */}
            <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-6">
              <span className="text-slate-800 text-[.75rem] mx-1 my-1  after:ml-0.5 after:text-red-500 after:content-['*']">
                Completion Date
              </span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["MobileDatePicker"]}>
                  <div className="date-picker-style">
                    <MobileDatePicker
                      name="endDate"
                      value={endDate}
                      onChange={(date: any) => {
                        setFieldValue(
                          "endDate",
                          date ? dayjs(date).format("DD-MM-YYYY") : null,
                          true
                        );
                        setEndDate(date);
                      }}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
              {errors.endDate && touched.endDate && (
                <span className="text-red-500 pt-2 block text-tiny mx-1">
                  {errors.endDate}
                </span>
              )}
            </div>
          </div>

          {/* Year selector  */}
          <div className="flex flex-col col-span-2 max-800px:col-span-3 max-sm:col-span-4">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*'] ">
              Year
            </span>
            <Select
              label=""
              className="w-full  selector-white"
              placeholder="Select Title"
              id="year"
              name="year"
              value={values.year}
              defaultSelectedKeys={editMoocs ? [editMoocs.year] : ""}
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

          {/* Verification url input  */}
          <div className="flex flex-col col-span-3 max-800px:col-span-4 max-sm:col-span-8">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*'] ">
              Verification Url
            </span>
            <input
              type="text"
              name=""
              value={values.verificationUrl}
              onChange={handleChange}
              id="verificationUrl"
              placeholder="Verification url"
              className={`
              input !mt-0 !bg-white text-[.88rem] `}
            />
            {errors.verificationUrl && touched.verificationUrl && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.verificationUrl}
              </span>
            )}
          </div>

          <div className="col-span-12 grid grid-cols-12 gap-2">
            {editMoocs && (
              <div className="col-span-2 max-1000px:col-span-3 flex flex-col">
                <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
                  Certificate
                </span>
                <Button
                  color="primary"
                  className="!rounded-md my-0"
                >
                  View File
                </Button>
              </div>
            )}
            {/* Upload button  */}
            <div className="flex flex-col col-span-4 max-800px:col-span-6 max-sm:col-span-12">
              <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
                {editMoocs ? "New Certificate" : "Certificate"}
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
              {isLoading ? "Submitting" : editMoocs ? "Save" : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MoocsSubmissionForm;
