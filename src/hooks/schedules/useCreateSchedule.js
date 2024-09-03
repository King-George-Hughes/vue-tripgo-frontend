import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const useCreateSchedule = () => {
  const token = useUserStore().token
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (schedule) =>
      await axiosClient
        .post('/bus/schedule', schedule, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ data }) => {
          return data
        }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedules']
      })
    },

    onError: (error) => {
      console.log(error)
    }
  })
}

export default useCreateSchedule
