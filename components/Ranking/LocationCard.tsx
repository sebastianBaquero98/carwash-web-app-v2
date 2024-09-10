import Image from "next/image";
import React from "react";

interface Props {
  index: number;
  accessPermited: boolean;
  info: {
    averageTicket: number;
    date: string;
    id: string;
    late: number;
    locationName: string;
    progress: number;
    tipsInCash: number;
    tipsInCredit: number;
    totalCars: number;
    totalCarsInProgress: number;
    totalCash: number;
    totalComissions: number;
    totalCredit: number;
    totalPendingCars: number;
    totalSales: number;
    totalTips: number;
    porcentage: number;
  };
}

const LocationCard = ({ index, accessPermited, info }: Props) => {
  if (accessPermited) {
    return (
      <div className=" flex h-[45px] items-center justify-between bg-white px-3 text-dark-blue">
        <div className="flex items-center">
          {index === 0 ? (
            <Image
              alt="brand-icon"
              src="/icons/trophy_ranking.svg"
              width={30}
              height={30}
              className="me-[-8px]"
            />
          ) : (
            <h3 className="ms-2 text-[20px] font-medium">{index + 1}</h3>
          )}
          <div
            className={`mx-3 ms-5 inline-block h-[36px] min-h-[1em]  w-[5px] ${index === 0 || index === 1 ? "bg-rolex-green" : index <= 5 ? "bg-light-blue" : "bg-ferrari-red"}`}
          ></div>
          <div className="flex flex-col ">
            {info.locationName.includes("Mr Splash") ? (
              info.locationName.split("Mr Splash")[1].split(" ").length >= 1 ? (
                <h3>
                  {info.locationName.split("Mr Splash")[1].split(" ")[1]}
                  <span className="font-medium">
                    {" "}
                    {info.locationName.split("Mr Splash")[1].split(" ")[2]}
                  </span>
                </h3>
              ) : (
                // <h3>{info.locationName.split("Mr Splash")[1].split(" ")[2]}</h3>
                <h3>hola</h3>
              )
            ) : (
              <h3>
                {info.locationName.split(" ")[0]}{" "}
                <span className="font-medium">
                  {info.locationName.split(" ")[1]}
                </span>
              </h3>
            )}
            {/* <h3 className="text-[15px]">{info.locationName}</h3> */}
            {info.progress !== 0 && (
              <div className="h-[12px] w-[150px] items-center rounded-full bg-[#D3D3D3] ">
                <div
                  className="flex h-[12px] items-center justify-center rounded-full p-0.5 text-center align-middle text-[10px]  leading-none text-white"
                  style={{
                    width: info.progress + "%",
                    backgroundImage:
                      "linear-gradient(129deg, #7183e4 0%, #c66573 100%)",
                  }}
                >
                  {" "}
                  {info.progress}%
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-[0.5px]">
          <p className="text-[13px]">{`$${info.totalSales} | $${info.averageTicket}`}</p>
          <div className="flex gap-2">
            <div className="flex h-[9px] w-[45px] items-center justify-center rounded-lg bg-dark-blue text-white">
              <div className="flex items-center justify-center">
                <Image
                  alt="brand-icon"
                  src="/icons/finish_icon.svg"
                  width={18}
                  height={18}
                />
                <p className="text-[16px] font-medium text-[#FFA300] ">
                  {info.totalCars}
                </p>
              </div>
            </div>
            <div className="flex h-[9px] w-[55px] items-center justify-center rounded-lg bg-ferrari-red text-dark-blue">
              <div className="flex items-center justify-center">
                <Image
                  alt="brand-icon"
                  src="/icons/late_icon.svg"
                  width={18}
                  height={18}
                />
                <p className="text-[16px] font-medium text-dark-blue ">
                  {Math.round(info.porcentage * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" flex h-[45px] items-center justify-between bg-white px-3 text-dark-blue">
        <div className="flex items-center">
          {index === 0 ? (
            <Image
              alt="brand-icon"
              src="/icons/trophy_ranking.svg"
              width={30}
              height={30}
              className="me-[-8px]"
            />
          ) : (
            <h3 className="ms-2 text-[20px] font-medium">{index + 1}</h3>
          )}
          <div className="mx-3 ms-5 inline-block h-[36px] min-h-[1em]  w-[5px] bg-rolex-green"></div>
          <h3 className="">
            Galeria <span className="font-medium">Orange</span>
          </h3>
        </div>
        <div className="flex gap-2">
          <div className="flex h-[10px] w-[55px] items-center justify-center rounded-lg bg-dark-blue text-white">
            <div className="flex items-center justify-center">
              <Image
                alt="brand-icon"
                src="/icons/finish_icon.svg"
                width={20}
                height={20}
              />
              <p className="text-[20px] font-medium text-[#FFA300] ">
                {info.totalCars}
              </p>
            </div>
          </div>
          <div className="flex h-[10px] w-[72px] items-center justify-center rounded-lg bg-ferrari-red text-dark-blue">
            <div className="flex items-center justify-center">
              <Image
                alt="brand-icon"
                src="/icons/late_icon.svg"
                width={20}
                height={20}
              />
              <p className="text-[20px] font-medium text-dark-blue ">
                {Math.round(info.porcentage * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LocationCard;
