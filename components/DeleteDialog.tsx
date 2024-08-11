"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteOrder } from "@/lib/actions/order.actions";
import { useSession } from "next-auth/react";

interface props {
  id: string;
  orderId: string;
  locationId: string;
}

const DeleteDialog = ({ id, orderId, locationId }: props) => {
  const { data: session } = useSession();
  const [inputReason, setInputReason] = useState("");

  let accessToken = "";
  if (session) {
    accessToken = session.id_token;
  }
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("entro");
    deleteOrder(accessToken, id, orderId, locationId);
  };
  return (
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
          onChange={(e) => setInputReason(e.target.value)}
        />

        <DialogFooter>
          <Button
            onClick={(e) => handleDelete(e)}
            className="bg-navy-blue  text-bone-white"
            disabled={!(inputReason.length > 1)}
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
