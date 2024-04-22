import React, { FC } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import { useMediaQuery, useTheme } from "@mui/material";

type Props = {
  layout: any;
  setLayout: (open: any) => void;
  component: any;
  route?:string;
  setRoute?: (route: string) => void;
  pdfUrl?:string;
  verificationUrl?:string;
  id?:string;
  email?:string;
};

const PopUpModel: FC<Props> = ({
  layout,
  setLayout,
  setRoute,
  route,
  component: Component,
  pdfUrl,
  verificationUrl,
  id,
  email
}) => {
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  if(!greaterThanMid){
    setLayout("fullscreen");
  } else {
    setLayout("center");
  }
  return (
    <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}>
          <ModalClose />
          {/* <DialogTitle>Filters</DialogTitle> */}
          <div className={`m-auto  ${route === "viewPdf"? "w-[60vw] max-md:w-full" :"800px:w-[450px]"} `}>
          <Component setRoute={setRoute} pdfUrl={pdfUrl} verificationUrl={verificationUrl} id={id} email={email}/>
        </div>
        </ModalDialog>
      </Modal>
  );
};

export default PopUpModel;