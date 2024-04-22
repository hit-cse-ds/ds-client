import { useAdminMarDataQuery, useVerifyMarMutation } from '@/redux/features/api/admin/adminApi';
import { Button, Checkbox } from '@nextui-org/react'
import React, { FC, useEffect } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
  setRoute: (route: string) => void;
  id:string;
  email:string;
}

const Verify:FC<Props> = ({setRoute,email,id}) => {

  const [isSelected, setIsSelected] = React.useState(true);

  const [verifyMar, { isSuccess, error, isLoading, data }] =
  useVerifyMarMutation();

const { refetch } = useAdminMarDataQuery({}, { refetchOnMountOrArgChange: true });

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
  await verifyMar({
    id,
    email: isSelected,
  });
};

  return (
    <div>
        <h3 className='font-semibold text-lg text-slate-800'>Certificate Verification Confirmation!</h3>
        <div className="overflow-hidden">
        <Checkbox
          aria-label="name"
          className="my-2"
          isSelected={isSelected}
          onValueChange={setIsSelected}
        >
          <div className="w-full flex flex-col ms-2">
            <span className=" text-slate-800 text-base">
              Send activation mail to{" "}
            </span>
            <span className="text-tiny text-slate-500">
              {email}
            </span>
          </div>
        </Checkbox>
      </div>
        <div className='flex justify-end mt-4'>
        <Button
            size="md"
            variant="solid"
            className='bg-green-600 font-semibold text-white'
            // onPress={setRoute("")}
            onClick={() => {handleActivate();}}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Loading..." : "Verify"}
          </Button>
        </div>
    </div>
  )
}

export default Verify