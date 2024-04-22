"use client";
import React, { FC, useState } from "react";
import Heading from "../../utils/Heading";
import Protected from "../../hooks/useProtected";
import { useSelector } from "react-redux";
import Header from "@/app/components/Header";
import Mar from "@/app/components/student/mar/Mar";

type Props = {};

const Page: FC<Props> = ({}) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
        <Heading
          title="Mar"
          description="Mar description"
          keywords="notes,books,notes pdf"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Mar />
    </>
  );
};

export default Page;
