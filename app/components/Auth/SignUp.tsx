import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { MdEdit, MdEmail } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("please enter your name!"),
  classroll: Yup.string().required("please enter your class roll number!"),
  universityroll: Yup.string().required(
    "please enter your university roll number!"
  ),
  registration: Yup.string().required("please enter your registration no."),
  year: Yup.string().required("please enter your passing year!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, isSuccess, error, isLoading }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      classroll: "",
      universityroll: "",
      registration: "",
      year: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({
      name,
      email,
      password,
      classroll,
      universityroll,
      registration,
      year,
    }) => {
      const data = {
        name,
        classroll,
        universityroll,
        registration,
        year,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full px-8 pt-5 pb-8">
      <h1 className="title uppercase">Student Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full relative mt-4 mb-1">
          <label className="label" htmlFor="email">
            Full Name
          </label>
          <MdEmail
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Enter your full name"
            className={`${
              errors.name && touched.name && "border-red-500"
            } input !ps-10`}
          />
        </div>
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}

        {/* roll number input  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="class-roll-number">
            Class Roll Number
          </label>
          <MdEdit
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.classroll}
            onChange={handleChange}
            id="classroll"
            placeholder="Enter your class roll no."
            className={`${
              errors.classroll && touched.classroll && "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.classroll && touched.classroll && (
          <span className="text-red-500 pt-2 block">{errors.classroll}</span>
        )}

        {/* university roll number  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="class-roll-number">
            University Roll Number
          </label>
          <MdEdit
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.universityroll}
            onChange={handleChange}
            id="universityroll"
            placeholder="Enter university roll no."
            className={`${
              errors.universityroll &&
              touched.universityroll &&
              "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.universityroll && touched.universityroll && (
          <span className="text-red-500 pt-2 block">
            {errors.universityroll}
          </span>
        )}

        {/* registration number  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="class-roll-number">
            Registration Number
          </label>
          <MdEdit
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.registration}
            onChange={handleChange}
            id="registration"
            placeholder="Enter registration no."
            className={`${
              errors.registration && touched.registration && "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.registration && touched.registration && (
          <span className="text-red-500 pt-2 block">{errors.registration}</span>
        )}

        {/* registration number  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="class-roll-number">
            Passing Year
          </label>
          <FaCalendar
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="text"
            name=""
            value={values.year}
            onChange={handleChange}
            id="year"
            placeholder="Enter year no."
            className={`${
              errors.year && touched.year && "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.year && touched.year && (
          <span className="text-red-500 pt-2 block">{errors.year}</span>
        )}

        {/* Email ID  */}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="email">
            Email ID
          </label>
          <MdEmail
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${
              errors.email && touched.email && "border-red-500"
            }  input !ps-10`}
          />
        </div>
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full relative mt-5 mb-1 ">
          <label className="label" htmlFor="email">
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } input `}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          {/* <input type="submit" value="Sign Up" className="button" /> */}
          <button type="submit" value="Sign Up" className="button" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#ffffff"
                  />
                </svg>
                OTP Sending...
              </>
            ) : (
              <>Register</>
            )}
          </button>
        </div>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
