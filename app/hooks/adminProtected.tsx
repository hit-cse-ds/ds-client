import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import AdminAuth from "./adminAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  // const isAuthenticated = userAuth();
  // const { user } = useSelector((state: any) => state.auth);

  // if (isAuthenticated) {
  //   if (user) {
  //     const isAdmin = user?.role === "admin";
  //     return isAdmin ? children : redirect("/");
  //   }
  // } else {
  //   redirect("/");
  // }
  const isAdmin = AdminAuth();
  return isAdmin ? children : redirect("/");
}
