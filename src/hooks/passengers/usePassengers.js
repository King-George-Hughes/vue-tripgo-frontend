import axiosClient from '@/api/axiosClient'
import { useQuery } from '@tanstack/vue-query'

const usePassengers = () => {
  return useQuery({
    queryKey: ['passengers'],

    queryFn: async () => {
      return await axiosClient
        .get('/passenger/passengers')
        .then(({ data }) => {
          return data
        })
        .catch((error) => console.log(error))
    }
  })
}

export default usePassengers
