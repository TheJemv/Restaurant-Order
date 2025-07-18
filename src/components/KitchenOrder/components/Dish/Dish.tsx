import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid"

type Product = {
   exclude: string[]
   quantity: number
   product: {
      name: string,
      ingredients: string[]
   }
}


type Props = {
   product: Product
}

export function Dish({ product }: Props) {
   return (
      <div className="bg-white rounded-lg shadow flex flex-col border p-4 w-full box-border">
         <h3 className="font-bold text-lg text-gray-800 mb-2">{product?.product?.name}</h3>
         {product.quantity > 1 && (
            <p 
               className="text-gray-700 font-medium mb-1 m-0 pt-2"
            >Cantidad: {product.quantity}</p>
         )}
         <p className="text-gray-700 font-medium mb-1">Ingredientes:</p>
         <ul className="list-inside text-gray-600 text-sm">
            {product?.product?.ingredients?.map((item, index) => (
               <div className="flex flex-row gpa-2 items-center" key={index}>
                  {product.exclude.includes(item) ? (
                     <XMarkIcon className="size-6 text-red-400" />
                  ):(
                     <CheckIcon className="size-6 text-green-400" />
                  )}
                  <p>{item}</p>
               </div>
            ))}
         </ul>
      </div>
   );
}
