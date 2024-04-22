"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import LandingPage from "./components/Landing/LandingPage";
import userAuth from "./hooks/userAuth";
import { redirect } from "next/navigation";
import { Fab } from "@mui/material";
import { ThemeSwitcher } from "./utils/ThemeSwitcher";
import adminAuth from "./hooks/adminAuth";
import Footer from "./utils/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const [loginType, setLoginType] = useState("Login");

  const isUser = userAuth();
  const isAdmin = adminAuth();
  return isUser ? (
    redirect("/student/dashboard")
  ) : isAdmin ? (
    redirect("/admin/dashboard")
  ) : (
    <div className="h-full">
      <Heading
        title="Data Science HIT"
        description="Data Science HIT"
        keywords="Data Science HIT,Haldia Institute of Technology,HIT, HIT Haldia"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
        loginType={loginType} 
      />
      <LandingPage setOpen={setOpen} setRoute={setRoute} route={route} loginType={loginType} setLoginType={setLoginType} />
      {/* <Footer/> */}
    </div>
  );
};

export default Page;
