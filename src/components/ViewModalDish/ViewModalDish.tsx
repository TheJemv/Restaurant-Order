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

type Props = {
   isOpen: boolean;
   onClose: () => void;
   item?: DishType;
};

export function ViewModalDish({ isOpen, onClose, item }: Props) {
   return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader className="flex flex-col gap-1">
                     <h2 className="text-dark font-bold text-2xl">{item?.name}</h2>
                  </ModalHeader>

                  <ModalBody className="gap-6">
                     <Image
                        src={item?.photo as string}
                        alt={item?.name as string}
                        className="block mx-auto w-full h-[220px] object-cover rounded"
                        height={20}
                        width={1520}
                     />

                     <div className="flex flex-col gap-1">
                        <h3 className="text-dark/80 font-bold text-xl">Descripcion</h3>
                        <div className="flex flex-col gap-[2px] pl-2">
                           <p className="text-default-600">{item?.description}</p>
                        </div>
                     </div>

                     <div className="flex flex-col gap-1">
                        <h3 className="text-dark/80 font-bold text-xl">Ingredientes</h3>
                        <div className="flex flex-col gap-[2px] pl-2">
                           {item?.ingredients.map((item, i) => (
                              <p key={i} className="text-default-600">{item}</p>
                           ))}
                        </div>
                     </div>
                  </ModalBody>

                  <ModalFooter>
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
