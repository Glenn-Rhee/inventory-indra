"use client";
import { useSession } from "next-auth/react";
import DialogAddTransactions from "../transactions/DialogAddTransactions";

interface DialogRestockProps {
  productName: string;
  price: number;
}

export default function DialogRestock(props: DialogRestockProps) {
  const { productName, price } = props;
  const { data: session } = useSession();

  return (
    <DialogAddTransactions
      productName={productName}
      userId={session?.user.id || ""}
      useForPage="stock"
      price={price}
    />
  );
}
