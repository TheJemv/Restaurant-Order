"use client";
import SortableList from "@/components/SortableList";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type IngredientType = {
   id: number,
   name: string
}

export default function Create() {
   const router = useRouter();

   const [image, setImage] = useState<File | null>(null);
   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");

   const [ingredients, setIngredients] = useState<IngredientType[]>([]);

   const addIngredients = (name: string) => {
      setIngredients((item) => [...item, { id: item.length + 1, name }]);
   };

   const removeIngredients = (id: number) => {
      setIngredients((prev) => prev.filter((p) => p.id !== id))
   }

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setImage(file);
         setPreviewUrl(URL.createObjectURL(file));
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!image || !name || !price || !ingredients || !description) {
         alert("Por favor, completa todos los campos.");
         return;
      }

      const formData = new FormData();
      formData.append("photo", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", parseFloat(price).toFixed(2)); // dos decimales
      ingredients.forEach(i => formData.append("ingredients", i.name));

      try {
         const res = await fetch("/api/product", {
            method: "POST",
            body: formData,
         });

         if (!res.ok) {
            const error = await res.text();
            throw new Error(error);
         }

         router.push("/admin");
      } catch (err) {
         alert(`Error al enviar: ${(err as Error).message}`);
      }
   };

   return (
      <div className="flex items-center justify-center py-12">
         <div className="w-full max-w-md bg-gray-50 shadow-lg rounded-2xl p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Crear Platillo</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
               {/* Imagen */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Foto del platillo
                  </label>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleImageChange}
                     className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                  {previewUrl && (
                     <img
                        src={previewUrl}
                        alt="Vista previa"
                        className="mt-4 w-full h-48 object-cover rounded-lg border border-gray-200"
                     />
                  )}
               </div>

               {/* Nombre */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Nombre
                  </label>
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Ej. Tacos al pastor"
                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
               </div>

               {/* Descripcion */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Descripcion
                  </label>
                  <textarea
                     rows={5}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     placeholder="Ej. Tacos al pastor muy buenos con cebolla, cilantro y mas. Pastor recien salido del horno."
                     className="w-full resize-none px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
               </div>

               {/* Precio */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Precio (MXN)
                  </label>
                  <input
                     type="number"
                     step="0.01"
                     min="0"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     placeholder="Ej. 89.00"
                     className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
               </div>

               {/* Ingredientes */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     Ingredientes
                  </label>

                  <SortableList.Input
                     placeholder="Agrega tus igredients..."
                     onSubmit={addIngredients}
                  />
                  <SortableList data={ingredients} setData={setIngredients}>
                     <SortableList.Column data={ingredients} onRemoveItem={removeIngredients} />
                  </SortableList>
               </div>

               {/* Botón */}
               <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
               >
                  Guardar Platillo
               </button>
            </form>
         </div>
      </div>
   );
}
