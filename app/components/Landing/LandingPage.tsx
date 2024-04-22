import Image from "next/image";
import React, { FC } from "react";
import StudentIcon from "../../../public/assets/images/student_icon.png"
import TeacherIcon from "../../../public/assets/images/teacher_779858.png"
import AdministrstorIcon from "../../../public/assets/images/administrator.png"

type Props = {
    setOpen: (open: boolean) => void;
    route: string;
    setRoute: (route: string) => void;
    loginType: string;
    setLoginType: (loginType: string) => void;
};

const LandingPage: FC<Props> =({setOpen,route,setRoute, setLoginType}) => {
  return (
    <div className="max-w-screen-1300px mx-auto h-full max-1300px:mx-4">
      <div className="grid grid-cols-12 gap-6 my-10">
        <div
         className="bg-amber-500 rounded-xl overflow-hidden col-span-4 max-1000px:col-span-6 max-md:col-span-12 pe-2 flex items-center space-x-4 cursor-pointer"
         onClick={() => {setRoute("Login"); setOpen(true); setLoginType("student")}}
         >
          <div className="bg-amber-600 h-[6rem] w-[6rem] flex justify-center items-center">
            <Image
              alt="notes"
              src={StudentIcon}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="!relative overflow-hidden aspect-square !w-[3rem] !h-[3rem]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg max-sm:text-base">STUDENT LOGIN</span>
            <span className="text-white max-sm:text-sm">Click here to login portal</span>
          </div>
        </div>

        <div
         className="bg-teal-500 rounded-xl overflow-hidden col-span-4 max-1000px:col-span-6  max-md:col-span-12 pe-2 flex items-center space-x-4 cursor-pointer"
         onClick={() => {setRoute("Sign-Up"); setOpen(true); }}
         >
          <div className="bg-teal-600 h-[6rem] w-[6rem] flex justify-center items-center">
            <Image
              alt="notes"
              src={StudentIcon}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="!relative overflow-hidden aspect-square !w-[3rem] !h-[3rem]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg max-sm:text-base">STUDENT REGISTRATION</span>
            <span className="text-white max-sm:text-sm">Click here to register</span>
          </div>
        </div>

        <div className="bg-indigo-500 rounded-xl overflow-hidden col-span-4 max-1000px:col-span-6 max-md:col-span-12 pe-2 flex items-center space-x-4 cursor-pointer"
        onClick={() => {setRoute("Login"); setOpen(true); setLoginType("administrator") }}
        >
          <div className="bg-indigo-600 h-[6rem] w-[6rem] flex justify-center items-center">
            <Image
              alt="notes"
              src={AdministrstorIcon}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="!relative overflow-hidden aspect-square !w-[3rem] !h-[3rem]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg max-sm:text-base uppercase">Administrator Login</span>
            <span className="text-white max-sm:text-sm">Click here to login portal</span>
          </div>
        </div>


        <div className="bg-lime-600 rounded-xl overflow-hidden col-span-4 max-1000px:col-span-6  max-md:col-span-12 pe-2 flex items-center space-x-4 cursor-pointer"
        onClick={() => {setRoute("Login"); setOpen(true); setLoginType("teacher/evalutor")}}
        >
          <div className="bg-lime-700 h-[6rem] w-[6rem] flex justify-center items-center">
            <Image
              alt="notes"
              src={TeacherIcon}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="!relative overflow-hidden aspect-square !w-[3rem] !h-[3rem]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg max-sm:text-base">TEACHER / EVALUTOR</span>
            <span className="text-white max-sm:text-sm">Click here to login portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
