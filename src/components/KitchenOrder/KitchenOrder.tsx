"use client";
import React from "react";
import { Dish } from "./components";
import { Button } from "@heroui/react";

const formatCoin = new Intl.NumberFormat("en-US", {
   style: "decimal", // Usamos 'decimal' para solo el formato numérico
   minimumFractionDigits: 2, // Asegura al menos 2 decimales
   maximumFractionDigits: 2, // Asegura no más de 2 decimales
});

type Props = {
  children: React.ReactNode;
  order: any;
  reload: () => void;
};

function KitchenOrder({ children, order, reload }: Props) {
   const statusInProgress = () => {
      fetch(
         `/api/orders/status?id=${order.id}&status=IN_PROGRESS`,
         {
            method: "GET",
         },
      )
         .then((response) => response.json())
         .then((response) => console.log(response))
         .catch((err) => console.error(err))
         .finally(() => reload());
   };

   const statusInDone = () => {
      fetch(
         `/api/orders/status?id=${order.id}&status=DELIVERED`,
         {
            method: "GET",
         },
      )
         .then((response) => response.json())
         .then((response) => console.log(response))
         .catch((err) => console.error(err))
         .finally(() => reload());
   };

   return (
      <div className="flex flex-col gap-2 px-4 py-4 shadow border-2 bg-white rounded-lg mx-6">
         <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
          Mesa #{order.table}
            </h2>
            <h3>
          Status: <b>{order.status}</b>
            </h3>
         </div>

         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {children}
         </div>

         <div className="flex flex-row items-end justify-end">
            <p>
          Total: <b>${formatCoin.format(order.billing)}</b>
            </p>
         </div>

         <div className="flex gap-3 flex-row items-center ml-auto">
            {order?.status === "IN_PROGRESS" ? (
               <Button onPress={statusInDone} className="px-8" color="primary">
            Hecho
               </Button>
            ) : (
               order?.status === "ORDERED" && (
                  <Button onPress={statusInProgress} className="px-8" color="warning">
              Cocinando
                  </Button>
               )
            )}

            <Button className="px-8" color="danger">
          Cancelar
            </Button>
         </div>
      </div>
   );
}

KitchenOrder.Dish = Dish;

export { KitchenOrder };
