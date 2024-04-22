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
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { columns, statusOptions, batchOptions } from "./data";
import { capitalize } from "./utils";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineCancel } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { ModalDialogProps } from "@mui/joy";
import StudentProfile from "./studentProfile/StudentProfile";
import PopUpModal from "@/app/utils/PopUpModal";
import { IoMdRefresh } from "react-icons/io";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const moocStatusColorMap: Record<string, ChipProps["color"]> = {
  verified: "success",
  not_submitted: "danger",
  pending: "primary",
};

const marStatusColorMap: Record<string, ChipProps["color"]> = {
  verified: "success",
  not_submitted: "danger",
  pending: "primary",
};

const INITIAL_VISIBLE_COLUMNS = [
  "universityroll",
  "name",
  "classroll",
  "totalMar",
  "totalMoocs",
  "actions",
];

type Props = {
  users: any;
};

const StudentsList: FC<Props> = ({ users }) => {
  type User = (typeof users)[0];
  const [filterValue, setFilterValue] = React.useState("");
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
    column: "classRollNo",
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
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.moocsStatus)
      );
    }
    if (batchFilter !== "all") {
      // Update: Apply batch filter if it's not "all"
      filteredUsers = filteredUsers.filter((user) => user.year === batchFilter);
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, batchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    const handleProfileView = (id: string) => {
      setRoute("studentProfile");
      setLayout("center");
      setSelectedId(id);
    };

    switch (columnKey) {
      case "name":
        return <span className="font-medium">{user.name}</span>;
      case "batch":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-400">{user.name}</p> */}
          </div>
        );
      case "moocsStatus":
        return (
          <Chip
            className="capitalize"
            color={moocStatusColorMap[user.moocsStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "marStatus":
        return (
          <Chip
            className="capitalize"
            color={marStatusColorMap[user.marStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View Profile">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdAccountCircle
                  size={25}
                  onClick={() => handleProfileView(user._id)}
                />
              </span>
            </Tooltip>
            {/* <Tooltip content="Verify" color="success" className="text-white">
              <span className="text-lg text-success cursor-pointer active:opacity-50">
                <IoShieldCheckmarkOutline
                  // onClick={() => handleVerify(user.universityRollNo)}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Reject">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdOutlineCancel 
                // onClick={() => handleReject(user.universityRollNo)} 
                />
              </span>
            </Tooltip> */}
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

  const doc = new jsPDF({
    orientation: "landscape", // Set document orientation to landscape
  });
  const exportHandler = () => {
    const addCustomHeader = () => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");

      doc.text(
        "Students List",
        doc.internal.pageSize.getWidth() / 2,
        15,
        { align: "center" }
      );
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
    doc.save("students_list.pdf");
  };

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
            Total {users.length} students
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
              <option value={users.length}>{users.length}</option>
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
    users.length,
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
  const [selectedId, setSelectedId] = React.useState("");

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
            <TableRow key={item.universityroll}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {route === "studentProfile" && (
        <>
          {layout && (
            <PopUpModal
              layout={layout}
              setLayout={setLayout}
              setRoute={setRoute}
              component={StudentProfile}
              route="viewPdf"
              id={selectedId}
            />
          )}
        </>
      )}
    </>
  );
};

export default StudentsList;
