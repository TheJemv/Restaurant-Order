import React from "react";
import "@/app/globals.css";
import Header from "@/components/Header";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <html className="min-h-screen flex flex-col">
         <head>
            <title>Panel de Admin</title>
         </head>

         <body>
            <Header>
               <li>
                  <Link href="/admin">Admin</Link>
               </li>
               <li>
                  <Link href="/admin/create">Crear Platillo</Link>
               </li>
               <li>
                  <Link href="/admin/kitchen">Cocina</Link>
               </li>
            </Header>
            {children}
         </body>
      </html>
   );
}
