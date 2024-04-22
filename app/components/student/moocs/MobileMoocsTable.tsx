import {
  useDeleteMyMoocsMutation,
  useMyMoocsQuery,
} from "@/redux/features/api/moocs/moocsApi";
import { ModalDialogProps } from "@mui/joy";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaCalendar,
  FaCoins,
  FaLink,
  FaRegEye,
  FaUniversity,
} from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import {
  MdError,
  MdOutlineDeleteOutline,
  MdPending,
  MdVerifiedUser,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { RiGraduationCapFill } from "react-icons/ri";
import ViewPdf from "./ViewPdf";
import PopUpModal from "@/app/utils/PopUpModal";

type Props = {};

const MobileMoocsTable = (props: Props) => {
  const { myMoocs } = useSelector((state: any) => state.moocs);
  const [route, setRoute] = useState("");
  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);

  const [pdfUrl, setPdfUrl] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");

  const { refetch } = useMyMoocsQuery({ refetchOnMountOrArgChange: true });

  const [deleteMyMoocs, { isSuccess, error }] = useDeleteMyMoocsMutation({});

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Moocs Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async (id: any) => {
    await deleteMyMoocs(id);
  };

  return (
    <div className="bg-slate-100">
      {myMoocs &&
        myMoocs.map((moocs: any, index: number) => (
          <div className="bg-white mx-2 my-4 px-3 py-3 rounded-lg flex flex-col relative overflow-hidden" key={index}>
            <h3 className="font-semibold text-base">
              {moocs.moocsCourse.title}{" "}
            </h3>
            <span className="text-slate-600 flex items-center">
              <FaUniversity className="text-slate-400 me-2" size={16} />{" "}
              Platform : {moocs.moocsCourse.platform}
            </span>
            <span className="text-slate-600 flex items-center">
              <FaCoins className="text-slate-400 me-2" size={16} /> Credit :{" "}
              {moocs.moocsCourse.credit}
            </span>
            <span className="text-slate-600 flex items-center">
              <FaCalendar className="text-slate-400 me-2" size={16} />
              Date of Joining: {moocs.startDate}
            </span>
            <span className="text-slate-600 flex items-center">
              <FaCalendar className="text-slate-400 me-2" size={16} />
              Date of Completion: {moocs.endDate}
            </span>
            <span className="text-slate-600 flex items-center">
              <RiGraduationCapFill className="text-slate-400 me-2" size={16} />
              Year: {moocs.year}
            </span>
            <span className="text-slate-600 flex items-center">
              <FaLink className="text-slate-400 me-2" size={16} />
              Verification Url: {moocs.verificationUrl}
            </span>
            <div className="flex justify-between items-center">
              <span
                className={`${
                  moocs.status === "pending"
                    ? " text-blue-600 "
                    : moocs.status === "rejected"
                    ? " text-red-600"
                    : moocs.status === "verified"
                    ? " text-green-600  "
                    : ""
                } flex items-center  font-medium capitalize`}
              >
                {moocs.status === "pending" ? (
                  <MdPending className="text-blue-600 me-2" size={16} />
                ) : moocs.status === "rejected" ? (
                  <MdError className="text-red-600 me-2" size={16} />
                ) : moocs.status === "verified" ? (
                  <MdVerifiedUser className="text-green-600 me-2" size={16} />
                ) : (
                  <></>
                )}

                {moocs.status}
              </span>
              <div className="flex space-x-2 justify-end">
                <Tooltip content="View pdf">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FaRegEye
                      onClick={() => {
                        setLayout("center");
                        setRoute("viewpdf");
                        setPdfUrl(moocs.document.url);
                        setVerificationUrl(moocs.verificationUrl);
                      }}
                    />
                  </span>
                </Tooltip>
                {moocs.status !== "verified" && (
                  <Tooltip color="danger" content="Delete">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <MdOutlineDeleteOutline
                        onClick={() => {
                          handleDelete(moocs._id);
                        }}
                      />
                    </span>
                  </Tooltip>
                )}
              </div>
            </div>


            <div
              className={`${
                moocs.status === "pending"
                  ? "bg-blue-600"
                  : moocs.status === "rejected"
                  ? " bg-red-600"
                  : moocs.status === "verified"
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
              verificationUrl={verificationUrl}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MobileMoocsTable;
