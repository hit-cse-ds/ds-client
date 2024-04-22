import Link from "next/link";
import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
export const navItemsData = [
  {
    name: "About Us",
    url: "/about",
  },
  {
    name: "Contact Us",
    url: "/contact",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const TopNavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="flex">
     
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-white"
                    : "dark:text-white text-white"
                } text-[18px px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
           <ThemeSwitcher />
      </div>
    </>
  );
};

export default TopNavItems;
