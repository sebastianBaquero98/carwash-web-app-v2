import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LocationCard from "@/components/Ranking/LocationCard";
import { getRankingsByDay } from "@/lib/actions/rankings.actions";
import { getFormattedDate } from "@/lib/utils";
import { getServerSession } from "next-auth";
import React from "react";

const Ranking = async () => {
  const session = await getServerSession(authOptions);
  let ranking = [];
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <h1>Access Denied</h1>
        <p>You must be signed in to view this page.</p>
      </div>
    );
  } else {
    const date = getFormattedDate();
    ranking = await getRankingsByDay(session.id_token, date);
  }
  return (
    <div className="flex flex-col justify-center gap-[3px]">
      {ranking.map((r, index) => (
        <LocationCard key={r.id} index={index} accessPermited={true} info={r} />
      ))}
    </div>
  );
};

export default Ranking;
