"use client"

import { SortableContext } from "@dnd-kit/sortable";
import SortableList from "@/components/SortableList";

type Item = {
   id: number,
   name: string
}

type Props = {
   data: Item[],
   onRemoveItem: (id: string) => void
}

export function Column({ data, onRemoveItem }: Props) {
   return (
      <div className="rounded-md py-4 flex flex-col gap-[15px]">
         <SortableContext items={data ? data : []}>
            {data?.map((item) => (
               <SortableList.Item key={item.id} id={item.id} name={item.name} onRemoveItem={onRemoveItem} />
            ))}
         </SortableContext>
      </div>
   );
}
