import { useAdminMoocsDataQuery, useRejectMoocsMutation } from "@/redux/features/api/admin/adminApi";
import { Button, Checkbox, Chip, Textarea, User, cn } from "@nextui-org/react";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  id: string;
  email: string;
};

const Reject: FC<Props> = ({ setRoute, id, email }) => {
  const [isSelected, setIsSelected] = React.useState(true);
  const [reason, setReason] = React.useState("");
  const [rejectMoocs, { isSuccess, error, isLoading, data }] =
    useRejectMoocsMutation();

  const { refetch } = useAdminMoocsDataQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        toast.success(data.message);
      }
      refetch();
      setRoute("a");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
      setRoute("a");
    }
  }, [isSuccess, error]);

  const handleActivate = async () => {
    await rejectMoocs({
      id,
      email: isSelected,
      reason
    });
  };

  return (
    <div>
      <h3 className="font-semibold text-lg text-slate-800">
        Certificate Verification Confirmation!
      </h3>
      <span>
        Please provide a reason for rejecting the verification of this
        certificate.
      </span>
      <div className="flex flex-col mt-4">
        <div>
          <Textarea
            id="reject"
            onChange={(e) => {setReason(e.target.value);}}
            variant="faded"
            labelPlacement="outside"
            placeholder="Enter reason for rejection"
            className=" mb-6 md:mb-0 text-[.88rem]"
          />
        </div>
        <div className="overflow-hidden">
          <Checkbox
            aria-label="name"
            className="my-2"
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            <div className="w-full flex flex-col ms-2">
              <span className=" text-slate-800 text-base">
                Send rejection mail to{" "}
              </span>
              <span className="text-tiny text-slate-500">{email}</span>
            </div>
          </Checkbox>
        </div>
        <div className="flex w-full justify-end mt-4 space-x-3">
          <Button
            size="md"
            variant="solid"
            className=" font-semibold"
            // onPress={setRoute("")}
            onClick={() => {
              setRoute("");
            }}
          >
            Cancel
          </Button>
          <Button
            size="md"
            variant="solid"
            className="bg-danger font-semibold text-white"
            // onPress={setRoute("")}
            onClick={() => {
              handleActivate();
            }}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Loading..." : "Reject"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reject;
