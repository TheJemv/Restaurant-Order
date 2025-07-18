import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

enum Status {
  NOT_ORDERED = "NOT_ORDERED",
  ORDERED = "ORDERED",
  IN_PROGRESS = "IN_PROGRESS",
  DELIVERED = "DELIVERED",
  REQUESTED_BILL = "REQUESTED_BILL",
  COMPLETED = "COMPLETED",
}

export async function GET(req: NextRequest) {
   try {
      const id = req.nextUrl.searchParams.get("id");
      const statusParam = req.nextUrl.searchParams.get("status");
      if (!id || !statusParam) {
         return NextResponse.json(
            { error: "id o status requerido" },
            { status: 400 },
         );
      }

      if (!Object.values(Status).includes(statusParam as Status)) {
         return NextResponse.json(
            {
               error: `El estado '${statusParam}' no es un valor de estado válido.`,
            },
            { status: 400 },
         );
      }
      
      const newStatus: Status = statusParam as Status;
      const order = await prisma.order.update({
         where: { id },
         data: {
            status: newStatus,
         },
      });

      return NextResponse.json({
         message: "Cambio de status",
         data: order
      });
   } catch (e) {
      console.error((e as Error).message);

      return NextResponse.json(
         { error: "Error al procesar el body" },
         { status: 400 },
      );
   }
}
