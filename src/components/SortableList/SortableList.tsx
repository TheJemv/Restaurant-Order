import {
   closestCenter,
   DndContext,
   KeyboardSensor,
   PointerSensor,
   useSensor,
   useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React from "react";
import { Column, Input, Item } from "./components";

type Item = {
   id: number,
   name: string
}

type Props = {
   children: React.ReactNode
   data: Item[],
   setData: () => void,
}

function SortableList({ children, data, setData }: Props) {
   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      }),
   );

   const getItemPos = (id: number) => data.findIndex((item) => item.id === id);
   const handleDragEnd = (event) => {
      const { active, over } = event;

      if (active.id === over.id) return;

      setData((data) => {
         const originalPos = getItemPos(active.id);
         const newPos = getItemPos(over.id);

         return arrayMove(data, originalPos, newPos);
      });
   };


   return (
      <DndContext
         sensors={sensors}
         collisionDetection={closestCenter}
         onDragEnd={handleDragEnd}
      >
         {children}
         {/* <Column data={data} onRemoveItem={onRemoveItem} /> */}
      </DndContext>
   );
}

SortableList.Column = Column
SortableList.Item = Item
SortableList.Input = Input

export default SortableList
