"use client";
import ClientGarage from "@/components/ClientGarage";
import ClientSearchInput from "@/components/ClientSearchInput";
import ExtraService from "@/components/ExtraService";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";

import { getClientGarage } from "@/lib/actions/client.actions";
import { getExtraServices, getServices } from "@/lib/actions/services.actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function CreateOrder() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState("");
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [extraServices, setExtraServices] = useState([]);
  const [orderData, setOrderData] = useState({
    clientId: "",
    locationId: "",
    comment: "",
    garageId: "",
    carId: "",
    discount: "0",
    discountType: "NA",
    orderState: "NS",
    price: "",
    extraServices: [],
    estimatedPickUpTime: "",
    serviceGroupId: "",
    serviceId: "",
    servicename: "",
    tz: "",
    clientName: "",
    clientEmail: "",
    carTypeId: "",
  });

  let accessToken = "";
  let locationId = "";
  if (session) {
    accessToken = session.id_token;
    locationId = session.locationId;
  }

  const updateOrderData = (newData: any, step: string) => {
    console.log("entro", newData, step);
    setOrderData((prevData) => ({ ...prevData, ...newData }));
    setStep(step);
  };

  const handleClick = () => {
    // const queryParams = new URLSearchParams(orderData).toString();
    // router.push(`/order-confirmation?${queryParams}`);
    // const queryParams = new URLSearchParams();
    // Object.entries(orderData).forEach(([key, value]) => {
    //   if (typeof value === "string" || typeof value === "number") {
    //     queryParams.append(key, value.toString());
    //   } else if (Array.isArray(value)) {
    //     queryParams.append(key, JSON.stringify(value));
    //   } else if (typeof value === "object" && value !== null) {
    //     queryParams.append(key, JSON.stringify(value));
    //   }
    // });
    // router.push(`/orders/create/detail?${queryParams.toString()}`);
    // const serializedData = encodeURIComponent(JSON.stringify(orderData));
    // router.push(`/orders/create/detail?orderData=${serializedData}`);
    // const queryParams = new URLSearchParams(orderData).toString();
    // router.push(`/order-confirmation?${queryParams}`);
  };

  useEffect(() => {
    if (step === "clientGarage") {
      setCars([]);
      const fetchCars = async () => {
        const cars = await getClientGarage(accessToken, orderData.garageId);
        setCars(cars);
      };
      const fetchServices = async () => {
        const services = await getServices(accessToken, locationId);
        setServices(services);
      };
      const fetchExtraServices = async () => {
        const extraServices = await getExtraServices(accessToken, locationId);
        setExtraServices(extraServices);
      };
      fetchCars();
      fetchServices();
      fetchExtraServices();
    }
    // else if (step === "orderHistory") {
    //   setOrderHistory([]);
    //   startTransitionHistory(async () => {
    //     const fetchOrderHistory = async () => {
    //       const orderHistory = await getClientOrderHistory(
    //         accessToken,
    //         orderData.carId,
    //         orderData.carTypeId,
    //         orderData.clientId
    //       );
    //       setOrderHistory(orderHistory);
    //     };
    //     fetchOrderHistory();
    //   });
    // }
  }, [step, orderData.carId]);

  return (
    <div className="flex flex-col">
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
        <p
          className={`ms-[35px] mt-5 text-[16px] font-extralight tracking-[9%] ${cars.length > 0 ? "" : "opacity-30"}`}
        >
          Pick car from Garage
        </p>
        {cars.length > 0 && (
          <ClientGarage
            data={orderData}
            onComplete={updateOrderData}
            cars={cars}
          />
        )}

        <p
          className={`ms-[35px] mt-5 text-[16px] font-extralight tracking-[9%] ${services.length > 0 && orderData.carId !== "" ? "" : "opacity-30"}`}
        >
          Service
        </p>

        {services.length > 0 && orderData.carId !== "" && (
          <Services
            services={services}
            orderData={orderData}
            carType={orderData.carTypeId}
            onComplete={updateOrderData}
          />
        )}

        <p
          className={`ms-[35px] mt-5 text-[16px] font-extralight tracking-[9%] ${extraServices.length > 0 && orderData.serviceId !== "" ? "" : "opacity-30"}`}
        >
          Extra Services
        </p>
        {extraServices.length > 0 && orderData.serviceId !== "" && (
          <ExtraService
            services={extraServices}
            orderData={orderData}
            carType={orderData.carTypeId}
            onComplete={updateOrderData}
          />
        )}
      </div>
      <div className=" my-5 flex items-center justify-center">
        <Button
          disabled={orderData.extraServices.length === 0}
          className="w-[300px] rounded-lg border-8 border-rolex-green"
          onClick={handleClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
