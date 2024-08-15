"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
// import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { Button } from "@/components/ui/button";

interface props {
  locationName: string;
}
const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        return (
          <SheetClose asChild key={link.route}>
            <Link
              href={link.route}
              className={`${
                isActive ? "primary-gradient  rounded-lg" : ""
              } flex items-center justify-start gap-4 bg-transparent p-4 `}
            >
              <p
                className={`${isActive ? "text-[18px] font-bold leading-[140%]" : "text-[18px] font-medium leading-[25.2px]"}`}
              >
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const NavBar = ({ locationName }: props) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleToggle = () => {
    console.log("entro");
    setIsClicked(!isClicked);
  };
  return (
    <Sheet>
      <SheetContent side="right" className="border-none bg-[#000]">
        <div className="flex items-center">
          <Image src="/icons/app-icon.jpg" width={25} height={25} alt="icon" />

          <p className="primary-text-gradient ms-2 text-sm">
            Car Wash Solutions
          </p>
        </div>

        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </div>
      </SheetContent>
      <div className="flex h-[40px] items-center justify-between bg-[#000] px-5 ">
        <div className="flex items-center">
          <Image src="/icons/app-icon.jpg" width={25} height={25} alt="icon" />
          <Button onClick={handleToggle}>
            <p className="primary-text-gradient text-sm">
              {!isClicked ? "Car Wash Solution" : locationName}
            </p>
          </Button>
        </div>
        <SheetTrigger asChild>
          <Image
            src="/icons/gradient-hamburger.svg"
            alt="menu"
            width={25}
            height={25}
            className="primary-gradient"
          />
        </SheetTrigger>
      </div>
    </Sheet>
    // <div className="flex h-[40px] items-center justify-between bg-[#000] px-5 ">
    //   <div className="flex items-center">
    // <Image src="/icons/app-icon.jpg" width={25} height={25} alt="icon" />
    //     <p className="primary-text-gradient ms-2 text-sm">Car Wash Solutions</p>
    //   </div>
    // <Image
    //   src="/icons/gradient-hamburger.svg"
    //   alt="menu"
    //   width={25}
    //   height={25}
    //   className="primary-gradient"
    // />
    // </div>
  );
};

export default NavBar;
