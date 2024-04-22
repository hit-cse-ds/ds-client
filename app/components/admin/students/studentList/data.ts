const columns = [
  { name: "UNIVERSITY ROLL NO.", uid: "universityroll", sortable: true },
  { name: "REGISTRATION NO.", uid: "registration", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "CLASS ROLL NO", uid: "classroll", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "BATCH", uid: "year", sortable: true },
  { name: "MAR", uid: "totalMar", sortable: true },
  { name: "MOOCS", uid: "totalMoocs", sortable: true },
  { name: "MOOCS STATUS", uid: "moocsStatus", sortable: true },
  { name: "MAR STATUS", uid: "marStatus", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "verified", uid: "verified" },
  { name: "not submitted", uid: "not_submitted" },
  { name: "Submitted", uid: "submitted" },
];

const batchOptions = [
    { name: "2020", uid: "2020" },
    { name: "2021", uid: "2021" },
    { name: "2022", uid: "2022" },
    { name: "2023", uid: "2023" },
  ];

  export {columns,statusOptions,batchOptions}
    // {
    //   _id:"66115f7d70c9186954196e4c",
    //   universityRollNo: "2205648901",
    //   classRollNo: "22/CSE-DS/01",
    //   name: "John Doe",
    //   email: "john.doe@example.com",
    //   batch: "2023",
    //   moocsStatus: "submitted",
    //   marPoints: 27,
    //   moocsCredits: 4
    // },