import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const fetchProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useProducts;
