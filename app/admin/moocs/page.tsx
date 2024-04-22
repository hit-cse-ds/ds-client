"use client";
import React, { FC } from "react";
import Heading from "../../utils/Heading";
import Dashboard from "@/app/components/admin/dashboard/Dashboard";
import Moocs from "@/app/components/admin/moocs/Moocs";

type Props = {};

const page: FC<Props> = (props) => {
  
  return (
    <>
        <Heading
          title={`Moocs`}
          description=" description"
          keywords="notes,books,notes pdf"
        />
        <Moocs/>
    </>
  );
};

export default page;
