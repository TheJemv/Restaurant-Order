"use client";

import React from "react";
type Props = {
   label?: string;
   placeholder?: string;
   name: string;
   text: string;
   setText: (e: React.ChangeEvent<HTMLInputElement>) => void;
   type?: "text" | "textarea" | "number";
};

function Input({
   label = "Label",
   placeholder = "placeholder",
   name = "name",
   text,
   setText,
   type = "text",
}: Props) {
   return (
      <div>
         <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
            <h3 className="text-dark/80 font-bold text-lg">{label}</h3>
         </label>
         {type == "text" ? (
            <input
               name={name}
               id={name}
               type="text"
               value={text}
               onChange={(e) => setText(e)}
               placeholder={placeholder}
               className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
         ) : type == "textarea" ? (
            <textarea
               name={name}
               id={name}
               rows={5}
               value={text}
               onChange={(e) => setText(e)}
               placeholder={placeholder}
               className="w-full resize-none px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

         ) : type == "number" && (
            <input
               name={name}
               id={name}
               type="number"
               step={"0.01"}
               min={"0"}
               value={text}
               onChange={(e) => setText(e)}
               placeholder={placeholder}
               className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
         )}
      </div>
   );
}

export { Input };
