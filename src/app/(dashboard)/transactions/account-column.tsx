import { useOpenAccount } from "@/modules/accounts/hooks";

type Props = {
  account?: string | null;
  accountId?: string | null;
};

export const AccountColumn = ({ account, accountId }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount();
  const onClick = () => {
    if (accountId) onOpenAccount(accountId);
  };
  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={onClick}
    >
      {account}
    </div>
  );
};
