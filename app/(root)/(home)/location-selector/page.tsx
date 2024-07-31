import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUsersLocations } from "@/lib/actions/location.action";
import LocationSelectorList from "@/components/LocationSelectorList";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let locations = [];
  if (!session) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be signed in to view this page.</p>
      </div>
    );
  } else {
    // console.log("this is this", session.tenantId, session.userName);
    const tenantId = session?.tenantId;
    const userName = session?.userName;
    if (tenantId && userName) {
      locations = await getUsersLocations(session?.tenantId, session?.userName);
    }
    // console.log(locations);
  }
  return (
    <div className="flex flex-col items-center bg-dark-blue">
      <h1 className="mb-2 mt-5">Select a Location</h1>
      <LocationSelectorList locations={locations} />
    </div>
  );
}
