"use client";
import { TableCell, TableRow, Tooltip, User } from "@heroui/react";

import {
   EyeIcon,
   PencilSquareIcon,
   TrashIcon,
} from "@heroicons/react/24/outline";
import { toSentence } from "@/lib/toSentence";
import DishType from "@/types/DishType";

export function Item(
   dish: DishType,
   reload: () => void,
   onDetails: (id: string) => void,
   onEdit: (id: string) => void,
) {
   const onDelete = async () => {
      const formData = new FormData();
      formData.append("id", dish.id);

      const res = await fetch("/api/product", {
         method: "DELETE",
         body: formData,
      });

      if (res.status === 202) {
         alert("Eliminado Correctamente...");
         reload();
      } else {
         alert(`Error al eliminarlo: ${res.status}`);
      }
   };

   const renderCell = (columnKey: string) => {
      switch (columnKey) {
      case "name":
         return (
            <User
               name={dish.name}
               description={toSentence(dish.ingredients)}
               avatarProps={{
                  radius: "lg",
                  src: dish.photo,
                  size: "lg",
               }}
            />
         );

      case "actions":
         return (
            <div className="flex flex-col items-center">
               <div className="relative flex gap-2">
                  <button onClick={() => onDetails(dish.id)}>
                     <Tooltip content="Detalles">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                           <EyeIcon className="size-6" />
                        </span>
                     </Tooltip>
                  </button>

                  <button onClick={() => onEdit(dish.id)}>
                     <Tooltip content="Editar">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                           <PencilSquareIcon className="size-6" />
                        </span>
                     </Tooltip>
                  </button>

                  <button onClick={onDelete}>
                     <Tooltip content="Eliminar" color="danger">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                           <TrashIcon className="size-6" />
                        </span>
                     </Tooltip>
                  </button>
               </div>
            </div>
         );

      default:
         return dish[columnKey as keyof DishType] as React.ReactNode;
      }
   };

   return (
      <TableRow key={dish.id}>
         {(columnKey) => <TableCell>{renderCell(columnKey as string)}</TableCell>}
      </TableRow>
   );
}
