import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const StudentData = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="flex flex-wrap justify-between mx-2 my-2">
      <div className=" flex flex-col">
        <span>
          Name of Student : <span className="font-medium">{user.name}</span>
        </span>
        <span>
          University Roll no. : <span className="font-medium">{user.universityroll}</span>
        </span>
        <span>
          Registration No. : 
          <span className="font-medium">{user.registration} OF 2022-23</span>
        </span>
      </div>
      <div className=" flex flex-col">
        <span>
          Passing Year : <span className="font-medium">{user.year}</span>
        </span>
        <span>Class Roll no. : <span className="font-medium">{user.classroll}</span></span>
      </div>
    </div>
  );
};

export default StudentData;
