import React, { FC, useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-hot-toast';
import { Button } from '@nextui-org/react';
import { useAdminMarCategoryListQuery, useUploadMarCategoryMutation } from '@/redux/features/api/admin/adminApi';

type Props = {
  setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
  category: Yup.string().required("please Enter Title of Course!"),
  perMarPoints: Yup.number().required("please Enter per mar points"),
  maxMarPoints: Yup.number().required("Please enter max mar points"),
});



const AddMarCategory:FC<Props> = ({setRoute}) => {

  const [uploadMarCategory, { isSuccess, error, isLoading }] =
    useUploadMarCategoryMutation();

  const { refetch } = useAdminMarCategoryListQuery({}, { refetchOnMountOrArgChange: true });

    
  const formik = useFormik({
    initialValues: {
      category: "",
      perMarPoints: "",
      maxMarPoints: "",
    },
    validationSchema: schema,
    onSubmit: async ({ category, perMarPoints,maxMarPoints }) => {
      await uploadMarCategory({
        category,
        perMarPoints,
        maximumMarPoints: maxMarPoints
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
      <h3 className='font-semibold text-lg'>Add New Mar Category</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-2 bg-slate-100 py-3 px-2 my-2 overflow-hidden">
          {/* Title Selector  */}
          <div className="flex flex-col col-span-12 max-800px:col-span-5 max-sm:col-span-12">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Category
            </span>
            <input
              type="text"
              name="category"
              value={values.category}
              onChange={handleChange}
              id="category"
              placeholder="Enter Category name"
              className={`
              input !mt-0 !bg-white text-[.88rem] `}
            />
            {errors.category && touched.category && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.category}
              </span>
            )}
          </div>

          {/* Credit selector  */}
          <div className="flex flex-col col-span-6 max-800px:col-span-6 max-sm:col-span-6">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Per Mar Points
            </span>
            <input
              type="text"
              name="perMarPoints"
              value={values.perMarPoints}
              onChange={handleChange}
              id="perMarPoints"
              placeholder="Per Mar Points"
              className={` input !mt-0 !bg-white text-[.88rem]`}
            />
             {errors.perMarPoints && touched.perMarPoints && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.perMarPoints}
              </span>
            )}
          </div>

          <div className="flex flex-col col-span-6 max-800px:col-span-6 max-sm:col-span-6">
            <span className="text-slate-800 text-[.75rem] mx-1 my-1 after:ml-0.5 after:text-red-500 after:content-['*']">
              Maximun Mar Points
            </span>
            <input
              type="number"
              name="maxMarPoints"
              value={values.maxMarPoints}
              onChange={handleChange}
              id="maxMarPoints"
              placeholder="Maximum Mar Points"
              className={` input !mt-0 !bg-white text-[.88rem]`}
            />
             {errors.maxMarPoints && touched.maxMarPoints && (
              <span className="text-red-500 pt-2 block text-tiny mx-1">
                {errors.maxMarPoints}
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

export default AddMarCategory