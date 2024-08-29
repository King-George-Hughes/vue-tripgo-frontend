import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { computed, reactive } from 'vue'

const useLocationsWithParams = () => {
  const route = useRoute()
  const token = useUserStore().token

  const query = reactive({
    page: computed(() => parseInt(route.query.page) || 0),
    sort: computed(() => route.query.sort || 'dateCreated,desc'),
    size: computed(() => parseInt(route.query.size) || 10)
  })

  return useQuery({
    queryKey: ['locations', query],

    queryFn: async () => {
      return await axiosClient
        .get('/locations-paged', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page: query.page,
            sort: query.sort,
            size: query.size
          }
        })
        .then(({ data }) => {
          console.log(data)
          return data
        })
        .catch((error) => console.log(error))
    },
    keepPreviousData: true
  })
}

export default useLocationsWithParams
