import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";
import { ModalDialogProps } from "@mui/joy";
import PopUpModal from "@/app/utils/PopUpModal";
import UpdateForm from "./UpdateForm";
import {
  useDeleteMyMoocsMutation,
  useMyMoocsQuery,
} from "@/redux/features/api/moocs/moocsApi";
import { toast } from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineDeleteOutline } from "react-icons/md";
import ViewPdf from "./ViewPdf";

type Props = {};

const MoocsTable = (props: Props) => {
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
    <>
      <form>
        <Table
          aria-label="Example static collection table"
          className="head-bg custom-table"
        >
          <TableHeader className="">
            <TableColumn className="!bg-transparent !text-white !w-2 !min-w-2 !pr-0 text-center">
              Sl. No.
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white !min-w-[20rem] text-center">
              Title
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white !max-w-[5rem] text-center">
              Platform
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white !max-w-[9rem] !min-w-0 text-wrap text-center">
              Credit Earned
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white !max-w-[9rem] !min-w-0 text-wrap text-center">
              Date of Joining
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white text-center">
              Date of Completion
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white text-center !w-[8rem] !max-w-[8rem]">
              Year
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white text-center">
              Verification Url
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white text-center">
              Status
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white text-center">
              Action
            </TableColumn>
          </TableHeader>

          <TableBody>
            {myMoocs &&
              myMoocs.map((moocs: any, index: number) => (
                <TableRow key={`moocs${index}`} className="!bg-slate-100 ">
                  <TableCell className="!text-center !px-1">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="!px-1">
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 items-center flex ">
                      <span className="!mx-2 line-clamp-1">
                        {moocs.moocsCourse.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="!px-1">
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 items-center flex ">
                      <span className="!mx-2 line-clamp-1">
                        {moocs.moocsCourse.platform}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 justify-center items-center flex ">
                      <span className="!mx-2 line-clamp-1 text-center">
                        {moocs.moocsCourse.credit}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="!px-1 width-style !max-w-[9rem] !w-[9rem]">
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 justify-center items-center flex ">
                      <span className="!mx-2 line-clamp-1 text-center">
                        {moocs.startDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="!px-1 width-style !max-w-[9rem] !w-[9rem]">
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 justify-center items-center flex ">
                      <span className="!mx-2 line-clamp-1 text-center">
                        {moocs.endDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="!px-1">
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 justify-center items-center flex ">
                      <span className="!mx-2 line-clamp-1 text-center">
                        {moocs.year}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="!px-1">
                    <Tooltip
                      showArrow
                      placement="top"
                      content={moocs.verificationUrl}
                      classNames={{
                        base: ["before:bg-neutral-400 dark:before:bg-white"],
                        content: [
                          "py-2 px-4 shadow-xl",
                          "bg-slate-800 text-white",
                        ],
                      }}
                    >
                      <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 items-center flex max-w-[9rem]">
                        <span className="!mx-2 line-clamp-1 ">
                          {moocs.verificationUrl}
                        </span>
                      </div>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`${
                        moocs.status === "pending"
                          ? "border-blue-600 text-blue-600 bg-blue-600"
                          : moocs.status === "rejected"
                          ? "border-red-600 text-red-600 bg-red-600"
                          : moocs.status === "verified"
                          ? "border-green-600 text-green-600 bg-green-600 "
                          : ""
                      } bg-opacity-15  w-full font-medium !rounded-none !min-h-unit-10 border-2 items-center justify-center flex max-w-[9rem]`}
                    >
                      <span className="!mx-2 line-clamp-1 capitalize">
                        {moocs.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 justify-center">
                      <Tooltip content="View pdf">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <FaRegEye
                            onClick={() => {setLayout("center");setRoute("viewpdf"); setPdfUrl(moocs.document.url); setVerificationUrl(moocs.verificationUrl);}}
                          />
                        </span>
                      </Tooltip>
                      {
                        moocs.status !== "verified" &&
                      <Tooltip color="danger" content="Delete">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <MdOutlineDeleteOutline
                            onClick={() => {handleDelete(moocs._id);}}
                          />
                        </span>
                      </Tooltip>
                      }
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </form>
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
    </>
  );
};

export default MoocsTable;
