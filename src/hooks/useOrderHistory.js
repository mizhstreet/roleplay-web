import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const fetchOrderHistory = async () => {
  const { data } = await api.get("/my-orders");
  return data;
};

const useOrderHistory = () => {
  return useQuery({
    queryKey: ["OrderHistory"],
    queryFn: fetchOrderHistory,
  });
};

export default useOrderHistory;
