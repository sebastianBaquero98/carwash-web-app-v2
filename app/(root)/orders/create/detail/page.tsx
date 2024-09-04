"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useOrderContext } from "@/context/OrderContext";

const OrderDetail = () => {
  const { orderData, updateOrderData } = useOrderContext();
  const [selectedDiscount, setIsSelectedDiscount] = useState("");
  const [discount, setDiscount] = useState(0);
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState(
    parseFloat(orderData.service.price) +
      orderData.extraServices.reduce(
        (sum, service) => sum + parseFloat(service.price),
        0
      )
  );
  console.log(orderData);
  // useEffect(() => {
  //   if (selectedDiscount === "FIXED") {
  //     setPrice((prevValue) => prevValue - discount);
  //   } else if (selectedDiscount === "PERCENTAGE") {
  //     setPrice((prevValue) => prevValue - prevValue * (discount / 100));
  //   }
  // }, [selectedDiscount, discount]);

  useEffect(() => {
    let dis = 0;
    if (!Number.isNaN(discount)) {
      dis = discount;
    }
    // console.log(discount);
    let totalPrice =
      parseFloat(orderData.service.price) +
      orderData.extraServices.reduce(
        (sum, service) => sum + parseFloat(service.price),
        0
      );

    if (selectedDiscount === "FIXED") {
      totalPrice -= dis;
    } else if (selectedDiscount === "PERCENTAGE") {
      totalPrice -= (totalPrice * dis) / 100;
    }
    const formattedPrice = parseFloat(totalPrice.toFixed(2));
    setPrice(formattedPrice);
  }, [
    selectedDiscount,
    discount,
    orderData.service.price,
    orderData.extraServices,
  ]);

  const handleConfirm = () => {
    // Clear the order data
    updateOrderData({
      clientId: "",
      locationId: "",
      comment: "",
      garageId: "",
      carId: "",
      discount: 0,
      discountType: "",
      orderState: "",
      extraServices: [],
      estimatedPickUpTime: "",
      tz: "",
      clientName: "",
      clientEmail: "",
      carTypeId: "",
      clientPhoneNumber: "",
      carTypeName: "",
      service: { serviceName: "", serviceId: "", price: 0, serviceGroupId: "" },
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-1 text-[17px]">Order Detail</h1>
      <div className="flex w-[323px] flex-col items-center justify-center gap-2 rounded-[20px] border-8 border-light-blue p-2">
        <div className="flex h-[82px] w-[285px] justify-between rounded-[10px] bg-[#F4F5F9] px-4">
          <div className="flex h-full flex-col justify-center">
            <p className=" text-[17px] font-bold text-dark-blue ">
              {orderData.clientName}
            </p>
            <p className="text-[10px] text-dark-blue">
              {orderData.clientEmail}
            </p>
            <p className="text-[10px] text-dark-blue">
              {orderData.clientPhoneNumber}
            </p>
          </div>
          <Image
            src="/icons/edit_client_icon.svg"
            width={25}
            height={25}
            alt="credit-card-icon"
          />
        </div>
        <div className="flex  w-[285px] flex-col items-center rounded-[10px] bg-[#F4F5F9] py-2">
          <h2 className="text-[25px] font-black text-dark-blue">${price}</h2>
          <p className="text-[14px] text-dark-blue">Total Value</p>
          <h2 className="mt-2 text-[14px] font-bold text-dark-blue">
            {orderData.carTypeName}
          </h2>
          <p className="text-[12px] text-dark-blue">
            {orderData.service.serviceName.includes(".")
              ? orderData.service.serviceName.split(".")[1]
              : orderData.service.serviceName}
          </p>
          {orderData.extraServices.map((service) => (
            <p
              key={service.serviceId}
              className="text-[12px] font-light text-dark-blue"
            >
              <span className="font-bold">+</span> {service.serviceName}
            </p>
          ))}

          {/* <p className="h-[20px] w-[104px] bg-[#DEE2E9]">r</p> */}
          <Input
            placeholder="Pick up Time"
            className="mt-3 h-[28px] w-[104px] border-dark-blue bg-[#DEE2E9] text-center align-middle text-dark-blue placeholder:text-[9px] placeholder:text-dark-blue focus:outline-none  focus:ring-2 focus:ring-blue-300"
          />
          <div className="mt-3 flex justify-center gap-1">
            <Button
              onClick={() => setIsSelectedDiscount("FIXED")}
              className={`h-[28px] border-2 border-rolex-green text-[10px] text-rolex-green ${selectedDiscount === "FIXED" ? " bg-rolex-green text-white" : ""}`}
            >
              FIXED
            </Button>
            <Button
              onClick={() => setIsSelectedDiscount("PERCENTAGE")}
              className={`h-[28px] border-2 border-rolex-green text-[10px] text-rolex-green ${selectedDiscount === "PERCENTAGE" ? " bg-rolex-green text-white" : ""}`}
            >
              PERCENTAGE
            </Button>
            <Input
              type="number"
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
              placeholder="amount"
              className="h-[28px] w-[78px] border-dark-blue bg-[#DEE2E9] text-center align-middle text-dark-blue placeholder:text-[10px] placeholder:text-dark-blue focus:outline-none  focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <Textarea
            className="mt-3 h-[59px] w-[255px] rounded-[10px] border-dark-blue bg-[#DEE2E9] text-dark-blue placeholder:text-[10px] placeholder:text-dark-blue"
            placeholder="Add Comment"
          />
        </div>
      </div>
      <Button
        onClick={handleConfirm}
        className="mt-5 w-4/5 rounded-lg border-8 border-rolex-green tracking-[9%]"
      >
        Confirm
      </Button>
    </div>
  );
};

export default OrderDetail;
