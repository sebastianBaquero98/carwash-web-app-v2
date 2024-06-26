"use client";
import React, { useState } from "react";
import Image from "next/image";
import { orderChangeState } from "@/lib/actions/order.actions";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import CashoutDialog from "./CashoutDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateLocationMetricsChangeState } from "@/lib/actions/location-metrics.action";

interface props {
  state: string;
  hasBays: boolean;
  shardId: string;
  orderId: string;
  isPaid?: boolean;
  date: string;
  estimatedPickUpTime: string;
  price: number;
}

const ActionBtns = ({
  state,
  shardId,
  isPaid,
  orderId,
  hasBays,
  date,
  estimatedPickUpTime,
  price,
}: props) => {
  const { data: session } = useSession();
  const [actualState, setActualState] = useState(state);
  let accessToken = "";
  let locationId = "";
  if (session) {
    accessToken = session.id_token;
    locationId = session.locationId;
  }

  //   const handleClickStart = () => {
  //     orderChangeState(accessToken, shardId, orderId, hasBays);
  //     setActualState(hasBays ? "ST" : "S");
  //   };

  const handleChangeState = () => {
    if (state === "NS") {
      if (hasBays) {
        orderChangeState(accessToken, shardId, orderId, "ST");

        setActualState("ST");
      } else {
        orderChangeState(accessToken, shardId, orderId, "S");
        setActualState("S");
      }
      updateLocationMetricsChangeState(
        accessToken,
        "orderStart",
        date,
        orderId,
        locationId
      );
    } else if (state === "ST") {
      orderChangeState(accessToken, shardId, orderId, "S");
      setActualState("S");
    } else if (state === "S") {
      if (isPaid) {
        orderChangeState(accessToken, shardId, orderId, "P");
      } else {
        orderChangeState(accessToken, shardId, orderId, "UP");
        setActualState("UP");
      }
      updateLocationMetricsChangeState(
        accessToken,
        "orderFinish",
        date,
        orderId,
        locationId,
        estimatedPickUpTime
      );
    }
  };
  return (
    <div className="flex flex-col items-end justify-center gap-3 ">
      {actualState === "NS" && (
        <button
          onClick={handleChangeState}
          className="flex size-[30px] items-center justify-center rounded-full bg-rolex-green"
        >
          <p className="mt-2 size-[30px] items-center justify-center text-center">
            S
          </p>
        </button>
      )}
      {actualState === "ST" && (
        <button
          onClick={handleChangeState}
          className="flex size-[30px] items-center justify-center rounded-full bg-rolex-green"
        >
          <p className="mt-2 size-[30px] items-center justify-center text-center">
            ST
          </p>
        </button>
      )}
      {actualState === "S" && (
        <button
          onClick={handleChangeState}
          className="flex size-[30px] items-center justify-center rounded-full bg-f1-red"
        >
          <p className="mt-2 size-[30px] items-center justify-center text-center">
            F
          </p>
        </button>
      )}
      {actualState === "UP" && (
        <CashoutDialog
          isBefore={false}
          shardId={shardId}
          orderId={orderId}
          price={price}
          state={actualState}
        />
      )}

      <button className="flex size-[30px] items-center justify-center rounded-full bg-light-blue">
        <p className="mb-3 size-[30px] items-center justify-center text-center text-[30px]">
          +
        </p>
      </button>

      <Dialog>
        <DialogTrigger asChild>
          <Image
            src="/icons/trash-icon.svg"
            width={40}
            height={40}
            alt="trash-icon"
          />
        </DialogTrigger>
        <DialogContent className="bg-bone-white text-dark-blue sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure yoy want to delete this order?
            </DialogDescription>
          </DialogHeader>

          <Input
            placeholder="Write the reason"
            className="col-span-3 text-dark-blue"
          />

          <DialogFooter>
            <Button className="bg-navy-blue  text-bone-white">
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionBtns;
