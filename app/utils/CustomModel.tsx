import React, { FC } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
  loginType?: string;
};

const CustomModel: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  loginType,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] !overflow-auto !max-h-[80vh] -translate-x-1/2 -translate-y-1/2 w-[95%] m-auto 800px:w-[450px] bg-white dark:bg-slate-900 shadow p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} loginType={loginType}/>
      </Box>
    </Modal>
  );
};

export default CustomModel;
