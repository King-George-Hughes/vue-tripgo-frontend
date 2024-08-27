import axiosClient from '@/api/axiosClient'
import { useQuery } from '@tanstack/vue-query'

const useDrivers = () => {
  return useQuery({
    queryKey: ['drivers'],

    queryFn: async () => {
      return await axiosClient
        .get('/drivers')
        .then(({ data }) => {
          return data
        })
        .catch((error) => console.log(error))
    }
  })
}

export default useDrivers
