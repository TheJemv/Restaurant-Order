import React from "react";
import Header from "@/components/Header";
import "@/app/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <html className="min-h-screen flex flex-col">
         <head>
            <title>Dashboard</title>
         </head>

         <body>
            <Header />
            {children}
         </body>
      </html>
   );
}
