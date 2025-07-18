"use client";

import { TableBody, useDisclosure } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import ModalEditDish from "@/components/ModalEditDish";
import TablePanel from "@/components/TablePanel";
import ViewModalDish from "@/components/ViewModalDish";
import DishType from "@/types/DishType";

export default function Admin() {
   const [dishs, setDishs] = useState<DishType[]>([]);
   const [loading, setLoading] = useState(true);
   const [itemSelected, setItemSelected] = useState<DishType | null>(null);

   const {
      isOpen: isOpenDetails,
      onOpen: onOpenDetials,
      onClose: onCloseDetails,
   } = useDisclosure();
   const {
      isOpen: isOpenEdit,
      onOpen: onOpenEdit,
      onClose: onCloseEdit,
   } = useDisclosure();

   const fetchDishs = useCallback(() => {
      fetch("/api/products")
         .then((res) => res.json())
         .then((data) => setDishs(data?.data))
         .catch(console.error)
         .finally(() => setLoading(false));
   }, []);

   useEffect(() => {
      fetchDishs();
   }, [fetchDishs]);

   const onDetails = (id: string) => {
      const findedItem = dishs.find((item) => item.id === id);
      if (!findedItem) return;

      setItemSelected(findedItem);
      onOpenDetials();
   };

   const onEdit = (id: string) => {
      const findedItem = dishs.find((item) => item.id === id);
      if (!findedItem) return;

      setItemSelected(findedItem);
      onOpenEdit();
   };

   return (
      <div className="min-w-full">
         <div className="container mx-auto">
            <div className="py-2">
               <ModalEditDish
                  isOpen={isOpenEdit}
                  onClose={onCloseEdit}
                  item={itemSelected}
                  reload={fetchDishs}
               />

               <ViewModalDish
                  isOpen={isOpenDetails}
                  onClose={onCloseDetails}
                  item={itemSelected}
               />

               <TablePanel>
                  <TableBody items={dishs}>
                     {(item) => TablePanel.Item(item, fetchDishs, onDetails, onEdit)}
                  </TableBody>
               </TablePanel>
            </div>
         </div>
      </div>
   );
}
