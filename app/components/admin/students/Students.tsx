import React from "react";
import StudentsList from "./studentList/StudentsList";
import { useAllStudentDataQuery } from "@/redux/features/api/admin/adminApi";
import { Button } from "@nextui-org/react";
import { IoMdRefresh } from "react-icons/io";
import AdminLoading from "@/app/utils/AdminLoading";

type Props = {};

const Students = (props: Props) => {
  const { data, error, refetch, isFetching, isLoading } = useAllStudentDataQuery({});
  return (
    <div className="mx-2">
      <div className="flex space-x-2 items-center">
        <h2 className="font-semibold text-lg text-slate-800 my-3 ">
          Students List
        </h2>
        <Button
          isIconOnly
          aria-label="refresh"
          className="bg-transparent"
          onClick={() => refetch()}
        >
          <IoMdRefresh size={18} />
        </Button>
      </div>
      {isLoading || isFetching ? (
        <AdminLoading/>
      ) : (
        data && <StudentsList users={data.allStudentDetails} />
      )}
    </div>
  );
};

export default Students;
