"use client";
import React, { FC } from "react";
import Heading from "../../utils/Heading";
import MoocsList from "@/app/components/admin/moocs-list/MoocsList";

type Props = {};

const page: FC<Props> = (props) => {
  
  return (
    <>
        <Heading
          title={`Moocs List`}
          description=" description"
          keywords="notes,books,notes pdf"
        />
        <MoocsList/>
    </>
  );
};

export default page;
