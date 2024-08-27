import { useQuery } from '@tanstack/vue-query'
import axiosClient from '@/api/axiosClient'

const useLocations = () => {
  return useQuery({
    queryKey: ['locations'],

    queryFn: async () => {
      return await axiosClient
        .get('/locations')
        .then(({ data }) => {
          return data
        })
        .catch((error) => console.log(error))
    }
  })
}

export default useLocations
