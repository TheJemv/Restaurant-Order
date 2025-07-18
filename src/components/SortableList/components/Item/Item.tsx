"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
   id: number;
   name: string;
   onRemoveItem: (id: number) => void;
};

export function Item({ id, name, onRemoveItem }: Props) {
   const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

   const style = {
      transition,
      transform: CSS.Transform.toString(transform),
   };

   return (
      <div
         ref={setNodeRef}
         style={style}
         {...attributes}
         {...listeners}
         className="bg-white rounded-md shadow-md w-full py-3 px-5 flex items-center justify-start gap-3 touch-none"
      >
         <button onPointerDown={e => e.stopPropagation()} onClick={() => onRemoveItem(id)} type="button">
            <TrashIcon className="size-10 text-danger hover:bg-gray-200 py-2 px-2 rounded-full transition-all duration-300" />
         </button>
         <p>{name}</p>
      </div>
   );
}
