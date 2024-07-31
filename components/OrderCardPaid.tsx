import React from "react";
import Image from "next/image";

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
    locationI: string;
    orderId: string;
    orderState: string;
    paid?: string;
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
}

const OrderCardPaid = ({ info }: props) => {
  return (
    <div className="flex h-[100px] w-full  rounded-e-lg bg-white py-2 pe-4 ps-3">
      <div className=" flex w-[26%] flex-col items-start  justify-center">
        {info.carMake === "RAM" ||
        info.carMake === "BMW" ||
        info.carMake === "Mercedes-Benz" ||
        info.carMake === "Tesla" ||
        info.carMake === "Acura" ||
        info.carMake === "Lamborghini" ||
        info.carMake === "Honda" ||
        info.carMake === "Volkswagen" ||
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
            width={10}
            height={30}
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
          className="text-[11px] text-dark-blue hover:text-light-blue"
        >
          {info.clientName}
        </a>
      </div>
      <div
        style={{ backgroundColor: info.carColor }}
        className="mx-3 inline-block h-full min-h-[1em] w-[7px] rounded-2xl border border-light-blue "
      ></div>
      <div className=" flex w-full flex-col items-start justify-center">
        {/* <div className="mb-3 flex w-full items-center gap-[85px] "> */}
        {info.dateHourFinish && (
          <p
            className={`text-[11px] ${info.dateHourFinish > info.estimatedPickUpTime ? "text-ferrari-red" : "text-light-blue"} `}
          >
            {info.dateHourFinish}
          </p>
        )}

        <div className="flex  items-center gap-2">
          <h2 className="text-[17px] font-bold text-dark-blue">{`$${info.price}`}</h2>
          {info.paymentType === "credit" && (
            <Image
              src="/icons/credit-card-2.svg"
              width={20}
              height={10}
              alt="credit-card-icon"
            />
          )}
          {info.paymentType === "cash" && (
            <Image
              src="/icons/cash-icon.svg"
              width={20}
              height={10}
              alt="credit.card-icon"
            />
          )}
          {info.paymentType === "" && (
            <Image
              src="/icons/cash-credit-icon.svg"
              width={30}
              height={20}
              alt="credit.card-icon"
            />
          )}

          {info.tipValue && (
            <p className="text-[10px] text-[#ABA8A8]">{`($${info.tipValue})`}</p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <p className="text-[13px] text-dark-blue">
            {info.serviceName.includes(".")
              ? info.serviceName.split(". ")[1]
              : info.serviceName}
          </p>
          {info.bay && (
            <div className=" flex h-[15px] w-[40px] items-center justify-center rounded-md bg-light-blue">
              <p className="text-[10px]">{info.bay}</p>
            </div>
          )}
        </div>
        {info.comment && (
          <p className="mb-1 text-[10px] text-dark-blue">{info.comment}</p>
        )}
      </div>
      <div className="flex flex-col items-end justify-center gap-3 ">
        {info.sentReviewMessage === "yes" ? (
          <Image
            src="/icons/green-check.svg"
            width={35}
            height={35}
            alt="green-check"
          />
        ) : (
          <Image
            src="/icons/sendreview_btn.svg"
            width={35}
            height={35}
            alt="send-icon"
          />
        )}

        <Image
          src="/icons/trash-icon.svg"
          width={40}
          height={40}
          alt="nissan"
        />
      </div>
    </div>
  );
};

export default OrderCardPaid;
