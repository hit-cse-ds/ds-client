"use client";
import React, { useState } from "react";
import AdminProtected from "../hooks/adminProtected";
import AdminSidebar from "../components/admin/sidebar/AdminSidebar";
import TopHeader from "../components/student/dashboard/TopHeader";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { BreadcrumbItem } from "@nextui-org/react";

type Props = {};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("");
  const [loginType, setLoginType] = useState("Login");

  const { user } = useSelector((state: any) => state.auth);
  return (
    <AdminProtected>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
        loginType={loginType} 
      />
      <div className="max-w-screen-1300px mx-auto min-h-[70vh] pb-10">
      <TopHeader>
        <BreadcrumbItem href="/admin">Admin Pannel</BreadcrumbItem>
      </TopHeader>
        <div className="bg-white border-1 border-slate-300 rounded-lg mx-4 flex items-stretch h-auto">
          <div className="flex-1">
            <AdminSidebar />
          </div>
          <section className="w-full p-2 overflow-x-auto">{children}</section>
        </div>
      </div>
    </AdminProtected>
  );
}
