"use client";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

export default function Config() {
   const router = useRouter()
   const searchParams = useSearchParams();

   const table = searchParams.get("table")

   Cookies.set("table", table, {
      expires: 3560,
      path: '/'
   })
      

   return router.push("/")
}
