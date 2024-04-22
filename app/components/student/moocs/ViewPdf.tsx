import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  pdfUrl: string;
  verificationUrl: string;
};

const ViewPdf: FC<Props> = ({ setRoute, pdfUrl, verificationUrl }) => {
  return (
    <div className="h-full w-full">
      <h3 className="font-semibold text-lg text-slate-800">Certificate</h3>
      <div className="h-[58vh]  mt-4">
        <iframe src={pdfUrl} width="100%" height="100%" />
      </div>
      <div className="flex flex-col my-2 ">
        {verificationUrl && (
          <label className="text-slate-600 ">Verification Url</label>
        )}
        <a
          href={verificationUrl}
          className="font-medium text-blue-500"
          target="blank"
        >
          {verificationUrl}
        </a>
      </div>
    </div>
  );
};

export default ViewPdf;
