import { CircularProgress } from "@nextui-org/react";
import React from "react";

type Props = {};

const AdminLoading = (props: Props) => {
  return (
    <div className="h-[50vh] w-full flex justify-center items-center">
      <CircularProgress color="warning" aria-label="Loading..." />
    </div>
  );
};

export default AdminLoading;
