"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { payOrder } from "@/lib/actions/order.actions";
import { updateLocationMetricsPay } from "@/lib/actions/location-metrics.action";
import { isValid } from "date-fns";

interface props {
  price: number;
  isBefore: boolean;
  shardId: string;
  orderId: string;
  state: string;
  locationId: string;
  date: string;
}

const CashoutDialog = ({
  price,
  isBefore,
  shardId,
  orderId,
  state,
  locationId,
  date,
}: props) => {
  const { data: session } = useSession();
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [inputTip, setInputTip] = useState("");
  const [inputCash, setInputCash] = useState("");
  const [inputCredit, setInputCredit] = useState("");
  const [selectedTipType, setSelectedTipType] = useState("");
  const [isPending, startTransition] = useTransition();

  let accessToken = "";
  if (session) {
    accessToken = session.id_token;
  }

  const isValid = () => {
    if (selectedPaymentType === "single") {
      return selectedPaymentMethod !== "";
    } else if (selectedPaymentType === "multiple") {
      const decimalRegex = /^([^,]*\.\d{1,2}|[0-9]+)$/;
      const isValidDecimal = (value: string) => decimalRegex.test(value);

      if (isValidDecimal(inputCash) && isValidDecimal(inputCredit)) {
        const sum = (parseFloat(inputCash) + parseFloat(inputCredit)).toFixed(
          2
        );
        return (
          inputCash !== "" &&
          inputCredit !== "" &&
          sum === price.toFixed(2).toString()
        );
      } else {
        return false;
      }
    }
  };

  const isTipValid = () => {
    if (inputTip !== "") {
      const decimalRegex = /^([^,]*\.\d{1,2}|[0-9]+)$/;
      const isValidDecimal = (value: string) => decimalRegex.test(value);
      if (isValidDecimal(inputTip)) {
        return selectedTipType !== "";
      } else {
        return false;
      }
    }
    return true;
  };

  const handleCashout = () => {
    const newState = isBefore ? state : "P";
    const isMutiple = selectedPaymentType === "multiple";
    const hasTip = inputTip !== "";
    const paymentMethod = isMutiple ? "" : selectedPaymentMethod;
    const tipType = hasTip ? selectedTipType : "";
    const tipValue = hasTip ? inputTip : "";
    const cash = isMutiple ? inputCash : "";
    const credit = isMutiple ? inputCredit : "";
    startTransition(async () => {
      await payOrder(
        accessToken,
        shardId,
        orderId,
        newState,
        isBefore,
        isMutiple,
        hasTip,
        paymentMethod,
        tipType,
        tipValue,
        cash,
        credit
      );
      await updateLocationMetricsPay(
        accessToken,
        isMutiple,
        hasTip,
        locationId,
        date,
        orderId,
        price,
        tipValue,
        tipType,
        paymentMethod,
        cash,
        credit
      );
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isBefore ? (
          <Image
            src="/icons/cashout-before-icon.svg"
            width={20}
            height={20}
            alt="cashout"
          />
        ) : (
          <button className="flex size-[30px] items-center justify-center rounded-full bg-navy-blue">
            <p className="mt-2 size-[30px] items-center justify-center text-center">
              $
            </p>
          </button>
        )}
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

          {selectedPaymentType === "single" && (
            <div className="flex items-center gap-4">
              <Button
                onClick={() =>
                  selectedPaymentMethod === "cash"
                    ? setSelectedPaymentMethod("")
                    : setSelectedPaymentMethod("cash")
                }
                className={` text-bone-white ${selectedPaymentMethod === "cash" ? "bg-navy-blue" : "bg-slate-500"}`}
              >
                Cash
              </Button>
              <Button
                onClick={() =>
                  selectedPaymentMethod === "credit"
                    ? setSelectedPaymentMethod("")
                    : setSelectedPaymentMethod("credit")
                }
                className={`  text-bone-white ${selectedPaymentMethod === "credit" ? "bg-navy-blue" : "bg-slate-500"}`}
              >
                Credit
              </Button>
            </div>
          )}
          {selectedPaymentType === "multiple" && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Cash</Label>
                <Input
                  type="text"
                  pattern="[0-9]*\.?[0-9]{1,2}"
                  className="col-span-3 text-[16px]"
                  value={inputCash}
                  onChange={(e) => setInputCash(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Credit
                </Label>
                <Input
                  type="text"
                  pattern="[0-9]*\.?[0-9]{1,2}"
                  className="col-span-3 text-[16px]"
                  value={inputCredit}
                  onChange={(e) => setInputCredit(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-right">
              Tip Value
            </Label>
            <Input
              type="text"
              pattern="[0-9]*\.?[0-9]{1,2}"
              className="col-span-3 text-[16px]"
              value={inputTip}
              onChange={(e) => setInputTip(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() =>
                selectedTipType === "cash"
                  ? setSelectedTipType("")
                  : setSelectedTipType("cash")
              }
              className={` text-bone-white ${selectedTipType === "cash" ? "bg-navy-blue" : "bg-slate-500"}`}
            >
              Cash
            </Button>
            <Button
              onClick={() =>
                selectedTipType === "credit"
                  ? setSelectedTipType("")
                  : setSelectedTipType("credit")
              }
              className={`  text-bone-white ${selectedTipType === "credit" ? "bg-navy-blue" : "bg-slate-500"}`}
            >
              Credit
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleCashout}
            className="bg-rolex-green  text-bone-white"
            disabled={isPending || !isValid() || !isTipValid()}
          >
            {isPending
              ? "Loading..."
              : !isValid() || !isTipValid()
                ? "Check Fields"
                : "Confirm Checkout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CashoutDialog;
