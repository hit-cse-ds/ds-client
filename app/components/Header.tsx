"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import CustomModel from "../utils/CustomModel";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import Image from "next/image";
import LogoImage from "../../public/assets/images/hit_logo.png";
import TopNavItems from "../utils/TopNavItems";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
  loginType?: string;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute,loginType }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();

  const [socialAuth, { isSuccess }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (isSuccess) {
      toast.success("Login Successfully!");
    }
  }, [data, user]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  return (
    <div className="w-full relative">
      {/* Top NavBar */}
      <div
        className="top-0 left-0 w-full x-[80] border-0  transition duration-500
             border-b dark:border-[#ffffff1c] h-[35px] z-[80] dark:shadow bg-orange-600"
      >
        <div className="w-[95%] max-w-screen-1300px 800px:w-[92%] m-auto  h-full ">
          <div className="w-full h-[35px] flex items-center justify-end">
            <TopNavItems activeItem={activeItem} isMobile={false} />
          </div>
        </div>
      </div>

      {/* NavBar  */}
      <div
        className=" top-0 left-0 w-full x-[80] border-0  transition duration-500
        border-b dark:border-[#ffffff1c] h-[100px] z-[80]  bg-white"
        
      >
        <div className="w-[95%] max-w-screen-1300px 800px:w-[92%] m-auto py-2 h-full ">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`font-Poppins font-[500] text-black dark:text-white`}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    alt="notes"
                    src={LogoImage}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="!relative overflow-hidden !h-[4rem] !w-[4rem] aspect-square"
                  />
                  <div className="">
                    <div className="text-lg font-semibold flex flex-col items-center justify-center">
                      <span>Dept. of Data Science</span>
                      <span className="text-tiny">
                        Haldia Institute of Technology
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex space-x-10 max-md:hidden">
              <div className="flex items-center" >
                <div className="flex items-center space-x-3">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="16.8925"
                      cy="17"
                      r="15.8925"
                      stroke="#EA580C"
                      strokeWidth="2"
                    />
                    <path
                      d="M22.2273 20.0066C21.3431 20.0066 20.4877 19.8628 19.6898 19.604C19.5648 19.5617 19.4304 19.5554 19.302 19.5859C19.1736 19.6164 19.0564 19.6825 18.9638 19.7766L17.8352 21.1927C15.801 20.2222 13.8961 18.3892 12.8825 16.2831L14.2842 15.0898C14.4783 14.8885 14.5358 14.6082 14.4567 14.3566C14.1908 13.5587 14.0542 12.7033 14.0542 11.8191C14.0542 11.431 13.7307 11.1075 13.3426 11.1075H10.8554C10.4672 11.1075 10 11.28 10 11.8191C10 18.4971 15.5566 24.0464 22.2273 24.0464C22.7377 24.0464 22.9389 23.5936 22.9389 23.1982V20.7182C22.9389 20.3301 22.6155 20.0066 22.2273 20.0066Z"
                      fill="#EA580C"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-semibold">CALL US</span>
                    <span className="text-orange-600">+91 9864589632</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <svg
                    width="35"
                    height="34"
                    viewBox="0 0 35 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="17.6775"
                      cy="17"
                      r="15.8925"
                      stroke="#EA580C"
                      strokeWidth="2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.78497 12.4075V22.8075C8.78497 23.5225 9.36354 24.1075 10.0707 24.1075H25.4993C26.2064 24.1075 26.785 23.5225 26.785 22.8075V12.4075C26.785 11.6925 26.2064 11.1075 25.4993 11.1075H10.0707C9.36354 11.1075 8.78497 11.6925 8.78497 12.4075ZM25.4993 12.4075L17.785 18.9075L10.0707 12.4075H25.4993ZM10.0707 14.3575L15.2135 18.2575L10.0707 22.1575V14.3575ZM11.3564 22.8075L15.8564 18.9075L17.785 20.8575L19.7135 18.9075L24.2135 22.8075H11.3564ZM25.4993 22.1575L20.3564 18.2575L25.4993 14.3575V22.1575Z"
                      fill="#EA580C"
                    />
                  </svg>

                  <div className="flex flex-col">
                    <span className="font-semibold">EMAIL US</span>
                    <span className="text-orange-600">support@hitds.in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobie sidebar  */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright NoteMateSync
              </p>
              {/* more items can add here  */}
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              loginType={loginType}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
