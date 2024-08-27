import axiosClient from '@/api/axiosClient'
import { useQuery } from '@tanstack/vue-query'

const useBuses = () => {
  return useQuery({
    queryKey: ['buses'],

    queryFn: async () => {
      return await axiosClient
        .get('/buses')
        .then(({ data }) => {
          return data
        })
        .catch((error) => console.log(error))
    }
  })
}

export default useBuses
