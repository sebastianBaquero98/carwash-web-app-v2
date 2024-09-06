"use client";
import { OrderProvider } from "@/context/OrderContext";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <OrderProvider>{children}</OrderProvider>
        <Toaster />
      </body>
    </html>
  );
}
