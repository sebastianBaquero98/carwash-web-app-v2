import { OrderData } from "@/types";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface OrderContextType {
  orderData: OrderData;
  updateOrderData: (newData: Partial<OrderData>) => void;
}

const defaultOrderData: OrderData = {
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
  service: { serviceName: "", serviceId: "", price: "", serviceGroupId: "" },
  clientLastServed: "",
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orderData, setOrderData] = useState<OrderData>(defaultOrderData);

  const updateOrderData = (newData: Partial<OrderData>) => {
    setOrderData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <OrderContext.Provider value={{ orderData, updateOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
