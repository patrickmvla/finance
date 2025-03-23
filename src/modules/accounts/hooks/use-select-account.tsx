import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JSX, useState } from "react";
import { useCreateAccount } from "../api/use-create-account";
import { useGetAccounts } from "../api/use-get-accounts";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<string | undefined>
] => {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [selectedValue, setSelectedValue] = useState<string>();
  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const confirm = () =>
    new Promise<string | undefined>((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
    setSelectedValue(undefined);
  };

  const handleConfirm = () => {
    promise?.resolve(selectedValue);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmDialog = () => (
    <Dialog
      open={promise !== null}
      onOpenChange={(open) => !open && handleCancel()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select an account to continue
          </DialogDescription>
        </DialogHeader>

        <Select
          placeholder="Select an account"
          options={accountOptions}
          value={selectedValue} // Pass current value
          onCreate={onCreateAccount}
          onChange={(value) => setSelectedValue(value)} // Update state
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />

        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmDialog, confirm];
};
