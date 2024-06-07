"use server";
import { revalidatePath } from "next/cache";
const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
interface paramsUpdateLocationMetrics {
  id: string;
  date: string;
  type: string;
  orderId: string;
  estimatedPickUpTime?: string;
  tz?: string;
}

export async function getLocationMetrics(
  accessToken: string,
  date: string,
  locationId: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken);
  const raw = JSON.stringify({
    locationId,
    date,
  });

  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL + `location-metrics`,
    {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }
  );
  const result = await response.json();
  return result;
}

export async function updateLocationMetricsChangeState(
  accessToken: string,
  type: string,
  dateOrder: string,
  orderId: string,
  locationId: string,
  estimatedPickUpTime?: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const raw: paramsUpdateLocationMetrics = {
    id: locationId,
    date: dateOrder,
    type,
    orderId,
  };
  if (type === "orderFinish") {
    raw.estimatedPickUpTime = estimatedPickUpTime;
    raw.tz = timeZone;
  }

  await fetch(process.env.NEXT_PUBLIC_ENDPOINTURL + "location-metrics", {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  });
  revalidatePath("/orders");
}

export async function updateLocationMetricsPay() {}
