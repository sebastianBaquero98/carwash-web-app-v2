"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  const handleSignOut = async () => {
    // Sign out from NextAuth
    await signOut({ callbackUrl: "/" });

    // Redirect to Cognito logout endpoint with required parameters
    const cognitoLogoutUrl = new URL(
      "https://auth-user.auth.us-east-1.amazoncognito.com/logout"
    );
    cognitoLogoutUrl.searchParams.append(
      "client_id",
      "3spso07upfj1nbjlc8auq08tq"
    );
    cognitoLogoutUrl.searchParams.append(
      "redirect_uri",
      "http://localhost:3000/signout"
    );
    cognitoLogoutUrl.searchParams.append("response_type", "code");

    window.location.href = cognitoLogoutUrl.toString();
  };
  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
