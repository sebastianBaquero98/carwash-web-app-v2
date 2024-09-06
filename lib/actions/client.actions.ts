"use server";

export async function createClient(
  accessToken: string,
  clientName: string,
  clientPhoneNumber: string,
  carMake: string,
  carType: string,
  carColor: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const raw = JSON.stringify({
    userInfo: {
      phoneNumber: clientPhoneNumber,
      clientName,
    },
    carInfo: {
      carMake,
      carType,
      carColor,
    },
  });

  const response = await fetch(process.env.NEXT_PUBLIC_ENDPOINTURL + "client", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  });
  const result = await response.json();
  return result;
}

export async function getClientByPhoneNumber(
  accessToken: string,
  phoneNumber: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL + `client/${phoneNumber}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );
  const result = await response.json();
  return result;
}

export async function getClientGarage(accessToken: string, garageId: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL + `garage/${garageId}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );
  const result = await response.json();
  return result;
}

export async function getClientOrderHistory(
  accessToken: string,
  carId: string,
  carTypeId: string,
  clientId: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const raw = JSON.stringify({
    clientId,
    carId,
    carType: carTypeId,
  });
  console.log("Params: ", clientId, carId, carTypeId);

  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL + "mostrecentorders",
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

export async function deleteCarFromGarage(
  accessToken: string,
  pId: string,
  pCarId: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken);

  await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL + `car?id=${pId}&carId=${pCarId}`,
    {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    }
  );
}
