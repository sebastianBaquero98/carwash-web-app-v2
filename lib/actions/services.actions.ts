"use server";

export async function getServices(accessToken: string, locationId: string) {
  console.log(locationId);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL +
      `service-group/location/${locationId}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  const result = await response.json();
  return result;
}

export async function getExtraServices(
  accessToken: string,
  locationId: string
) {
  console.log(locationId);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL + "extraservices",
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  const result = await response.json();
  return result;
}
