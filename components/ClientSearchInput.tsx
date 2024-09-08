"use client";
import { getClientByPhoneNumber } from "@/lib/actions/client.actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useEffect, useState, useTransition } from "react";
import CreateClient from "./CreateClient";
import { useToast } from "@/hooks/use-toast";

const ClientSearchInput = ({ onComplete, accessToken }: any) => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [doesClientExist, setDoesClientExist] = useState(true);
  const [isSentSubmit, setIsSentSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    startTransition(async () => {
      const client = await getClientByPhoneNumber(accessToken, phoneNumber);
      setIsSentSubmit(true);
      // console.log(client);
      if (client !== "NF") {
        const data = {
          clientName: client.clientName,
          clientEmail: client.clientEmail,
          clientId: client.clientId,
          garageId: client.garageId,
          clientPhoneNumber: phoneNumber,
          clientLastServed: client.lastServed,
        };
        onComplete(data, "clientGarage");
        // router.push(`/orders/create?garageId=${client.garageId}`);
      } else {
        // Client does no exist
        setDoesClientExist(false);
        toast({
          title: "Client does not exist",
          description: "Please create the client",
        });
      }
    });
  };

  const handleInputPhoneNumber = (e: any) => {
    setIsSentSubmit(false);
    setDoesClientExist(true);

    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    const phoneRegex = /^\+1\d{10}$/;
    if (phoneNumber !== "") {
      const isValid = phoneRegex.test(phoneNumber);
      setIsValidPhoneNumber(isValid);
    }
  }, [phoneNumber]);
  return (
    <div className="flex items-center gap-3">
      <div
        className={`ms-[-15px] mt-1 w-[310px] rounded-xl ${isValidPhoneNumber && doesClientExist ? "bg-light-blue" : ""} ${!doesClientExist && isValidPhoneNumber ? "bg-mclaren-orange" : ""} ${!isValidPhoneNumber ? "bg-ferrari-red" : ""} ${isSentSubmit && isValidPhoneNumber && doesClientExist ? "bg-rolex-green" : ""} p-2`}
      >
        <Input
          onChange={(e) => handleInputPhoneNumber(e)}
          type="tel"
          placeholder={
            isSentSubmit && !doesClientExist
              ? "Client does not exist"
              : "Insert phone number"
          }
          className={`h-[35px] w-full rounded-md border-0 bg-white px-3 ps-10 ${isSentSubmit && !doesClientExist ? " text-slate-700" : "text-[16px] text-dark-blue"}   placeholder:text-[13px] placeholder:text-light-blue focus:outline-none  focus:ring-2 ${isValidPhoneNumber ? "focus:ring-blue-300" : "focus:ring-ferrari-red"}`}
        />
      </div>
      <div className="relative inline-block">
        {!doesClientExist && isSentSubmit && (
          <CreateClient
            phoneNumber={phoneNumber}
            onComplete={onComplete}
            accessToken={accessToken}
            setDoesClientExist={setDoesClientExist}
          />
        )}
        {!isSentSubmit && (
          <Button
            disabled={isPending || !isValidPhoneNumber}
            onClick={(e) => handleSubmit(e)}
            className="size-[37px] items-center justify-center rounded-[10px] bg-light-blue text-center text-[20px]"
          >
            {"->"}
          </Button>
        )}

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
