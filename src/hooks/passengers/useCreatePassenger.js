import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const useCreatePassenger = () => {
  const token = useUserStore().token
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (passenger) =>
      await axiosClient
        .post('/passenger', passenger, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
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
