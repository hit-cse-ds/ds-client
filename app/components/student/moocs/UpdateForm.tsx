import { useLoadMoocsListQuery } from "@/redux/features/api/moocs/moocsApi";
import React, { useState } from "react";
import MoocsSubmissionForm from "./MoocsSubmissionForm";

type Props = {};

const UpdateForm = (props: Props) => {
  const { data } = useLoadMoocsListQuery({});
  // const [selectedTitle, setSelectedTitle] = useState("");
  // const [platform, setPlatform] = React.useState("");
  // const [credit, setCredit] = React.useState<number | string>('');
  // const [startDate, setStartDate] = React.useState<Date | null>(null);
  // const [endDate, setEndDate] = React.useState<Date | null>(null);
  const editMoocs = {
    _id: "6617a58c4c834187166ed4fb",
    titleId: "66170d88e24dd7ef83b4e612",
    startDate: "10-02-2024",
    endDate: "05-04-2024",
    year: "2022",
    verificationUrl: "verification url",
    fileUrl: "https://res.cloudinary.com/dxmvkaoql/image/upload/v1712826512/Document_Moocs/phfrc0gjqxnky2t9iqmw.pdf",
  };
  return <div>{data && <MoocsSubmissionForm moocs={data.moocsList} editMoocs={editMoocs}/>}</div>;
};

export default UpdateForm;
