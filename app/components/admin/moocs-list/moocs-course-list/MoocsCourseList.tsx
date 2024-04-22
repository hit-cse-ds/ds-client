import React, { useState, FC } from "react";
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
import { ChevronDownIcon } from "../../new-registration/newRegistrationList/ChevronDownIcon";
import { SearchIcon } from "../../new-registration/newRegistrationList/SearchIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "../../new-registration/newRegistrationList/utils";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import PopUpModal from "@/app/utils/PopUpModal";
import { ModalDialogProps } from "@mui/joy";
import Verify from "./Verify";
import Reject from "./Reject";
import { MdOutlineCancel } from "react-icons/md";
import AddMoocsCourse from "./AddMoocsCourse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  inactive: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "platform",
  "credit",
  "status",
  "actions",
];

type Props = {
  moocsCourse: any;
};

const MoocsCourseList: FC<Props> = ({ moocsCourse }) => {
  type MoocsCourse = (typeof moocsCourse)[0];

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
    column: "classroll",
    direction: "ascending",
  });

  const [selectedId, setSelectedId] = React.useState("");
  const [selectedEmail, setSelectedEmail] = React.useState("");

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...moocsCourse];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((moocsCourse) =>
        moocsCourse.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((moocsCourse) =>
        Array.from(statusFilter).includes(moocsCourse.status)
      );
    }

    return filteredUsers;
  }, [moocsCourse, filterValue, statusFilter, batchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: MoocsCourse, b: MoocsCourse) => {
      const first = a[sortDescriptor.column as keyof MoocsCourse] as number;
      const second = b[sortDescriptor.column as keyof MoocsCourse] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleView = (roll: string) => {
    setRoute("viewPdf");
    setLayout("center");
  };

  const handleVerify = (id: string) => {
    setRoute("verify");
    setLayout("center");
    setSelectedId(id);
  };

  const handleReject = (id: string) => {
    setRoute("reject");
    setLayout("center");
    setSelectedId(id);
  };

  const doc = new jsPDF();
  const exportHandler = () => {
    const addCustomHeader = () => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");

      doc.text("Moocs Course List", doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
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
    doc.save("moocs_course_list.pdf");
  };

  const renderCell = React.useCallback(
    (moocsCourse: MoocsCourse, columnKey: React.Key) => {
      const cellValue = moocsCourse[columnKey as keyof MoocsCourse];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[moocsCourse.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {moocsCourse.status === "inactive" ? (
                <Tooltip
                  content="Activate"
                  color="success"
                  className="text-white"
                >
                  <span className="text-lg text-success cursor-pointer active:opacity-50">
                    <IoShieldCheckmarkOutline
                      onClick={() => handleVerify(moocsCourse._id)}
                    />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip color="danger" content="Deactivate">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <MdOutlineCancel
                      onClick={() => handleReject(moocsCourse._id)}
                    />
                  </span>
                </Tooltip>
              )}
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

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
            placeholder="Search by title..."
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
            <Button
              color="primary"
              onClick={() => {
                setRoute("addCourse");
                setLayout("center");
              }}
            >
              Add Course
            </Button>
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
            Total {moocsCourse.length} Moocs Course
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
              <option value={moocsCourse.length}>{moocsCourse.length}</option>
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
    moocsCourse.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {`${filteredItems.length} Moocs Course`}
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
        <TableBody emptyContent={"No record found"} items={sortedItems}>
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
              id={selectedId}
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
              id={selectedId}
            />
          )}
        </>
      )}
      {route === "addCourse" && (
        <>
          {layout && (
            <PopUpModal
              layout={layout}
              setLayout={setLayout}
              setRoute={setRoute}
              component={AddMoocsCourse}
              id={selectedId}
              email={selectedEmail}
            />
          )}
        </>
      )}
    </>
  );
};

export default MoocsCourseList;
