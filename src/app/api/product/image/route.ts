import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   const id = req.nextUrl.searchParams.get("id");
   if (!id) {
      return NextResponse.json({ error: "id requerido" }, { status: 400 });
   }

   const product = await prisma.product.findUnique({
      where: {
         id,
      },
      select: {
         photo: true,
      },
   });

   if (!product?.photo) {
      return NextResponse.json(
         { error: "Imagen no encontrada" },
         { status: 404 },
      );
   }

   return new NextResponse(product.photo, {
      status: 200,
      headers: {
         "Content-Type": "image/jpeg",
         "Content-Length": String(product.photo.length),
      },
   });
}
