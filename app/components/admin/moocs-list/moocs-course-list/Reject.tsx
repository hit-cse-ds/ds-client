import {
  useAdminMoocsCourseListQuery,
  useDeactivteMoocsCourseMutation,
} from "@/redux/features/api/admin/adminApi";
import { Button} from "@nextui-org/react";
import React, { FC, useEffect } from "react";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  id: string;
};

const Reject: FC<Props> = ({ setRoute, id }) => {

  const [deactivteMoocsCourse, { isSuccess, error, isLoading, data }] =
    useDeactivteMoocsCourseMutation();

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

  const handleDeativate = async () => {
    await deactivteMoocsCourse({
      id,
    });
  };

  return (
    <div>
      <h3 className="font-semibold text-lg text-slate-800">
        Account Deactivation!
      </h3>
      <span>Proceed with Deactivation?</span>
      <div className="flex justify-end mt-4">
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
            onClick={() => {
              handleDeativate();
            }}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Loading..." : "Deactivate"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reject;
