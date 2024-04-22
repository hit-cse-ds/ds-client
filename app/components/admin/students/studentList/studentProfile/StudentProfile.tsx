import { Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import StudentMoocs from "./StudentMoocs";
import { useStudentDetailsQuery } from "@/redux/features/api/admin/adminApi";
import AdminLoading from "@/app/utils/AdminLoading";
import StudentMar from "./StudentMar";

type Props = {
  id: string;
};

const StudentProfile: FC<Props> = ({ id }) => {
  const { user } = useSelector((state: any) => state.auth);

  const { data, isLoading } = useStudentDetailsQuery({id});
  console.log(isLoading);
  console.log(data);

  return (
    <>
      {data ? (
        <>
          <div className="w-full gradient-bg flex justify-center items-center py-2 rounded-md">
            <h3 className="text-white">Student Details</h3>
          </div>
          <div className="flex flex-wrap justify-between mx-2 my-2">
            <div className=" flex flex-col">
              <span>
                Name of Student :{" "}
                <span className="font-medium">{data.singleStudent.name}</span>
              </span>
              <span>
                University Roll no. :{" "}
                <span className="font-medium">{data.singleStudent.universityroll}</span>
              </span>
              <span>
                Registration No. :
                <span className="font-medium">
                  {data.singleStudent.registration} OF 2022-23
                </span>
              </span>
            </div>
            <div className=" flex flex-col">
              <span>
                Passing Year : <span className="font-medium">{data.singleStudent.year}</span>
              </span>
              <span>
                Class Roll no. :{" "}
                <span className="font-medium">{data.singleStudent.classroll}</span>
              </span>
            </div>
          </div>
          <Divider className="my-2" />
          <div className=" overflow-auto h-[70vh]">
          <StudentMoocs moocs={data.singleStudent.moocs} id={id} email={data.singleStudent.email} />
          <StudentMar mar={data.singleStudent.mar} id={id} email={data.singleStudent.email}/>
          </div>
        </>
      ) : (<AdminLoading/>)}
    </>
  );
};

export default StudentProfile;
