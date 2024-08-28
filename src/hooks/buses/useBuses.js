import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useQuery } from '@tanstack/vue-query'

const useBuses = () => {
  const token = useUserStore().token

  return useQuery({
    queryKey: ['buses'],

    queryFn: async () => {
      return await axiosClient
        .get('/buses', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ data }) => {
          return data
        })
        .catch((error) => console.log(error))
    }
  })
}

export default useBuses
