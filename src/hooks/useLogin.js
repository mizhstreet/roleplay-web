import { useMutation } from "@tanstack/react-query";
import api from "../utils/axios";

const login = async (userData) => {
  const response = await api.post("/user/login", userData);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
