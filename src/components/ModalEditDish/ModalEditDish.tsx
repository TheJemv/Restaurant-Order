"use client";

import DishType from "@/types/DishType";
import {
   Button,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
} from "@heroui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SortableList from "../SortableList";
import Input from "@/components/Input";
import { PhotoIcon } from "@heroicons/react/24/solid";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  item?: DishType | null;
   reload: () => void
};

type IngredientType = {
  id: number;
  name: string;
};

export function ModalEditDish({ isOpen, onClose, item, reload }: Props) {
   const [data, setData] = useState<DishType | null>(null);

   // Datos
   const [ingredients, setIngredients] = useState<IngredientType[]>();
   const [image, setImage] = useState<string>();
   const [fileImage, setFileImage] = useState();
   const onSave = async () => {
      const formData = new FormData();
      formData.append("id", data?.id as string);
      formData.append("name", data?.name as string);
      formData.append("description", data?.description as string);
      formData.append("photo", fileImage ? fileImage : "");
      formData.append("price", parseFloat(data?.price as string).toFixed(2));
      ingredients?.forEach((i) => formData.append("ingredients", i.name));

      try {
         await fetch("/api/product", {
            method: "PATCH",
            body: formData,
         }).finally(() => {
            reload();
            onClose();
         });
      } catch (e) {
         console.error((e as Error).message);
      }
   };

   useEffect(() => {
      if (item) {
         setIngredients(
            item?.ingredients.map((name, i) => ({
               id: i + 1,
               name,
            })),
         );
         setData(item);
      } else {
         setData(null);
         setIngredients([]);
      }
   }, [item]);

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setFileImage(file);
         setImage(URL.createObjectURL(file));
         setData((prev) => ({
            ...prev,
            photo: file,
         }));
      }
   };

   const onRemoveIngredient = (id: number) => {
      setIngredients(ingredients?.filter((i) => i.id !== id));
   };

   const addIngredient = (e: string) => {
      const maxId: number =
      ingredients?.length > 0
         ? Math.max(...ingredients.map((item) => item.id))
         : 0;
      const newIngredient: IngredientType = {
         id: maxId + 1,
         name: e,
      };

      setIngredients([...ingredients, newIngredient]);
   };

   return (
      <Modal
         className="max-h-[80%] overflow-y-auto"
         isOpen={isOpen}
         onClose={onClose}
         size="xl"
      >
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader className="flex flex-col gap-1">
                     <h2 className="text-dark font-bold text-2xl">Editar Platillo</h2>
                  </ModalHeader>

                  <ModalBody className="gap-6">
                     <div className="">
                        <label
                           htmlFor="Image"
                           className="overflow-hidden rounded relative group cursor-pointer"
                        >
                           <Image
                              src={image ? (image as string) : (item?.photo as string)}
                              alt={item?.name as string}
                              className="block mx-auto w-full h-[220px] object-cover"
                              height={20}
                              width={1520}
                           />
                           <div className="bg-default-400/0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-default-200/80 opacity-0 w-full h-full absolute top-0 flex flex-col items-center justify-center">
                              <PhotoIcon className="size-16 text-default-700" />
                           </div>
                        </label>
                        <input
                           id="Image"
                           className="hidden"
                           type="file"
                           accept="image/*"
                           onChange={onChangeImage}
                        />
                     </div>

                     <Input
                        label="Nombre"
                        placeholder="Ej. Tacos al pastor"
                        type="text"
                        name="name"
                        setText={onChange}
                        text={data?.name}
                     />

                     <Input
                        label="Precio"
                        placeholder="Ej. Tacos al pastor"
                        type="number"
                        name="price"
                        setText={onChange}
                        text={data?.price}
                     />

                     <Input
                        label="Descripcion"
                        placeholder="Ej. 89.00"
                        type="textarea"
                        name="description"
                        setText={onChange}
                        text={data?.description}
                     />

                     <div className="flex flex-col gap-1">
                        <h3 className="text-dark/80 font-bold text-lg">Ingredientes</h3>
                        <SortableList.Input
                           onSubmit={addIngredient}
                           placeholder="Agrega tus ingredients..."
                        />
                        <SortableList data={ingredients} setData={setIngredients}>
                           <SortableList.Column
                              data={ingredients}
                              onRemoveItem={onRemoveIngredient}
                           />
                        </SortableList>
                     </div>
                  </ModalBody>

                  <ModalFooter>
                     <Button color="primary" onPress={onSave}>
                Guardar
                     </Button>

                     <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
                     </Button>
                  </ModalFooter>
               </>
            )}
         </ModalContent>
      </Modal>
   );
}
