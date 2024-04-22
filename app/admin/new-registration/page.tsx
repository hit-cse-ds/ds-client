"use client";
import React, { FC } from "react";
import Heading from "../../utils/Heading";
import NewRegistration from "@/app/components/admin/new-registration/NewRegistration";

type Props = {};

const page: FC<Props> = (props) => {
  
  return (
    <>
        <Heading
          title={`Moocs`}
          description=" description"
          keywords="notes,books,notes pdf"
        />
        <NewRegistration/>
    </>
  );
};

export default page;
