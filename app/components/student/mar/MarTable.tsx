import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { ModalDialogProps } from "@mui/joy";
import PopUpModal from "@/app/utils/PopUpModal";
import {
  useDeleteMyMarMutation,
  useMyMarQuery,
} from "@/redux/features/api/moocs/moocsApi";
import { toast } from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import {MdOutlineDeleteOutline } from "react-icons/md";
import ViewPdf from "../moocs/ViewPdf"; 

type Props = {};

const MarTable = (props: Props) => {
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
    // alert(id);
    await deleteMyMar(id);
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
            <TableColumn className="!bg-transparent !text-white !max-w-[12rem] !w-[12rem] text-center">
              Category
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white !max-w-[9rem] !min-w-0 text-wrap text-center">
              Mar Points
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white !max-w-[9rem] !min-w-0 text-wrap text-center">
              Certificate Date
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white text-center !w-[8rem] !max-w-[8rem]">
              Year
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white text-center">
              Status
            </TableColumn>
            <TableColumn className="!bg-transparent !text-white text-center">
              Action
            </TableColumn>
          </TableHeader>

          <TableBody>
            {myMar &&
              myMar.map((mar: any, index: number) => (
                <TableRow key={`moocs${index}`} className="!bg-slate-100 ">
                  <TableCell className="!text-center !px-1">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="!px-1">
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 items-center flex ">
                      <span className="!mx-2 line-clamp-1">
                        {mar.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="!px-1">
                    <div className=" !bg-white !rounded-none !min-h-unit-10 border-1 items-center flex ">
                      <span className="!mx-2 line-clamp-1">
                        {mar.marCategory.category}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 justify-center items-center flex ">
                      <span className="!mx-2 line-clamp-1 text-center">
                        {mar.marCategory.perMarPoints}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="!px-1 width-style !max-w-[9rem] !w-[9rem]">
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 justify-center items-center flex ">
                      <span className="!mx-2 line-clamp-1 text-center">
                        {mar.certificateDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="!px-1">
                    <div className="w-full !bg-white !rounded-none !min-h-unit-10 border-1 justify-center items-center flex ">
                      <span className="!mx-2 line-clamp-1 text-center">
                        {mar.year}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`${
                        mar.status === "pending"
                          ? "border-blue-600 text-blue-600 bg-blue-600"
                          : mar.status === "rejected"
                          ? "border-red-600 text-red-600 bg-red-600"
                          : mar.status === "verified"
                          ? "border-green-600 text-green-600 bg-green-600 "
                          : ""
                      } bg-opacity-15  w-full font-medium !rounded-none !min-h-unit-10 border-2 items-center justify-center flex max-w-[9rem]`}
                    >
                      <span className="!mx-2 line-clamp-1 capitalize">
                        {mar.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 justify-center">
                      <Tooltip content="View pdf">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <FaRegEye
                            onClick={() => {setLayout("center");setRoute("viewpdf"); setPdfUrl(mar.document.url);}}
                          />
                        </span>
                      </Tooltip>
                      {
                        mar.status !== "verified" &&
                      <Tooltip color="danger" content="Delete">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <MdOutlineDeleteOutline
                            onClick={() => {handleDelete(mar._id);}}
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
            />
          )}
        </>
      )}
    </>
  );
};

export default MarTable;
