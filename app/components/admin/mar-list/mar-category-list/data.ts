const columns = [
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "MAR POINTS", uid: "perMarPoints", sortable: true },
  { name: "MAX MAR POINTS", uid: "maximumMarPoints", sortable: true },
  { name: "MAX FILE", uid: "maxFile", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "active", uid: "active" },
  { name: "inactive", uid: "inactive" },
];



export { columns, statusOptions };
