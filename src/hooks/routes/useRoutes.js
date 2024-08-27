import { useQuery } from "@tanstack/vue-query";
import axiosClient from "../../api/axiosClient";

const useRoutes = () => {
  return useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      return await axiosClient
        .get("/route/routes")
        .then(({ data }) => {
          console.log(data.data);
          return data.data;
        })
        .catch((error) => console.log(error));
    },
  });
};

export default useRoutes;
