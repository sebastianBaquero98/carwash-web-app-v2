"use server";

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
