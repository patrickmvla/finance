import { useOpenCategory } from "@/modules/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/modules/transactions/hooks/use-open-transaction";
import { cn } from "@/lib/utils";
import { TriangleAlertIcon } from "lucide-react";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
    >
      {!category && (
        <>
          <TriangleAlertIcon className="mr-2 size-4 shrink-0" />
          Uncategorized
        </>
      )}
      {category}
    </div>
  );
};
