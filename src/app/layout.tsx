import { Providers } from "@/providers/providers"
import React from "react";


export default function Layout({children}: {children: React.ReactNode}) {
   return (
      <Providers>
         {children}
      </Providers>
   )
}
