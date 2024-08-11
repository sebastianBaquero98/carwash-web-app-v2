import React from "react";
import "./globals.css";
import localFont from "next/font/local";
import Provider from "@/context/Provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Wash Solutions",
};

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
      <Provider>
        <body className={`${myFont.variable} font-sans`}>{children}</body>
      </Provider>
    </html>
  );
}
