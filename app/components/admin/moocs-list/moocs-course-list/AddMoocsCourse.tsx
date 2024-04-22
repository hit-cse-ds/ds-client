import React, { FC, useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-hot-toast';
import { Button } from '@nextui-org/react';
import { useAdminMoocsCourseListQuery, useUploadMoocsCourseMutation } from '@/redux/features/api/admin/adminApi';

type Props = {
  setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
  title: Yup.string().required("please Enter Title of Course!"),
  platform: Yup.string().required("please Enter Platform"),
  credit: Yup.number().required("Please enter credit points"),
});



const AddMoocsCourse:FC<Props> = ({setRoute}) => {

  const [uploadMar, { isSuccess, error, isLoading }] =
    useUploadMoocsCourseMutation();

  const { refetch } = useAdminMoocsCourseListQuery({}, { refetchOnMountOrArgChange: true });

    
  const formik = useFormik({
    initialValues: {
      title: "",
      platform: "",
      credit: "",
    },
    validationSchema: schema,
    onSubmit: async ({ title,platform,credit }) => {
      await uploadMar({
        title,
        platform,
        credit
      });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Submitted!");
      formik.resetForm();
      setRoute("");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  

  return (
    <div>
      <h3 className='font-semibold text-lg'>Add Moocs Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-2 bg-slate-100 py-3 px-2 my-2 overflow-hidden">
          {/* Title Selector  */}
          <div className="flex flex-col col-span-12 max-800px:col-span-5 max-sm:col-span-12">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Course Title
            </span>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              id="title"
              placeholder="Enter Course Title"
              className={`
              input !mt-0 !bg-white text-[.88rem] `}
            />
            {errors.title && touched.title && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.title}
              </span>
            )}
          </div>

          {/* Credit selector  */}
          <div className="flex flex-col col-span-8 max-800px:col-span-3 max-sm:col-span-5">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Platform
            </span>
            <input
              type="text"
              name="platform"
              value={values.platform}
              onChange={handleChange}
              id="platform"
              placeholder="Course Platform"
              className={` input !mt-0 !bg-white text-[.88rem]`}
            />
             {errors.platform && touched.platform && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.platform}
              </span>
            )}
          </div>

          <div className="flex flex-col col-span-4 max-800px:col-span-3 max-sm:col-span-5">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Credit
            </span>
            <input
              type="number"
              name="credit"
              value={values.credit}
              onChange={handleChange}
              id="credit"
              placeholder="Credit Point"
              className={` input !mt-0 !bg-white text-[.88rem]`}
            />
             {errors.credit && touched.credit && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.credit}
              </span>
            )}
          </div>
          
          
          <div className="col-span-12 grid gap-2 grid-cols-12">
            <Button
              color="primary"
              className="!rounded-md gradient-bg my-4 col-span-4 max-md:col-span-6 max-sm:col-span-12 "
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
  )
}

export default AddMoocsCourse