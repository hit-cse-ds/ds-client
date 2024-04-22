import React, { useEffect } from "react";
import MoocsCourseList from "./moocs-course-list/MoocsCourseList";
import { useSelector } from "react-redux";
import { useAdminMoocsCourseListQuery } from "@/redux/features/api/admin/adminApi";
import { toast } from "react-hot-toast";
import { initializeApp } from "@/redux/store";
import AdminLoading from "@/app/utils/AdminLoading";

type Props = {};

const MoocsList = (props: Props) => {
  const { data, error, isLoading, refetch } = useAdminMoocsCourseListQuery({});
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [error]);
  return (
    <div className="mx-2">
      <h2 className="font-semibold text-lg text-slate-800 my-3 ">
        Moocs Course List
      </h2>
      {isLoading ? (
        <AdminLoading />
      ) : (
        data && <MoocsCourseList moocsCourse={data.moocsList} />
      )}
    </div>
  );
};

export default MoocsList;
