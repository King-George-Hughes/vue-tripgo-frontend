import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useQuery } from '@tanstack/vue-query'

const useUserBookings = () => {
  const token = useUserStore().token
  const user = useUserStore().user

  return useQuery({
    queryKey: ['bookings'],

    queryFn: async () => {
      return await axiosClient
        .get(`/user/${user.id}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ data }) => {
          return data
        })
        .catch((error) => console.log(error))
    },
    keepPreviousData: true
  })
}

export default useUserBookings
