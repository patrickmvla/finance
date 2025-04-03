import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransaction } from "../hooks/use-new-transaction";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransactions } from "../api/use-create-transactions";
import { useCreateCategory } from "@/modules/categories/api/use-create-category";
import { useGetCategories } from "@/modules/categories/api/use-get-categories";
import { useCreateAccount } from "@/modules/accounts/api/use-create-account";
import { useGetAccounts } from "@/modules/accounts/api/use-get-accounts";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionSchema.omit({
  id: true,
});
export { formSchema };

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const createMutation = useCreateTransactions();

  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();

  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
  const categoryOptions = (categoryQuery.data || []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountMutation = useCreateAccount();
  const accountQuery = useGetAccounts();

  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (accountQuery.data || []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new Transaction</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolut inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
