"use server";
import { revalidatePath } from "next/cache";

const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

interface paramsChangeStateOrder {
  id: any;
  orderId: any;
  dateHourStart: string;
  tz: string;
  orderState?: string; // Adding orderState as an optional property
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
  if (newState === "P") {
    revalidatePath("/orders");
  }
}

export async function deleteOrder() {}
