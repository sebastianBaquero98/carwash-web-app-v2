import React from "react";
import Image from "next/image";
import ActionBtns from "./ActionBtns";
import CashoutDialog from "./CashoutDialog";

interface props {
  info: {
    bay?: string;
    carColor: string;
    carId: string;
    carMake: string;
    carTypeId: string;
    carTypeName: string;
    clientName: string;
    comment?: string;
    date: string;
    dateHourCreation: string;
    dateHourFinish?: string;
    dateHourStart?: string;
    dateHourStartTunel?: string;
    discount?: string;
    discountType?: string;
    estimatedPickUpTime: string;
    extraServices?: string;
    garageId: string;
    key: string;
    locationId: string;
    orderId: string;
    orderState: string;
    paid?: boolean;
    paymentInCash?: string;
    paymentInCredit?: string;
    paymentType?: string;
    phoneNumber: string;
    price: number;
    sentReviewMessage?: string;
    serviceId: string;
    serviceName: string;
    shardId: string;
    tipType?: string;
    tipValue?: string;
  };
  hasBays: boolean;
}

const OrderCardUnPaid = ({ info, hasBays }: props) => {
  return (
    <div className="flex h-[150px] w-full  rounded-e-lg bg-white py-2 pe-4 ps-3">
      <div className=" flex w-[26%] flex-col  items-start justify-center ">
        {info.carMake === "RAM" ||
        info.carMake === "BMW" ||
        info.carMake === "Mercedes-Benz" ||
        info.carMake === "Tesla" ||
        info.carMake === "Acura" ||
        info.carMake === "Lamborghini" ||
        info.carMake === "Honda" ||
        info.carMake === "Volkswagen" ||
        info.carMake === "Ferrari" ||
        info.carMake === "Alfa-Romeo" ||
        info.carMake === "Maserati" ||
        info.carMake === "Porsche" ? (
          <Image
            alt="brand-icon"
            src={`https://carwash-car-make-images.s3.amazonaws.com/${info.carMake}.png`}
            width={30}
            height={30}
          />
        ) : info.carMake === "Lincoln" ? (
          <Image
            alt="brand-icon"
            src={`https://carwash-car-make-images.s3.amazonaws.com/${info.carMake}.png`}
            width={20}
            height={10}
          />
        ) : (
          <Image
            alt="brand-icon"
            src={`https://carwash-car-make-images.s3.amazonaws.com/${info.carMake}.png`}
            width={50}
            height={50}
          />
        )}

        <h3 className={`text-dark-blue`}>
          {info.carTypeName.split(" ").length > 1 ? "VOT" : info.carTypeName}
        </h3>

        <a
          href={`tel:+19548686754`}
          className="line-clamp-2 text-[11px] text-dark-blue hover:text-light-blue"
        >
          {info.clientName}
        </a>
        {info.bay && (
          <div className=" flex h-[15px] w-[50px] items-center justify-start rounded-md bg-light-blue ps-1">
            <p className="text-[10px]">{info.bay}</p>
          </div>
        )}
      </div>
      <div
        style={{ backgroundColor: info.carColor }}
        className="mx-3 inline-block h-full min-h-[1em] w-[7px] rounded-2xl border border-light-blue "
      ></div>
      <div className=" flex w-full flex-col items-start justify-center">
        {/* <div className=" flex h-[15px] w-[50px] items-center justify-center rounded-md bg-light-blue ">
          <p className="text-[10px]">Bay 2</p>
        </div> */}
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-medium text-dark-blue">{`$${info.price}`}</h2>
          {info.paid && info.paymentType === "credit" && (
            <Image
              src="/icons/credit-card-2.svg"
              width={20}
              height={10}
              alt="credit.card-icon"
            />
          )}
          {info.paid && info.paymentType === "cash" && (
            <Image
              src="/icons/cash-icon.svg"
              width={20}
              height={10}
              alt="credit.card-icon"
            />
          )}
          {info.paid && info.paymentType === "" && (
            <Image
              src="/icons/cash-credit-icon.svg"
              width={30}
              height={20}
              alt="credit.card-icon"
            />
          )}
          {info.paid && info.tipValue && (
            <p className="text-[10px] text-[#ABA8A8]">{`($${info.tipValue})`}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[15px] text-dark-blue">
            {info.serviceName.includes(".")
              ? info.serviceName.split(". ")[1]
              : info.serviceName}
          </p>
          {!info.paid && info.orderState !== "UP" && (
            <CashoutDialog
              isBefore={true}
              price={info.price}
              shardId={info.shardId}
              orderId={info.orderId}
              state={info.orderState}
              locationId={info.locationId}
              date={info.date}
            />
          )}
        </div>
        {info.comment && (
          <p className="text-[10px]  text-dark-blue">{info.comment}</p>
        )}

        <div className="mt-2 flex gap-2">
          <p className="text-[10px] text-dark-blue">{info.dateHourCreation}</p>
          {info.dateHourStart && (
            <p className="text-[10px] text-dark-blue">{info.dateHourStart}</p>
          )}
          {info.dateHourStartTunel && (
            <p className="text-[10px] text-dark-blue">
              {info.dateHourStartTunel}
            </p>
          )}
          {info.dateHourFinish && (
            <p
              className={`text-[10px] ${info.dateHourFinish > info.estimatedPickUpTime ? "text-ferrari-red" : "text-light-blue"} `}
            >
              {info.dateHourFinish}
            </p>
          )}
          <p className="text-[10px] font-medium text-dark-blue">{`-- ${info.estimatedPickUpTime}`}</p>
        </div>
      </div>
      <ActionBtns
        state={info.orderState}
        shardId={info.shardId}
        orderId={info.orderId}
        isPaid={info.paid}
        hasBays={hasBays}
        date={info.date}
        estimatedPickUpTime={info.estimatedPickUpTime}
        price={info.price}
        tipType=""
        tipValue=""
        isMultiple={false}
        paymentInCash=""
        paymentInCredit=""
        paymentType=""
      />
    </div>
  );
};

export default OrderCardUnPaid;
