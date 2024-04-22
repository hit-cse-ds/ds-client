"use client";
import React, { FC } from "react";
import Heading from "../../utils/Heading";
import Dashboard from "@/app/components/admin/dashboard/Dashboard";

type Props = {};

const page: FC<Props> = (props) => {
  
  return (
    <>
        <Heading
          title={`Admin Dashboard`}
          description="Notematesync description"
          keywords="notes,books,notes pdf"
        />
        <Dashboard/>
    </>
  );
};

export default page;
