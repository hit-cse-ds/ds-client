import { useDeleteMyMoocsMutation } from "@/redux/features/api/moocs/moocsApi";
import { ModalDialogProps } from "@mui/joy";
import { Tooltip } from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaCalendar,
  FaCoins,
  FaLink,
  FaRegEye,
  FaUniversity,
} from "react-icons/fa";
import {
  MdError,
  MdOutlineCancel,
  MdOutlineDeleteOutline,
  MdPending,
  MdVerifiedUser,
} from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import ViewPdf from "@/app/components/student/moocs/ViewPdf";
import PopUpModal from "@/app/utils/PopUpModal";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Reject from "../../../mar/marSubmissionList/Reject";
import Verify from "../../../mar/marSubmissionList/Verify";

type Props = {
  id: string;
  mar: any;
  email:string
};

const StudentMar: FC<Props> = ({ id, mar,email }) => {
  const [route, setRoute] = useState("");
  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);

  const [pdfUrl, setPdfUrl] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");

  // const { refetch } = useStudentDetailsQuery({ refetchOnMountOrArgChange: true });

  const [deleteMyMoocs, { isSuccess, error }] = useDeleteMyMoocsMutation({});

  useEffect(() => {
    if (isSuccess) {
      // refetch();
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

  const [selectedPdfUrl, setSelectedPdfUrl] = React.useState("");
  const [selectedMoocsId, setSelectedMoocsId] = React.useState("");
  const [selectedUserEmail, setSelectedUserEmail] = React.useState("");
  const [selectedVerificationUrl, setSelectedVerificationUrl] =
  React.useState("");


  const handleView = (pdfUrl: string, verificationUrl: string) => {
    setSelectedPdfUrl(pdfUrl);
    setSelectedVerificationUrl(verificationUrl);
    setRoute("viewPdf");
    setLayout("center");
  };

  const handleVerify = (id: string,email:string) => {
    setRoute("verify");
    setLayout("center");
    setSelectedMoocsId(id);
    setSelectedUserEmail(email);
  };

  const handleReject = (id: string,email:string) => {
    setRoute("reject");
    setLayout("center");
    setSelectedMoocsId(id);
    setSelectedUserEmail(email);
  };

  return (
    <div className="">
      <h3 className="font-semibold text-lg ms-4 !my-3">Mar</h3>
      {mar.length === 0 && (
        <div className="ms-4">
          <span>No result found</span>
        </div>
      )}
      <div className="grid grid-cols-12 gap-4">
        {mar &&
          mar.map((mar: any, index: number) => (
            <div
              key={index}
              className="bg-slate-100 border-1 border-slate-300 mx-0 my-0 px-3 py-3 rounded-lg flex flex-col relative overflow-hidden col-span-6 max-md:col-span-12"
            >
              <h3 className="font-semibold text-base">{mar.title} </h3>
              <span className="text-slate-600 flex items-center">
                <FaUniversity className="text-slate-400 me-2" size={16} />{" "}
                Category : {mar.marCategory.category}
              </span>
              <span className="text-slate-600 flex items-center">
                <FaCoins className="text-slate-400 me-2" size={16} /> Credit :{" "}
                {mar.marCategory.perMarPoints}
              </span>
              <span className="text-slate-600 flex items-center">
                <FaCalendar className="text-slate-400 me-2" size={16} />
                Date of Joining: {mar.certificateDate}
              </span>
              <span className="text-slate-600 flex items-center">
                <RiGraduationCapFill
                  className="text-slate-400 me-2"
                  size={16}
                />
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
                <div className="relative flex items-center gap-2">
                  <Tooltip content="View pdf">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <FaRegEye
                        onClick={() =>
                          handleView(mar.document.url, mar.verificationUrl)
                        }
                      />
                    </span>
                  </Tooltip>
                  <Tooltip
                    content="Verify"
                    color="success"
                    className="text-white"
                  >
                    <span className="text-lg text-success cursor-pointer active:opacity-50">
                      <IoShieldCheckmarkOutline
                        onClick={() => handleVerify(mar._id, email)}
                      />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Reject">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <MdOutlineCancel
                        onClick={() => handleReject(mar._id, email)}
                      />
                    </span>
                  </Tooltip>
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
      </div>
      {route === "verify" && (
        <>
          {layout && (
            <PopUpModal
              layout={layout}
              setLayout={setLayout}
              setRoute={setRoute}
              component={Verify}
              email={selectedUserEmail}
              id={selectedMoocsId}
            />
          )}
        </>
      )}
      {route === "reject" && (
        <>
          {layout && (
            <PopUpModal
              layout={layout}
              setLayout={setLayout}
              setRoute={setRoute}
              component={Reject}
              email={selectedUserEmail}
              id={selectedMoocsId}
            />
          )}
        </>
      )}
      {route === "viewPdf" && (
        <>
          {layout && (
            <PopUpModal
              layout={layout}
              setLayout={setLayout}
              setRoute={setRoute}
              component={ViewPdf}
              route="viewPdf"
              pdfUrl={selectedPdfUrl}
              verificationUrl={selectedVerificationUrl}
            />
          )}
        </>
      )}
    </div>
  );
};

export default StudentMar;
