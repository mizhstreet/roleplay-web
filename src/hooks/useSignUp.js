import { useMutation } from "@tanstack/react-query";
import api from "../utils/axios";

// ...existing code...

const signUp = async (userData) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
