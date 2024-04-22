import {
  useDeleteMyMarMutation,
  useMyMarQuery,
} from "@/redux/features/api/moocs/moocsApi";
import { ModalDialogProps } from "@mui/joy";
import { Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCalendar, FaCoins, FaRegEye, FaUniversity } from "react-icons/fa";
import {
  MdError,
  MdOutlineDeleteOutline,
  MdPending,
  MdVerifiedUser,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { RiGraduationCapFill } from "react-icons/ri";
import ViewPdf from "../moocs/ViewPdf";
import PopUpModal from "@/app/utils/PopUpModal";

type Props = {};

const MobileMarTable = (props: Props) => {
  const { myMar } = useSelector((state: any) => state.moocs);
  const [route, setRoute] = useState("");
  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);

  const [pdfUrl, setPdfUrl] = useState("");

  const { refetch } = useMyMarQuery({ refetchOnMountOrArgChange: true });

  const [deleteMyMar, { isSuccess, error }] = useDeleteMyMarMutation({});

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Mar Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async (id: any) => {
    await deleteMyMar(id);
  };

  return (
    <div className="bg-slate-100">
      {myMar &&
        myMar.map((mar: any, index: number) => (
          <div className="bg-white mx-2 my-4 px-3 py-3 rounded-lg flex flex-col relative overflow-hidden" key={index}>
            <h3 className="font-semibold text-base">{mar.title} </h3>
            <span className="text-slate-600 flex items-center">
              <FaUniversity className="text-slate-400 me-2" size={16} />{" "}
              Category : {mar.marCategory.category}
            </span>
            <span className="text-slate-600 flex items-center">
              <FaCoins className="text-slate-400 me-2" size={16} /> Mar Points :{" "}
              {mar.marCategory.perMarPoints}
            </span>
            <span className="text-slate-600 flex items-center">
              <FaCalendar className="text-slate-400 me-2" size={16} />
              Certificate Date: {mar.certificateDate}
            </span>
            <span className="text-slate-600 flex items-center">
              <RiGraduationCapFill className="text-slate-400 me-2" size={16} />
              Year: {mar.year}
            </span>
            <div className="flex justify-between items-center">
              <span
                className={`${
                  mar.status === "pending"
                    ? " text-blue-600 "
                    : mar.status === "rejected"
                    ? " text-red-600"
                    : mar.status === "verified"
                    ? " text-green-600  "
                    : ""
                } flex items-center  font-medium capitalize`}
              >
                {mar.status === "pending" ? (
                  <MdPending className="text-blue-600 me-2" size={16} />
                ) : mar.status === "rejected" ? (
                  <MdError className="text-red-600 me-2" size={16} />
                ) : mar.status === "verified" ? (
                  <MdVerifiedUser className="text-green-600 me-2" size={16} />
                ) : (
                  <></>
                )}

                {mar.status}
              </span>
              <div className="flex space-x-2 justify-end">
                <Tooltip content="View pdf">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FaRegEye
                      onClick={() => {
                        setLayout("center");
                        setRoute("viewpdf");
                        setPdfUrl(mar.document.url);
                      }}
                    />
                  </span>
                </Tooltip>
                {mar.status !== "verified" && (
                  <Tooltip color="danger" content="Delete">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <MdOutlineDeleteOutline
                        onClick={() => {
                          handleDelete(mar._id);
                        }}
                      />
                    </span>
                  </Tooltip>
                )}
              </div>
            </div>

            <div
              className={`${
                mar.status === "pending"
                  ? "bg-blue-600"
                  : mar.status === "rejected"
                  ? " bg-red-600"
                  : mar.status === "verified"
                  ? " bg-green-600 "
                  : ""
              } h-1 w-full absolute top-0 left-0`}
            ></div>
          </div>
        ))}
      {route === "viewpdf" && (
        <>
          {layout && (
            <PopUpModal
              layout={layout}
              setLayout={setLayout}
              setRoute={setRoute}
              component={ViewPdf}
              route="viewPdf"
              pdfUrl={pdfUrl}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MobileMarTable;
