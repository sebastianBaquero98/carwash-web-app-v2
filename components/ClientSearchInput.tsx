"use client";
import { getClientByPhoneNumber } from "@/lib/actions/client.actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useState, useTransition } from "react";

const ClientSearchInput = ({ onComplete, accessToken }: any) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const client = await getClientByPhoneNumber(accessToken, phoneNumber);
      // console.log(client);
      if (client !== "NF") {
        const data = {
          clientName: client.clientName,
          clientEmail: client.clientEmail,
          clientId: client.clientId,
          garageId: client.garageId,
        };
        onComplete(data, "clientGarage");
        // router.push(`/orders/create?garageId=${client.garageId}`);
      }
    });
  };
  return (
    <div className="flex items-center gap-3">
      <div className="ms-[-15px] mt-1 w-[310px] rounded-xl bg-light-blue p-2">
        <Input
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          placeholder="Insert phone number"
          className="h-[35px] w-full rounded-md border-0 bg-white px-3 ps-10 text-[16px] text-black placeholder:text-[13px] placeholder:text-light-blue focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <div className="relative inline-block">
        <Button
          disabled={isPending}
          onClick={(e) => handleSubmit(e)}
          className="size-[37px] items-center justify-center rounded-[10px] bg-light-blue text-center text-[20px]"
        >
          {"->"}
        </Button>
        {isPending && (
          <span className="absolute -right-1 -top-1 flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-mclaren-orange opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-mclaren-orange"></span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ClientSearchInput;
