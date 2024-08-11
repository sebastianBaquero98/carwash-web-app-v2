import React from "react";
import "./globals.css";
import localFont from "next/font/local";
import Provider from "@/context/Provider";
import Head from "next/head";

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/Formula1-Regular-1.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/Formula1-Bold-4.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/Formula1-Black.ttf",
      weight: "900",
    },
  ],
  variable: "--font-f1",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Provider>
        <body className={`${myFont.variable} font-sans`}>{children}</body>
      </Provider>
    </html>
  );
}
