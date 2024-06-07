import React from "react";

import OrderCardPaid from "@/components/OrderCardPaid";
import OrderCardUnPaid from "@/components/OrderCardUnPaid";
import { getOrders } from "@/lib/actions/order.actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getLocationMetrics } from "@/lib/actions/location-metrics.action";
import LocationMetrics from "@/components/LocationMetrics";

export default async function Orders() {
  const session = await getServerSession(authOptions);

  let orders = [];
  let locationMetrics = {};
  let hasBays = false;
  if (!session) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be signed in to view this page.</p>
      </div>
    );
  } else {
    // let valueLocationId;
    // valueLocationId = localStorage.getItem("locationId") || "";
    hasBays = session.hasBays;
    locationMetrics = await getLocationMetrics(
      session.id_token,
      "2024-06-06",
      session.locationId
    );
    orders = await getOrders(session.id_token, session.locationId);

    // console.log("this is sessionn,", session);
  }
  return (
    <>
      <LocationMetrics info={locationMetrics} />
      <div className="me-4 mt-3 flex flex-col items-center gap-2">
        {orders.map((order: any, i: any) => {
          if (order.orderState === "P") {
            return <OrderCardPaid key={i} info={order} />;
          } else {
            return <OrderCardUnPaid key={i} info={order} hasBays={hasBays} />;
          }
        })}
      </div>
    </>
  );
}
