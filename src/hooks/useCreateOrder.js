import { useMutation } from "@tanstack/react-query";
import api from "../utils/axios";

// ...existing code...

const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
