"use client"
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"

export default function Header({ children }: { children?: React.ReactNode }) {
   const [table, setTable] = useState<string | undefined>()
   const items = 1;
   
   useEffect(() => {
      const cookie = Cookies.get("table")
      setTable(cookie)
   }, [])

   return (
      <header className="header-bg text-white p-4 shadow-lg">
         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-black/90 rounded-lg p-2">
          Menú Delicioso #{table}
            </h1>

            <nav className="mt-4 md:mt-0">
               <ul className="flex space-x-6 text-lg [&>li>a]:hover:text-black/90 [&>li>a]:transition [&>li>a]:text-black/80 [&>li>a]:duration-300">
                  {children ? (
                     children
                  ) : (
                     <>
                        <li>
                           <Link href={"/"}>Menú</Link>
                        </li>

                        <li>
                           <a href="">Ordenar</a>
                        </li>

                        <li>
                           <a href="">Contacto</a>
                        </li>

                        <li>
                           <a href="">
                              <div className="block relative">
                                 <ShoppingCartIcon className="size-8" />
                                 {items > 0 && (
                                    <div className="absolute w-4 flex flex-col rounded-full justify-center align-center h-4 right-[-5px] bg-red-500 top-[-5px]">
                                       <p className="text-sm text-white w-full text-center">
                                          {items}
                                       </p>
                                    </div>
                                 )}
                              </div>
                           </a>
                        </li>
                     </>
                  )}
               </ul>
            </nav>
         </div>
      </header>
   );
}
