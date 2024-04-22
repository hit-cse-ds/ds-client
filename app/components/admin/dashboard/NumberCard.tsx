import React, { FC } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

type Props = {
  title: string;
  number: number;
  data:any;
};

const NumberCard: FC<Props> = ({ title, number,data }) => {
 

  return (
    <div className="bg-slate-100 px-4 py-3 rounded-lg col-span-4 border-slate-300 border-1 relative flex justify-start items-center">
      <div className="">
        <PieChart
          series={[
            {
              paddingAngle: 2,
              innerRadius: 30,
              outerRadius: 40,
              data,
            },
          ]}
          margin={{ right: 5 }}
          width={90}
          height={90}
          legend={{ hidden: true }}
        />
      </div>
      <div className="flex justify-start flex-col items-start text-slate-700 ms-4">
        <span className="text-4xl uppercase font-medium text-slate-800">
          {number}
        </span>
        <span className="text-lg uppercase font-semibold text-slate-600">
          {title}
        </span>
      </div>
    </div>
  );
};

export default NumberCard;
