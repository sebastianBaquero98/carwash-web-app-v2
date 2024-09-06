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
  let userRole = "";
  if (session) {
    // console.log("session", session);
    const parsedToken = JSON.parse(
      Buffer.from(session.id_token.split(".")[1], "base64").toString()
    );

    locationName = session.locationName;
    userRole = parsedToken["custom:userPosition"];
  }
  return (
    <html lang="en">
      <Provider>
        <body>
          {locationName && (
            <NavBar locationName={locationName} userRole={userRole} />
          )}
          {children}
        </body>
      </Provider>
    </html>
  );
}
