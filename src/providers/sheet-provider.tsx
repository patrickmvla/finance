"use client";

import { NewAccountSheet } from "@/modules/accounts/components/new-account-sheet";
import { EditAccountSheet } from "@/modules/accounts/components/edit-account-sheet";
import { NewCategorySheet } from "@/modules/categories/components/new-category-sheet";
import { EditCategorySheet } from "@/modules/categories/components/edit-category-sheet";
import { NewTransactionSheet } from "@/modules/transactions/components/new-transaction-sheet";
import { EditTransactionSheet } from "@/modules/transactions/components/edit-transaction-sheet";

import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewCategorySheet />
      <EditCategorySheet />
      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
};
