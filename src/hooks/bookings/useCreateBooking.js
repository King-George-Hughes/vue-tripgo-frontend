import axiosClient from '@/api/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const useCreateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (booking) =>
      await axiosClient
        .post('/bookings/travel', booking)
        .then(({ data }) => {
          return data
        })
        .catch((error) => {
          console.log(error)
        }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookings']
      })
    }
  })
}

export default useCreateBooking
