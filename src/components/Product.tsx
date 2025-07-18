"use client";
import { toSentence } from "@/lib/toSentence";
import DishType from "@/types/DishType";
import Image from "next/image";

type Props = {
   data: DishType
};

export default function Product({ data }: Props) {
   const handleAddToCart = () => {
      console.log("Add to cart: ", data.name);
   };

   return (
      <div
         data-name={data.name}
         data-price={data.price}
         className="bg-white rounded-[1.25rem] border border-[#e2e8f0] shadow-[0_8px_20px_rgba(0,0,0,0.06)] overflow-hidden transform transition-all duration-300 ease-in-out"
      >
         <Image
            src={data.photo}
            className="block mx-auto w-full h-[220px] object-cover rounded-t-[1.25rem]"
            height={220}
            width={1520}
            alt={data.name}
         />

         <div className="p-4 h-fit">
            {/* Nombre */}
            <h3 className="text-xl font-semibold">{data.name}</h3>
            <span className="text-2xl font-bold accent-red">${data.price}</span>

            {/* Ingredientes */}
            <div className="dish-ingredients block my-4 text-sm text-gray-700">
               <p>
                  <span className="font-semibold">Ingredientes:</span>{" "}
                  {" " + toSentence(data.ingredients)}
               </p>
            </div>

            {/* Boton */}
            <button
               onClick={handleAddToCart}
               className="cursor-pointer mt-auto w-full bg-gradient-to-r from-[#1a1f60] to-[#3e437e] text-white py-3 px-6 rounded-full font-semibold shadow"
            >
          Añadir al Carrito
            </button>
         </div>
      </div>
   );
}
