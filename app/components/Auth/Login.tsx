import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  loginType: string;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen ,loginType}) => {
  const [show, setShow] = useState(false);

  const [login, { isSuccess, error }] = useLoginMutation();
  const role = (loginType === "student") ? "user" :((loginType === "administrator")? "admin": ((loginType === "teacher/evalutor") ? "teacher" : "user"))
  
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password, role});
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full px-8 pt-5 pb-8">
      <h1 className="title uppercase">{loginType} Login</h1>
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter email"
            className={`${
              errors.email && touched.email && "border-red-500"
            } input !ps-10`}
          />
        </div>
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full relative mt-4 mb-1 ">
          <label className="label" htmlFor="email">
            Password
          </label>
          <IoMdLock
            className="absolute bottom-[0.6rem] left-3 z-1 text-slate-500"
            size={20}
          />
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } input !ps-10  `}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-slate-400"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-slate-400"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-3 flex justify-end">
          <span className=" text-slate-600 text-sm cursor-pointer">Forgot password ?</span>
        </div>
        <div className="w-full mt-4">
          <input type="submit" value="Login" className="button" />
        </div>
      </form>
    </div>
  );
};

export default Login;
