"use client";
import React, { FC } from "react";
import Heading from "../../utils/Heading";
import Dashboard from "@/app/components/admin/dashboard/Dashboard";
import Students from "@/app/components/admin/students/Students";

type Props = {};

const page: FC<Props> = (props) => {
  
  return (
    <>
        <Heading
          title={`Students`}
          description=" description"
          keywords="notes,books,notes pdf"
        />
        <Students/>
    </>
  );
};

export default page;
