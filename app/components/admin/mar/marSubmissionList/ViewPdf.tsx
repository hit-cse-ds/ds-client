import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { toast } from "react-hot-toast";

type Props = {
  pdfUrl:string;
  verificationUrl:string;
  setRoute: (route: string) => void;
};

const ViewPdf: FC<Props> = ({ setRoute,pdfUrl,verificationUrl }) => {

  return (
    <div className="h-[80vh]">
      <h3 className="font-semibold text-lg text-slate-800">Certificate</h3>
      <div className="h-[65vh] mt-4">
        <iframe src={pdfUrl} width="100%" height="100%" />
      </div>
      
      <div className="flex justify-end mt-4">
        <Button
          size="md"
          variant="solid"
          className="bg-green-600 font-semibold text-white"
          // onPress={setRoute("")}
          onClick={() => {
            setRoute("a");
            // toast.success("Verify Successfully!");
          }}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default ViewPdf;
