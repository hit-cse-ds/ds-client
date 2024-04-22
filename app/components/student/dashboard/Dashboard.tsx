import React, { FC } from "react";
import DashboardCard from "./DashboardCard";
import TopHeader from "./TopHeader";
import { BreadcrumbItem } from "@nextui-org/react";
type Props = {};

const Dashboard: FC<Props> = ({}) => {
  
  const cardData = [
    {
      title: "Moocs",
      url: "/student/moocs",
    },
    {
      title: "Mar",
      url: "/student/mar",
    },
  ];


  return (
    <div className="max-w-screen-1300px mx-auto h-[70vh]">
      <TopHeader>
        <BreadcrumbItem href="/student/dashboard">Dashboard</BreadcrumbItem>
      </TopHeader>

      <div className="bg-white border-1 border-slate-300 p-8 rounded-lg h-full mx-4">
        <div className="flex flex-wrap  gap-8 max-sm:justify-center">
          {cardData.map((itmes,index) => (
            <div className="w-28" key={index}>
              <DashboardCard title={itmes.title} url={itmes.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
