import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useQuery } from '@tanstack/vue-query'

const useDrivers = () => {
  const token = useUserStore().token

  return useQuery({
    queryKey: ['drivers'],

    queryFn: async () => {
      return await axiosClient
        .get('/drivers', {
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

export default useDrivers
