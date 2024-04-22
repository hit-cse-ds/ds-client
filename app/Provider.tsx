import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children: any;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <Provider store={store}>{children}</Provider>
    </NextUIProvider>
  )
}
