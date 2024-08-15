import React from "react";

import Provider from "@/context/Provider";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayoutInternal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  let locationName = "";
  if (session) {
    locationName = session.locationName;
  }
  return (
    <html lang="en">
      <Provider>
        <body>
          {locationName && <NavBar locationName={locationName} />}
          {children}
        </body>
      </Provider>
    </html>
  );
}
