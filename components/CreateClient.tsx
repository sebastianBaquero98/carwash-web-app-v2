import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { carColorsOptions, carMakeOptions, carTypes } from "@/constants";
import { ScrollArea } from "./ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { createClient } from "@/lib/actions/client.actions";
import { useToast } from "@/hooks/use-toast";

const CreateClient = ({
  phoneNumber,
  onComplete,
  accessToken,
  setDoesClientExist,
}: any) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedCarMake, setSelectedCarMake] = useState({
    value: "",
    label: "",
  });
  const [selectedCarType, setSelectedCarType] = useState({
    value: "",
    label: "",
  });
  const [selectedCarColor, setSelectedCarCalor] = useState({
    value: "",
    label: "",
  });
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);

  useEffect(() => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (clientEmail !== "") {
      setIsEmailCorrect(emailRegex.test(clientEmail));
    }
  }, [clientEmail]);

  const handleSubmit = async () => {
    // Send Submit
    const client = await createClient(
      accessToken,
      clientName,
      phoneNumber,
      selectedCarMake.value,
      selectedCarType.value,
      selectedCarColor.value
    );
    toast({
      title: "Client Created Successfully",
    });
    // console.log("this is client,", client);
    const data = {
      clientName,
      clientEmail,
      clientId: client.clientId,
      clientPhoneNumber: phoneNumber,
      garageId: client.garageId,
      carId: client.cardId,
      carTypeId: selectedCarType.value,
      carTypeName: selectedCarType.label,
    };
    onComplete(data);
    setDoesClientExist(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="size-[37px] items-center justify-center rounded-[10px] bg-mclaren-orange text-center text-[20px]"
          onClick={() => setOpen(true)} // Open the Dialog
        >
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg border-2 border-mclaren-orange bg-white">
        <DialogHeader className="text-dark-blue">
          <DialogTitle className=" ">Create Client</DialogTitle>
        </DialogHeader>
        <Input
          onChange={(e) => setClientName(e.target.value)}
          className="bg-[#DEE2E9] text-dark-blue"
          placeholder="Client Name"
        />
        <Input
          className="bg-[#DEE2E9] text-dark-blue"
          placeholder="Insert Phone Number"
          value={phoneNumber}
        />
        <Input
          className="bg-[#DEE2E9] text-dark-blue"
          placeholder="Client Email"
          type="email"
          onChange={(e) => setClientEmail(e.target.value)}
        />
        {!isEmailCorrect && (
          <p className="text-[13px] text-ferrari-red">Enter a valid email</p>
        )}

        <div className="flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={
                  selectedCarMake.label !== ""
                    ? "border-2 border-mclaren-orange bg-dark-blue text-white"
                    : "bg-[#DEE2E9] text-dark-blue"
                }
              >
                {selectedCarMake.label !== ""
                  ? selectedCarMake.label
                  : "Car Make"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-lg border-2 border-mclaren-orange bg-dark-blue px-2 text-white">
              <DropdownMenuLabel className="text-center">
                Select Car Make
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="h-[0.5px] w-full bg-mclaren-orange" />
              <ScrollArea className="h-[200px]">
                {carMakeOptions.map((carMakeOption) => (
                  <DropdownMenuItem
                    onSelect={() => setSelectedCarMake(carMakeOption)}
                    className="py-1"
                    key={carMakeOption.label}
                  >
                    {carMakeOption.label}
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={
                  selectedCarType.label !== ""
                    ? "border-2 border-mclaren-orange bg-dark-blue text-white"
                    : "bg-[#DEE2E9] text-dark-blue"
                }
              >
                {selectedCarType.label !== ""
                  ? selectedCarType.label
                  : "Car Type"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-lg border-2 border-mclaren-orange bg-dark-blue px-2 text-white">
              <DropdownMenuLabel className="text-center">
                Select Car Type
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="h-[0.5px] w-full bg-mclaren-orange" />
              <ScrollArea>
                {carTypes.map((type) => (
                  <DropdownMenuItem
                    onSelect={() => setSelectedCarType(type)}
                    className="py-1"
                    key={type.label}
                  >
                    {type.label}
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={
                  selectedCarColor.label !== ""
                    ? "border-2 border-mclaren-orange bg-dark-blue text-white"
                    : "bg-[#DEE2E9] text-dark-blue"
                }
              >
                {selectedCarColor.label !== ""
                  ? selectedCarColor.label
                  : "Car Color"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-lg border-2 border-mclaren-orange bg-dark-blue px-2 text-white">
              <DropdownMenuLabel className="text-center">
                Select Car Color
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="h-[0.5px] w-full bg-mclaren-orange" />
              <ScrollArea className="h-[200px]">
                {carColorsOptions.map((carColor) => (
                  <DropdownMenuItem
                    onSelect={() => setSelectedCarCalor(carColor)}
                    className="flex items-center gap-1 py-1"
                    key={carColor.label}
                  >
                    <div
                      style={{ backgroundColor: carColor.color }}
                      className={`size-4 rounded-full ${carColor.value === "black" ? "border-[0.5px] border-mclaren-orange" : ""}`}
                    ></div>
                    <span>{carColor.label}</span>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={
            selectedCarMake.label === "" ||
            selectedCarColor.label === "" ||
            selectedCarType.label === "" ||
            clientName === "" ||
            clientEmail === "" ||
            !isEmailCorrect
          }
          className="rounded-lg bg-rolex-green text-white"
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClient;
