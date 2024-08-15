import React from "react";

import OrderCardPaid from "@/components/OrderCardPaid";
import OrderCardUnPaid from "@/components/OrderCardUnPaid";
import {
  getOrders,
  getOrdersByDate,
  getUnPaidOrders,
} from "@/lib/actions/order.actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getLocationMetrics } from "@/lib/actions/location-metrics.action";
import LocationMetrics from "@/components/LocationMetrics";

import { getFormattedDate } from "@/lib/utils";

export default async function Orders({
  searchParams,
}: {
  searchParams: { date: string; isFilter: string };
}) {
  const session = await getServerSession(authOptions);

  let orders = [];
  let locationMetrics = null;
  let hasBays = false;
  let queryDate = "";
  let isFilter = false;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <h1>Access Denied</h1>
        <p>You must be signed in to view this page.</p>
      </div>
    );
  } else {
    queryDate = searchParams.date ? searchParams.date : getFormattedDate();
    isFilter = !!searchParams.isFilter;

    hasBays = session.hasBays;
    locationMetrics = await getLocationMetrics(
      session.id_token,
      queryDate,
      session.locationId
    );
    if (searchParams.date) {
      orders = await getOrdersByDate(
        session.id_token,
        session.locationId,
        searchParams.date
      );
    } else if (isFilter) {
      orders = await getUnPaidOrders(session.id_token, session.locationId);
    } else {
      orders = await getOrders(session.id_token, session.locationId);
    }
  }
  return (
    <>
      <LocationMetrics info={locationMetrics} date={queryDate} />
      <div className="me-4 mt-3 flex flex-col items-center gap-2">
        {orders.length > 0 &&
          orders.map((order: any, i: any) => {
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
