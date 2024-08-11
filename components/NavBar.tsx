import React from "react";
import Image from "next/image";

const NavBar = () => {
  return (
    <div className="flex h-[40px] items-center justify-between bg-[#000] px-5 ">
      <div className="flex items-center">
        <Image src="/icons/app-icon.jpg" width={25} height={25} alt="icon" />
        <p className="primary-text-gradient ms-2 text-sm">Car Wash Solutions</p>
      </div>
      <Image
        src="/icons/gradient-hamburger.svg"
        alt="menu"
        width={25}
        height={25}
        className="primary-gradient"
      />
    </div>
  );
};

export default NavBar;
