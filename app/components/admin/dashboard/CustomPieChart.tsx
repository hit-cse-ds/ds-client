import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { FaFileDownload } from "react-icons/fa";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";


const COLORS = ["#00c41d", "#003bc4", "#ff2828", "#9f9f9f"];

type Props = {
  title:string
  data:any;
};

const CustomPieChart:FC<Props> = ({title,data}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <span className=" font-medium">{title}</span>
        {/* <Button
          endContent={<FaFileDownload className="text-slate-500"/>}
          variant="bordered"
        >
          View List
        </Button> */}
      </div>
      <PieChart width={300} height={300}>
        <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry:any, index:number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="flex space-x-4">
        {data.map((item: any, index: number) => (
          <div className="flex space-x-2" key={item.name}>
            <div
              className={`h-2 w-2 mt-2 rounded-full`}
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <div className="flex flex-col">
              <span className="font-medium">{item.name}</span>
              <span>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomPieChart;