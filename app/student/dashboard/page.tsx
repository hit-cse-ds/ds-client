"use client";
import React, { FC, useState } from "react";
import Heading from "../../utils/Heading";
import Protected from "../../hooks/useProtected";
import { useSelector } from "react-redux";
import Dashboard from "@/app/components/student/dashboard/Dashboard";
import Header from "@/app/components/Header";
import Footer from "@/app/utils/Footer";

type Props = {};

const Page: FC<Props> = ({}) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
        <Heading
          title={`${user?.name} profile`}
          description="Notematesync description"
          keywords="notes,books,notes pdf"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Dashboard />
        {/* <Footer/> */}
    </>
  );
};

export default Page;
