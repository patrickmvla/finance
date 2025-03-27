import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", id],
    queryFn: async () => {
      const response = await client.api.transactions[":id"]["$get"]({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch individual transactions");
      }

      const { data } = await response.json();
      return {
        ...data,
        amount: convertAmountFromMiliunits(data.amount),
      };
    },
  });
  return query;
};
