"use client";
import Product from "@/components/Product";
import DishType from "@/types/DishType";
import { useEffect, useState } from "react";


export default function Home() {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch("/api/products")
         .then((res) => res.json())
         .then((data) => setProducts(data?.data))
         .catch(console.error)
         .finally(() => setLoading(false));
   }, []);

   if (loading) return "Cargando...";
   return (
      <main className="container mx-auto p-6 flex-grow">
         <section className="mb-12">
            <h2 className="text-4xl font-extrabold text-center mb-8 accent-red">
               Nuestros Platillos Estrella
            </h2>

            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
               {products.map((item: DishType) => (
                  <Product key={item.id} data={item} />
               ))}
            </div>
         </section>
      </main>
   );
}
