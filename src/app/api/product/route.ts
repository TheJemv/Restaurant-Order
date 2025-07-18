import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
         id: true,
         name: true,
         ingredients: true,
         price: true,
      },
   });

   return NextResponse.json({
      id: product?.id,
      name: product?.name,
      ingredients: product?.ingredients,
      price: product?.price,
      photo: `/api/product/image?id=${product?.id}`,
   });
}

export async function POST(req: NextRequest) {
   const form = await req.formData();
   const file = form.get("photo");

   if (!(file instanceof File)) {
      return NextResponse.json({ error: "No photo sent" }, { status: 400 });
   }

   const bytes = new Uint8Array(await file.arrayBuffer());
   const data = {
      name: form.get("name") as string,
      description: form.get("description") as string,
      ingredients: form.getAll("ingredients") as string[],
      price: Number(form.get("price")),
      photo: bytes,
   };

   if (!data.name || !data.ingredients || !data.price || !data.photo) {
      return NextResponse.json(
         { error: "Hace falta el nombre, ingredientes, precio o foto." },
         { status: 400 },
      );
   }

   const product = await prisma.product.create({ data });
   return NextResponse.json(
      {
         id: product.id,
         name: product.name,
         ingredients: product.ingredients,
         price: product.price,
         photo: `/api/product/image?id=${product.id}`,
      },
      {
         status: 201,
      },
   );
}

export async function DELETE(req: NextRequest) {
   const form = await req.formData();
   const id = form.get("id") as string;

   if (!id) {
      return NextResponse.json({ error: "No ID sent" }, { status: 400 });
   }

   const product = await prisma.product.findUnique({
      where: {
         id,
      },
   });

   if (!product) {
      return NextResponse.json({ error: "No such product" }, { status: 400 });
   }

   await prisma.product.delete({
      where: {
         id: product.id,
      },
   });

   return NextResponse.json(
      { message: "Successfully deleted" },
      { status: 202 },
   );
}

export async function PATCH(req: NextRequest) {
   const form = await req.formData();
   const id = form.get("id") as string;
   const file = form.get("photo");

   let bytes;
   if (!(file instanceof File)) {
      const getProduct = await prisma.product.findUnique({
         where: { id },
         select: { photo: true },
      });

      bytes = getProduct?.photo
   } else {
      bytes = new Uint8Array(await file.arrayBuffer())
   }

   const data = {
      name: form.get("name") as string,
      description: form.get("description") as string,
      ingredients: form.getAll("ingredients") as string[],
      price: Number(form.get("price")),
      photo: bytes,
   };

   try {
      const updatedProduct = await prisma.product.update({
         where: { id },
         data: data,
      });

      return NextResponse.json(
         { message: "Successfully updated", data: updatedProduct },
         { status: 200 },
      );
   } catch (e) {
      return NextResponse.json({ error: (e as Error).message }, { status: 400 });
   }
}
