import React, { FC } from "react";
import TopHeader from "../dashboard/TopHeader";
import { BreadcrumbItem, Divider } from "@nextui-org/react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useMarCategoryListQuery,
  useMyMarQuery,
} from "@/redux/features/api/moocs/moocsApi";
import StudentData from "../moocs/StudentData";
import MarSubmissionForm from "./MarSubmissionForm";
import MarTable from "./MarTable";
import MobileMarTable from "./MobileMarTable";

type Props = {};

const Mar: FC<Props> = ({}) => {
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

  const { isLoading, error } = useMyMarQuery({});

  const { data } = useMarCategoryListQuery({});
  const { myMar, totalMarPoints } = useSelector((state: any) => state.moocs);

  return (
    <div className="max-w-screen-1300px mx-auto h-auto pb-10">
      <TopHeader>
        <BreadcrumbItem href="/student/dashboard">Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/student/mar">Mar</BreadcrumbItem>
      </TopHeader>

      <div className="bg-white border-1 border-slate-300 p-2 rounded-lg h-auto">
        <div className="w-full gradient-bg flex justify-center items-center py-2 rounded-md">
          <h3 className="text-white">Student Details</h3>
        </div>
        <StudentData />
        <Divider className="my-2" />
        <div className="">
          {/* <InputTable /> */}
          {data && <MarSubmissionForm marList={data.categories} />}
        </div>
        <Divider className="my-2" />
        <div className="bg-white max-md:bg-slate-100 py-2">
          <h4 className="ms-3 my-2 font-semibold">Mar Details -</h4>
          {greaterThanMid ? <MarTable /> : <MobileMarTable />}
          <div className="text-slate-700 flex justify-end my-2 mx-2">
            {data && <span>Total Mar Points Earned : {totalMarPoints}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mar;
