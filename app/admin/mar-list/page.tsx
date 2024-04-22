"use client";
import React, { FC } from "react";
import Heading from "../../utils/Heading";
import MarList from "@/app/components/admin/mar-list/MarList";

type Props = {};

const page: FC<Props> = (props) => {
  
  return (
    <>
        <Heading
          title={`Mar List`}
          description=" description"
          keywords="notes,books,notes pdf"
        />
        <MarList/>
    </>
  );
};

export default page;
