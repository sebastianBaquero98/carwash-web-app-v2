"use client";

import Link from "next/link";
import React from "react";
interface props {
  locations: {
    hasBays: boolean;
    locationId: string;
    locationName: string;
    reviewLink: string;
  }[];
}

const LocationSelectorList = ({ locations }: props) => {
  return (
    <div className="w-[319px] flex-col rounded-2xl border-2 border-[orange] bg-bone-white py-2">
      {locations.length !== 0 &&
        locations.map((loc: any) => (
          <button key={loc.locationId}>
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
