import { MenuService } from "@/services/api/menu";
import { useQuery } from "@tanstack/react-query";

interface UseEditProductModalControllerProps {
  productid: string;
  orgId: string;
}

export const useEditProductModalController = ({
  orgId,
  productid,
}: UseEditProductModalControllerProps) => {
  const { data, isFetching } = useQuery({
    queryKey: ["getInfoProduct", { productid, orgId }],
    queryFn: async () =>
      await MenuService.getInfoProduct({ orgId, productId: productid }),
  });

  return {
    data,
    isFetching,
  };
};
