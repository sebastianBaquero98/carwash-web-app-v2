"use server";
import { revalidatePath } from "next/cache";
import router from "next/router";
import { type } from "os";

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

export async function updateLocationMetricsPay(
  accessToken: string,
  isMutiplePayment: boolean,
  hasTip: boolean,
  locationId: string,
  dateString: string,
  orderId: string,
  amount: number,
  tip: string,
  tipType: string,
  paymentType: string,
  cash: string,
  credit: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + accessToken);
  // Se hacen dos llamados a esta función uno para el cashout total y otro para el tip siempre y cuando tenga tip
  let isOkay = true;
  if (isMutiplePayment) {
    // Total amount credit
    const raw = JSON.stringify({
      id: locationId,
      date: dateString,
      type: "credit",
      value: parseFloat(credit),
      orderId,
    });
    console.log("this is raw", raw);
    const response1 = await fetch(
      process.env.NEXT_PUBLIC_ENDPOINTURL + "location-metrics",
      {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }
    );
    const result = await response1.json();
    if (!result) {
      isOkay = false;
    }

    // Total amount cash
    if (isOkay) {
      const raw1 = JSON.stringify({
        id: locationId,
        date: dateString,
        type: "cash",
        value: parseFloat(cash),
        orderId,
      });
      console.log("this is raw1", raw1);
      const response2 = await fetch(
        process.env.NEXT_PUBLIC_ENDPOINTURL + "location-metrics",
        {
          method: "PUT",
          headers: myHeaders,
          body: raw1,
          redirect: "follow",
        }
      );
      const result2 = await response2.json();
      if (!result2) {
        isOkay = false;
      }
    }
  } else {
    // Total amount
    const raw2 = JSON.stringify({
      id: locationId,
      date: dateString,
      type: paymentType,
      value: amount,
      orderId,
    });
    console.log("this is raw2", raw2);
    const response3 = await fetch(
      process.env.NEXT_PUBLIC_ENDPOINTURL + "location-metrics",
      {
        method: "PUT",
        headers: myHeaders,
        body: raw2,
        redirect: "follow",
      }
    );
    const result3 = await response3.json();
    if (!result3) {
      isOkay = false;
    }
  }

  if (hasTip) {
    // Amount in tip
    if (isOkay) {
      const raw3 = JSON.stringify({
        id: locationId,
        date: dateString,
        type: "tip/" + tipType,
        value: parseFloat(tip),
        orderId,
      });
      console.log("this is raw3", raw3);
      await fetch(process.env.NEXT_PUBLIC_ENDPOINTURL + "location-metrics", {
        method: "PUT",
        headers: myHeaders,
        body: raw3,
        redirect: "follow",
      });
    }
  }
  revalidatePath("/orders");
}

export async function updateLocationMetricsDelete(
  accessToken: string,
  locationId: string,
  date: string,
  carState: string,
  price: string,
  orderId: string,
  hasTip: boolean,
  tipType: string,
  tipValue: string,
  isMultiple: boolean,
  paymentInCash: string,
  paymentInCredit: string,
  paymentType: boolean
) {
  // ESTA ARMADO LOS RAWS FALTA MANDARLOS
  if (isMultiple) {
    const raw = JSON.stringify({
      id: locationId,
      date,
      type: "deleteOrder",
      carState,
      value: parseFloat(paymentInCash),
      orderId,
      tipType,
      paymentType: "cash",
      tipValue: parseFloat(tipValue),
    });
    const raw1 = JSON.stringify({
      id: locationId,
      date,
      type: "deleteOrderCredit",
      carState,
      value: parseFloat(paymentInCredit),
      orderId,
      tipType,
      paymentType: "credit",
      tipValue: parseFloat(tipValue),
    });
  } else {
    const raw = JSON.stringify({
      id: locationId,
      date,
      type: "deleteOrder",
      carState,
      value: parseFloat(price),
      orderId,
      tipType,
      tipValue: parseFloat(tipValue),
      paymentType,
    });
  }
}
