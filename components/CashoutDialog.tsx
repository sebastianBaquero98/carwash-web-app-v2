"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface props {
  price: number;
}

const CashoutDialog = ({ price }: props) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [selectedTipType, setSelectedTipType] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src="/icons/cashout-before-icon.svg"
          width={20}
          height={20}
          alt="cashout"
        />
      </DialogTrigger>
      <DialogContent className="bg-bone-white text-dark-blue sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cashout Order</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>{`Pick payment method for: $${price}`}</p>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setSelectedPaymentType("single")}
              className={`  text-bone-white ${selectedPaymentType === "single" ? "bg-navy-blue" : "bg-slate-500"}`}
            >
              Single Payment
            </Button>
            <Button
              onClick={() => setSelectedPaymentType("multiple")}
              className={`  text-bone-white ${selectedPaymentType === "multiple" ? "bg-navy-blue" : "bg-slate-500"}`}
            >
              Multiple Payment
            </Button>
          </div>
          {selectedPaymentType === "multiple" && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Cash</Label>
                <Input className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Credit
                </Label>
                <Input className="col-span-3" />
              </div>
            </div>
          )}
          {/* <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Cash
            </Label>
            <Input className="col-span-3" type="number" />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Credit
            </Label>
            <Input className="col-span-3" type="number" />
          </div> */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Tip Value
            </Label>
            <Input className="col-span-3" type="number" />
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setSelectedTipType("cash")}
              className={` text-bone-white ${selectedTipType === "cash" ? "bg-navy-blue" : "bg-slate-500"}`}
            >
              Cash
            </Button>
            <Button
              onClick={() => setSelectedTipType("credit")}
              className={`  text-bone-white ${selectedTipType === "credit" ? "bg-navy-blue" : "bg-slate-500"}`}
            >
              Credit
            </Button>
          </div>
        </div>

        {/* <Input
      placeholder="Write the reason"
      className="col-span-3 text-dark-blue"
    /> */}

        <DialogFooter>
          <Button className="bg-rolex-green  text-bone-white">
            Confirm Cashout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CashoutDialog;
