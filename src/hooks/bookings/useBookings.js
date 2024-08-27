import axiosClient from '@/api/axiosClient'
import { useQuery } from '@tanstack/vue-query'

const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],

    queryFn: async () => {
      return await axiosClient
        .get('/bookings')
        .then(({ data }) => {
          return data
        })
        .catch((error) => console.log(error))
    }
  })
}

export default useBookings
