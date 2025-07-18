import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
   const raw = await prisma.product.findMany({
      select: {
         id: true,
         name: true,
         description: true,
         ingredients: true,
         price: true,
      }
   })
   
   const products = raw.map(p => ({
      ...p,
      photo: `/api/product/image?id=${p.id}`
   }))

   return NextResponse.json({
      data: products,
   });
}
