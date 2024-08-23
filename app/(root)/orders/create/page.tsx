"use client";
import ClientGarage from "@/components/ClientGarage";
import ClientSearchInput from "@/components/ClientSearchInput";
import OrderHistory from "@/components/OrderHistory";
import {
  getClientGarage,
  getClientOrderHistory,
} from "@/lib/actions/client.actions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useTransition } from "react";

export default function CreateOrder() {
  const { data: session } = useSession();
  const [isPendingHistory, startTransitionHistory] = useTransition();
  const [step, setStep] = useState("");
  const [cars, setCars] = useState([]);
  const [oH, setOrderHistory] = useState([]);
  const [orderData, setOrderData] = useState({
    clientId: "",
    locationId: "",
    comment: "",
    garageId: "",
    carId: "",
    discount: 0,
    discountType: "NA",
    orderState: "NS",
    price: "",
    extraServices: "",
    estimatedPickUpTime: "",
    serviceGroupId: "",
    serviceId: "",
    tz: "",
    clientName: "",
    clientEmail: "",
    carTypeId: "",
  });

  let accessToken = "";
  if (session) {
    accessToken = session.id_token;
  }

  const updateOrderData = (newData: any, step: string) => {
    setOrderData((prevData) => ({ ...prevData, ...newData }));
    setStep(step);
  };

  useEffect(() => {
    if (step === "clientGarage") {
      setCars([]);
      const fetchCars = async () => {
        const cars = await getClientGarage(accessToken, orderData.garageId);
        setCars(cars);
      };
      fetchCars();
    } else if (step === "orderHistory") {
      setOrderHistory([]);
      startTransitionHistory(async () => {
        const fetchOrderHistory = async () => {
          const orderHistory = await getClientOrderHistory(
            accessToken,
            orderData.carId,
            orderData.carTypeId,
            orderData.clientId
          );
          setOrderHistory(orderHistory);
        };
        fetchOrderHistory();
      });
    }
  }, [step, orderData.carId]);

  return (
    <div className="mt-1 flex flex-col ">
      <p className="ms-[35px] text-[16px] font-extralight tracking-[9%]">
        Search for Client
      </p>
      {accessToken && (
        <ClientSearchInput
          onComplete={updateOrderData}
          accessToken={accessToken}
        />
      )}
      <p className="ms-[35px] mt-5 text-[16px] font-extralight tracking-[9%]">
        Pick car from Garage
      </p>
      {cars.length > 0 && (
        <ClientGarage
          data={orderData}
          onComplete={updateOrderData}
          cars={cars}
        />
      )}
      <div className="relative inline-block">
        <p className="ms-[35px] mt-5 text-[16px] font-extralight tracking-[9%]">
          Order History
        </p>
        {isPendingHistory && (
          <span className="absolute right-[200px] top-[15px] flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-mclaren-orange opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-mclaren-orange"></span>
          </span>
        )}
      </div>

      {step === "orderHistory" && oH.length > 0 && (
        <OrderHistory history={oH} />
      )}
    </div>
  );
}
