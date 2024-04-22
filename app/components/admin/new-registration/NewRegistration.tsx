import React from "react";
import NewRegistrationList from "./newRegistrationList/NewRegistrationList";
import { useAllUsersQuery } from "@/redux/features/api/admin/adminApi";
import { useSelector } from "react-redux";
import AdminLoading from "@/app/utils/AdminLoading";

type Props = {};

const NewRegistration = (props: Props) => {
  const { isLoading } = useAllUsersQuery({});
  const { allUsers } = useSelector((state: any) => state.admin);
  console.log(allUsers);
  return (
    <div className="mx-2">
      <h2 className="font-semibold text-lg text-slate-800 my-3 ">
        New Registration
      </h2>
      {isLoading ? (
        <AdminLoading />
      ) : (
        allUsers && <NewRegistrationList users={allUsers} />
      )}
    </div>
  );
};

export default NewRegistration;
