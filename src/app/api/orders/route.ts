import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type OrderProduct = {
  productId: string;
  exclude: string[];
  quantity: number;
};

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      if (!body?.table || !Array.isArray(body?.orderProducts)) {
         return NextResponse.json(
            { error: "Missing table or orderProducts" },
            { status: 400 },
         );
      }

      console.log(body);

      const order = await prisma.order.create({
         data: {
            table: body.table,
            status: "ORDERED",
            billing: 128,
         },
      });

      const orderProducts: OrderProduct[] = body?.orderProducts;
      await Promise.all(
         orderProducts.map((item) =>
            prisma.orderProduct.create({
               data: {
                  orderId: order.id,
                  productId: item.productId,
                  quantity: item.quantity ? item.quantity : 1,
                  exclude: item.exclude ?? [],
               },
            }),
         ),
      );

      return NextResponse.json({
         message: "Orden creada correctamente",
         orderId: order.id,
      });
   } catch (e) {
      console.error((e as Error).message);

      return NextResponse.json(
         { error: "Error al procesar el body" },
         { status: 400 },
      );
   }
}

export async function GET(req: NextRequest) {
   try {
      const orders = await prisma.order.findMany({
         where: {
            status: {
               in: ["ORDERED", "IN_PROGRESS"],
            },
         },
         include: {
            products: {
               include: {
                  product: true,
               },
            },
         },
      });

      const modifiedOrders = orders.map((order) => {
         const totalBilling = order.products.reduce((sum, productItem) => {
            return sum + productItem.product.price * productItem.quantity;
         }, 0);

         return {
            ...order,
            products: order.products.map((productItem) => ({
               ...productItem,
               product: {
                  ...productItem.product,
                  photo: `/api/product/image?id=${productItem.product.id}`,
               },
            })),
            billing: totalBilling,
         };
      });

      return NextResponse.json({
         data: modifiedOrders,
      });
   } catch (e) {
      console.error((e as Error).message);

      return NextResponse.json(
         { error: "Error al procesar el body" },
         { status: 400 },
      );
   }
}
