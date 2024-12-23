import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const fetchMe = async () => {
  const { data } = await api.get("/me");
  return data;
};

const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
};

export default useMe;
