"use server";

export async function getRankingsByDay(accessToken: string, date: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken);

  const response = await fetch(
    process.env.NEXT_PUBLIC_ENDPOINTURL + `location/${date}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );
  const rankings = await response.json();
  const ans: any[] = [];
  rankings.slice(0, -5).forEach((l: any) => {
    l.porcentage = l.late / l.totalCars;
    if (!l.porcentage) {
      l.porcentage = 0;
    }
    ans.push(l);
  });
  //   console.log(ans);
  return ans;
}
