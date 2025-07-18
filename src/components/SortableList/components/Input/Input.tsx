import { useState } from "react";

type Props = {
   placeholder?: string
   onSubmit?: () => void;
};

export const Input = ({ placeholder="", onSubmit }: Props) => {
   const [input, setInput] = useState<string>("");

   const handleSubmit = () => {
      if (!input) return;

      onSubmit(input);
      setInput("");
   };

   return (
      <div className="flex gap-2">
         <input
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
         />
         <button
            onClick={handleSubmit}
            className="border-none rounded-lg px-4 py-2 bg-[#2563eb] text-white"
            type="button"
         >
            Agregar
         </button>
      </div>
   );
};
