import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaGraduationCap, FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { FaRectangleList } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";

type Props = {};
const sidebarList = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    url: "/admin/dashboard",
  },
  {
    title: "Students",
    icon: FaUsers,
    url: "/admin/students",
  },
  {
    title: "Moocs",
    icon: FaGraduationCap,
    url: "/admin/moocs",
  },
  {
    title: "Mar",
    icon: PiCertificateFill,
    url: "/admin/mar",
  },
  {
    title: "Moocs List",
    icon: FaRectangleList,
    url: "/admin/moocs-list",
  },
  {
    title: "Mar List",
    icon: FaRectangleList,
    url: "/admin/mar-list",
  },
  {
    title: "New Registration",
    icon: HiUserAdd,
    url: "/admin/new-registration",
  },
];
const AdminSidebar = (props: Props) => {
  const pathname = usePathname();
  return (
    <div className="w-[16rem] bg-slate-100 h-full py-4 px-3 overflow-hidden border-slate-200 border-1 items-stretch flex-grow">
      {sidebarList.map((item,index) => (
        <Link href={item.url} key={index}>
          <div
            className={`space-x-4 flex items-center text-slate-500 my-2  py-2 px-2 rounded-lg hover:bg-white cursor-pointer transition ${
              pathname === item.url ? "bg-white" : "bg-transparent"
            }`}
          >
            <item.icon size={20} className="text-slate-500"/>
            <span className="font-medium text-lg">{item.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
