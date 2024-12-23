import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const fetchOrder = async ({ queryKey }) => {
  const [, orderId] = queryKey;
  const { data } = await api.get(`/orders/${orderId}`);
  return data;
};

const useOrder = (orderId) => {
  return useQuery({
    queryKey: ["Order", orderId],
    queryFn: fetchOrder,
  });
};

export default useOrder;
