"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
interface props {
  locations: {
    hasBays: boolean;
    locationId: string;
    locationName: string;
    reviewLink: string;
  }[];
}

const LocationSelectorList = ({ locations }: props) => {
  const router = useRouter();
  const { update } = useSession();
  const handleClickLocation = async (
    pId: string,
    pName: string,
    pHasBays: string,
    pReviewLink: string
  ) => {
    try {
      await update({ locationId: pId, hasBays: pHasBays, locationName: pName });
      router.push("/orders");
      router.refresh(); // This refreshes the current route
    } catch (error) {
      console.error("Error updating session:", error);
      // Handle the error appropriately
    }
  };
  return (
    <div className="w-[319px] flex-col  rounded-2xl border-2 border-[orange] bg-bone-white py-2">
      {locations.length !== 0 &&
        locations.map((loc: any) => (
          <button
            onClick={() =>
              handleClickLocation(
                loc.locationId,
                loc.locationName,
                loc.hasBays,
                loc.reviewLink
              )
            }
            key={loc.locationId}
            className="m-0 w-full p-0 text-start"
          >
            <h3 className="my-3 ms-5 text-sm text-dark-blue">
              {loc.locationName}
            </h3>
            <hr className="h-[0.3px] border-t-0 bg-dark-blue" />
          </button>
        ))}
    </div>
  );
};

export default LocationSelectorList;
