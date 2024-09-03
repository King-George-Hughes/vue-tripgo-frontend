import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { computed, reactive } from 'vue'

const useSchedules = () => {
  const route = useRoute()
  const token = useUserStore().token

  const query = reactive({
    page: computed(() => parseInt(route.query.page) || 0),
    sort: computed(() => route.query.sort || 'dateCreated,desc'),
    size: computed(() => parseInt(route.query.size) || 10),
    param: computed(() => route.query.search || '')
  })

  return useQuery({
    queryKey: ['schedules', query],

    queryFn: async () => {
      return await axiosClient
        .get('/bus/schedules', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page: query.page,
            sort: query.sort,
            size: query.size,
            param: query.param
          }
        })
        .then(({ data }) => {
          return data
        })
        .catch((error) => console.log(error))
    },
    keepPreviousData: true
    // refetchOnWindowFocus: false // Optional: Change to true if you want to refetch on window focus
  })
}

export default useSchedules
