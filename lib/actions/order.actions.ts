"use server";
import { revalidatePath } from "next/cache";
import router from "next/router";

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

interface paramsChangeStateOrder {
  id: any;
  orderId: any;
  dateHourStart: string;
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

export async function orderChangeState(
  accessToken: string,
  shardId: string,
  orderId: string,
  newState: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const raw: paramsChangeStateOrder = {
    id: shardId,
    orderId,
    dateHourStart: "",
    orderState: newState,
    tz: timeZone,
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
  // console.log("this is raw,", raw);
  fetch(process.env.NEXT_PUBLIC_ENDPOINTURL + "order", {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  });
  revalidatePath("/orders");
}
