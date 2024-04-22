import React, { FC, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button, Checkbox } from "@nextui-org/react";
import Link from "next/link";
import {
  useActivateAccountMutation,
  useActivateMoocsCourseMutation,
  useAdminMoocsCourseListQuery,
  useAllUsersQuery,
  useVerifyMoocsMutation,
} from "@/redux/features/api/admin/adminApi";

type Props = {
  setRoute: (route: string) => void;
  id: string;
};

const Verify: FC<Props> = ({ setRoute, id }) => {

  const [activateMoocsCourse, { isSuccess, error, isLoading, data }] =
    useActivateMoocsCourseMutation();

  const { refetch } = useAdminMoocsCourseListQuery({}, { refetchOnMountOrArgChange: true });

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
    await activateMoocsCourse({
      id
    });
  };
  return (
    <div>
      <h3 className="font-semibold text-lg text-slate-800">
        Account Activation!
      </h3>
      <div className="overflow-hidden">
      Proceed with Activation?
      </div>
      <div className="flex justify-end mt-4">
        <Button
          size="md"
          variant="solid"
          className="bg-green-600 font-semibold text-white"
          onClick={() => {
            handleActivate();
          }}
          disabled={isLoading}
          isLoading={isLoading}
        >
          {isLoading ? "Loading..." : "Activate"}
        </Button>
      </div>
    </div>
  );
};

export default Verify;
