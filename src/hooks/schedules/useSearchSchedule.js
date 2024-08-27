import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axiosClient from "../../api/axiosClient";

const useSearchSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (schedule) =>
      await axiosClient.post("/bus/schedules", schedule).then(({ data }) => {
        // console.log(data);
        return data;
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schedules"],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
};

export default useSearchSchedule;
