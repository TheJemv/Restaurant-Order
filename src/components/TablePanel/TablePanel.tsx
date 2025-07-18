"use client";
import { Table, TableColumn, TableHeader } from "@heroui/react";

import { Item } from "./components/Item";
import React from "react";

const columns = [
   { name: "Platillo", uid: "name" },
   { name: "Acciones", uid: "actions" },
];

type Props = {
   children: React.ReactNode;
};

const TablePanel = ({ children }: Props) => (
   <Table aria-label="Tabla de Platillos">
      <TableHeader columns={columns}>
         {(column) => (
            <TableColumn
               key={column.uid}
               align={column.uid === "actions" ? "center" : "start"}
            >
               {column.name}
            </TableColumn>
         )}
      </TableHeader>

      {children}
   </Table>
);

TablePanel.Item = Item;

export default TablePanel;
