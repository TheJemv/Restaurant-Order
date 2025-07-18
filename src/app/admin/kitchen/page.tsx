"use client";
import KitchenOrder from "@/components/KitchenOrder";
import { useCallback, useEffect, useState } from "react";


export default function Kitchen() {
   const [orders, setOrders] = useState();
   const [loading, setLoading] = useState(true);
   
   const fetchOrders = useCallback(() => {
      fetch("/api/orders")
         .then((res) => res.json())
         .then((data) => setOrders(data?.data))
         .catch(console.error)
         .finally(() => setLoading(false));
   }, [])

   useEffect(() => {
      fetchOrders()
   }, []);

   if (loading) return "Cargando..."
   return (
      <div className="max-w-7xl py-4 mx-auto flex flex-col gap-2">
         <h1 className="text-3xl font-bold mb-8 text-center text-default-800">
        Ordenes en Cocina
         </h1>
         {orders &&
        orders?.map((item, a) => (
           <KitchenOrder order={item} reload={fetchOrders} key={a}>
              {item?.products?.map((product, i) => (
                 <KitchenOrder.Dish product={product} key={i} />
              ))}
           </KitchenOrder>
        ))}
      </div>
   );
}
