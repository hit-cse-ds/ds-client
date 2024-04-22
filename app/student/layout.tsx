'use client'
import React from "react";
import Protected from "../hooks/useProtected";

type Props = {};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Protected>{children}</Protected>;
}
