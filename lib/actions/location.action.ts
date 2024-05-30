"use server";

export async function getUsersLocations(
  accessToken: string,
  tenantId: string,
  userName: string
) {
  const myHeaders = new Headers();
  const raw = JSON.stringify({
    tenantId,
    userName,
  });
  myHeaders.append("Content-Type", "application/json");
  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL_SASS + "users/locations",
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
