import { useMutation } from "@tanstack/react-query";
import api from "../utils/axios";

const Logout = async (userData) => {
  const response = await api.post("/user/logout", userData);
  return response.data;
};

export const useLogout = () => {
  return useMutation({
    mutationFn: Logout,
  });
};
