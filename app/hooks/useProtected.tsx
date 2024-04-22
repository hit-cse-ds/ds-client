import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps{
    children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isUser = UserAuth();
  return isUser ? children : redirect("/");
  // const isAuthenticated = userAuth();
  // const { user } = useSelector((state: any) => state.auth);

  // if (isAuthenticated) {
  //   if (user) {
  //     const isAdmin = user?.role === "user";
  //     return isAdmin ? children : redirect("/");
  //   }
  // } else {
  //   redirect("/");
  // }
}
