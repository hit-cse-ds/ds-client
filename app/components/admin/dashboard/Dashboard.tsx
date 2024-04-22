import React, { FC, useState } from "react";
import TopHeader from "../../student/dashboard/TopHeader";
import AdminSidebar from "../sidebar/AdminSidebar";
import CustomPieChart from "./CustomPieChart";
import NumberCard from "./NumberCard";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { batchOptions } from "../students/studentList/data";
import { ChevronDownIcon } from "../new-registration/newRegistrationList/ChevronDownIcon";
import { useMoocsMarStatisticsQuery } from "@/redux/features/api/admin/adminApi";

type Props = {};
const data = [
  { name: "Verified", value: 400 },
  { name: "Pending", value: 300 },
  { name: "Rejected", value: 300 },
  { name: "Not Submitted", value: 200 },
];
const student = [
  { label: "Batch 2021", value: 64 },
  { label: "Batch 2022", value: 69 },
  { label: "Batch 2023", value: 124 },
  { label: "Batch 2024", value: 120 },
];
const moocsCourse = [
  { label: "Batch 2021", value: 5 },
  { label: "Batch 2022", value: 69 },
];
const marCategory = [
  { label: "Batch 2021", value: 10 },
  { label: "Batch 2022", value: 69 },
];

const Dashboard: FC<Props> = ({}) => {
  const [year, setYear] = useState(2023);
  const { data,isFetching,isLoading,refetch } = useMoocsMarStatisticsQuery({year});



  return (
    <section className="mx-2">
      <h2 className="font-semibold text-lg text-slate-800 my-3 ">Dashboard</h2>
      <div className="grid grid-cols-12 gap-4 my-4">
        <NumberCard title="Students" number={377} data={student} />
        <NumberCard title="Moocs Course" number={46} data={moocsCourse} />
        <NumberCard title="Mar Categories" number={25} data={marCategory} />
      </div>
      <div className="flex justify-between mt-5 mb-4 ">
        <h3 className="font-medium text-lg">Submission Reports</h3>
        <Dropdown>
          <DropdownTrigger className="hidden sm:flex">
            <Button
              endContent={<ChevronDownIcon className="text-small" />}
              variant="flat"
            >
              Batch : {year}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Batch Filter" // Update: Correct aria-label
            closeOnSelect={true} // Update: Pass batchFilter as an array
            selectionMode="single" // Update: Set selectionMode to "single"
            onAction={(key:any) => {setYear(key); refetch();}}
          >
            {batchOptions.map((batch) => (
              <DropdownItem key={batch.uid} className="capitalize">
                {batch.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      {data && (
        <div className=" grid grid-cols-2 gap-4">
          <div className="flex justify-center items-center bg-slate-100 relative py-4">
            <CustomPieChart data={data.moocsCounts} title="Moocs Report"/>
          </div>
          <div className="flex justify-center items-center bg-slate-100 relative">
            <CustomPieChart data={data.marCounts} title="Mar Report"/>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
