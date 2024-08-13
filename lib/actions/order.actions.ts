"use server";
import { revalidatePath } from "next/cache";
import router from "next/router";

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

interface paramsChangeStateOrder {
  id: any;
  orderId: any;
  dateHourStart?: string;
  dateHourStartTunnel?: string;
  dateHourFinish?: string;
  tz: string;
  orderState?: string;
}
interface paramsPayOrder {
  id: string;
  orderId: string;
  orderState: string;
  paymentType?: string;
  paymentInCash?: string;
  paymentInCredit?: string;
  paid?: boolean;
  tipType?: string;
  tipValue?: string;
}

export async function getOrders(accessToken: string, locationId: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL + `orders/${locationId}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );
  const result = await response.json();
  return result;
}

export async function getOrdersByDate(
  accessToken: string,
  locationId: string,
  dateFilter: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const raw = JSON.stringify({
    locationId,
    date: dateFilter,
  });

  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL + "orders/date",
    {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      cache: "force-cache",
    }
  );
  const result = await response.json();

  return result.Items;
}

export async function orderChangeState(
  accessToken: string,
  shardId: string,
  orderId: string,
  newState: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const orderState =
    newState === "ST"
      ? "dateHourStartTunel"
      : newState === "S"
        ? "dateHourStart"
        : newState === "UP"
          ? "dateHourFinish"
          : newState === "P"
            ? "dateHourFinish"
            : "";
  const raw: paramsChangeStateOrder = {
    id: shardId,
    orderId,
    [orderState]: "",
    tz: timeZone,
    orderState: newState,
  };

  await fetch(process.env.NEXT_PUBLIC_ENDPOINTURL + "order", {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  });

  revalidatePath("/orders");
}

export async function payOrder(
  accessToken: string,
  shardId: string,
  orderId: string,
  newState: string,
  isBefore: boolean,
  isMutiple: boolean,
  hasTip: boolean,
  paymentType?: string,
  tipType?: string,
  tipValue?: string,
  cash?: string,
  credit?: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const raw: paramsPayOrder = {
    id: shardId,
    orderId,
    orderState: newState, // Si isbefore entonces mismo estado si no es entonces pasa a P
  };
  if (isBefore) {
    raw.paid = true;
  }
  if (isMutiple) {
    raw.paymentInCash = cash;
    raw.paymentInCredit = credit;
  } else {
    raw.paymentType = paymentType;
  }

  if (hasTip) {
    raw.tipType = "tip/" + tipType;
    raw.tipValue = tipValue;
  }

  fetch(process.env.NEXT_PUBLIC_ENDPOINTURL + "order", {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  });
}

export async function deleteOrder(
  accessToken: string,
  id: string,
  orderId: string,
  locationId: string
) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + accessToken);

    const raw = JSON.stringify({
      id,
      orderId,
      locationId,
    });

    await fetch(process.env.NEXT_PUBLIC_ENDPOINTURL + "order", {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    // revalidatePath("/orders");
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error; // Re-throw the error if you want calling code to handle it
  }
}
