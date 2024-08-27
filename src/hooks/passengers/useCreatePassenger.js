import axiosClient from '@/api/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const useCreatePassenger = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (passenger) =>
      await axiosClient
        .post('/passenger', passenger)
        .then(({ data }) => {
          console.log(data)
          return data
        })
        .catch((error) => {
          console.log(error)
        }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['passengers']
      })
    }
  })
}

export default useCreatePassenger
