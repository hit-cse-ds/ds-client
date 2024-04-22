import React, { FC, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { columns, statusOptions, batchOptions } from "./data";
import { capitalize } from "./utils";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import PopUpModal from "@/app/utils/PopUpModal";
import { ModalDialogProps } from "@mui/joy";
import Verify from "./Verify";
import Reject from "./Reject";
import { MdOutlineCancel } from "react-icons/md";
import ViewPdf from "./ViewPdf";
import { FaRegEye } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  verified: "success",
  rejected: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "platform",
  "credit",
  "universityRollNo",
  "name",
  "classroll",
  "status",
  "actions",
];

type Props = {
  mar: any;
};

const MarSubmissionList: FC<Props> = ({ mar }) => {
  type Mar = (typeof mar)[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedPdfUrl, setSelectedPdfUrl] = React.useState("");
  const [selectedMoocsId, setSelectedMoocsId] = React.useState("");
  const [selectedUserEmail, setSelectedUserEmail] = React.useState("");

  const [selectedVerificationUrl, setSelectedVerificationUrl] =
    React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [batchFilter, setBatchFilter] = React.useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "classrollno",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...mar];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((mar) =>
        mar.user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((mar) =>
        Array.from(statusFilter).includes(mar.status)
      );
    }
    if (batchFilter !== "all") {
      // Update: Apply batch filter if it's not "all"
      filteredUsers = filteredUsers.filter(
        (mar) => mar.user.year == batchFilter
      );
    }

    return filteredUsers;
  }, [mar, filterValue, statusFilter, batchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Mar, b: Mar) => {
      const first = a[sortDescriptor.column as keyof Mar] as number;
      const second = b[sortDescriptor.column as keyof Mar] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
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

  const doc = new jsPDF({
    orientation: 'landscape' // Set document orientation to landscape
  });
  const exportHandler = () => {
    const addCustomHeader = () => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");

      doc.text("Mar Submission List", doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      // doc.text("This is a custom header added to the PDF document.", 105, 20, {
      //   align: "center",
      // });
    };

    // Table configuration
    const tableOptions = {
      html: "#my-table",
      startY: 30, // Y position after the header
      didDrawPage: () => {
        addCustomHeader();
      },
    };

    // Generate the table using autoTable plugin
    autoTable(doc, tableOptions);

    // Save the PDF with filename 'table.pdf'
    doc.save("mar_submission_list.pdf");
  };

  const renderCell = React.useCallback((mar: Mar, columnKey: React.Key) => {
    const cellValue = mar[columnKey as keyof Mar];

    switch (columnKey) {
      case "name":
        return (
          <span className="text-center whitespace-nowrap">{mar.user.name}</span>
        );
      case "title":
        return <span>{mar.title}</span>;
      case "perMarPoints":
        return (
          <span className="text-center whitespace-nowrap">{mar.marCategory.perMarPoints}</span>
        );
      case "maxMarPoints":
        return <span className="whitespace-nowrap">{mar.marCategory.maximumMarPoints}</span>;
      case "universityroll":
        return <span>{mar.user.universityroll}</span>;
      case "classroll":
        return <span>{mar.user.classroll}</span>;
      case "email":
        return <span>{mar.user.email}</span>;
      case "certificateDate":
        return <span className="whitespace-nowrap">{mar.certificateDate}</span>;
        case "category":
        return <span className="whitespace-nowrap">{mar.marCategory.category}</span>;
      case "year":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{mar.year}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-400">{user.name}</p> */}
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[mar.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
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
            <Tooltip content="Verify" color="success" className="text-white">
              <span className="text-lg text-success cursor-pointer active:opacity-50">
                <IoShieldCheckmarkOutline
                  onClick={() => handleVerify(mar._id, mar.user.email)}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Reject">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdOutlineCancel
                  onClick={() => handleReject(mar._id, mar.user.email)}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")} // Update: Clear filter directly
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
          <Button
              color="primary"
              onClick={() => {
                exportHandler();
              }}
            >
              Export
            </Button>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Batch
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Batch Filter" // Update: Correct aria-label
                closeOnSelect={false}
                selectedKeys={[batchFilter]} // Update: Pass batchFilter as an array
                selectionMode="single" // Update: Set selectionMode to "single"
                onSelectionChange={(selection) => {
                  const selectedValue = Array.from(selection as Set<string>); // Convert Set to array of strings
                  setBatchFilter(selectedValue[0]); // Safely extract the first element
                }}
              >
                {batchOptions.map((batch) => (
                  <DropdownItem key={batch.uid} className="capitalize">
                    {batch.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status Filter" // Update: Correct aria-label
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Columns Filter" // Update: Correct aria-label
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {mar.length} students
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value={mar.length}>{mar.length}</option>

            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    batchFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    mar.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {`${filteredItems.length} students`}
          {/* {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`} */}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages]);

  const [route, setRoute] = useState("");
  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        id="my-table"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
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
    </>
  );
};

export default MarSubmissionList;
