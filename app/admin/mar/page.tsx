"use client";
import React, { FC } from "react";
import Heading from "../../utils/Heading";
import Mar from "@/app/components/admin/mar/Mar";

type Props = {};

const page: FC<Props> = (props) => {
  
  return (
    <>
        <Heading
          title={`Mar`}
          description=" description"
          keywords="notes,books,notes pdf"
        />
        <Mar/>
    </>
  );
};

export default page;
