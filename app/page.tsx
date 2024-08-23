"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  return (
    <div className="mt-[300px] flex size-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1">
        Welcome to{" "}
        <div className="flex">
          <Image src="/icons/app-icon.jpg" width={25} height={25} alt="icon" />
          <p className="primary-text-gradient ms-2">Car Wash Solutions</p>
        </div>
        <Button
          className="mt-2 border-2 border-white bg-[#000] text-bone-white"
          onClick={() =>
            signIn("cognito", { callbackUrl: "/location-selector" })
          }
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Page;
