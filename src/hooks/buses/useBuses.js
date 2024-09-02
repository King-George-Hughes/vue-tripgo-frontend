import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useQuery } from '@tanstack/vue-query'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

const useBuses = () => {
  const route = useRoute()
  const token = useUserStore().token

  const query = reactive({
    page: computed(() => parseInt(route.query.page) || 0),
    sort: computed(() => route.query.sort || 'dateCreated,desc'),
    size: computed(() => parseInt(route.query.size) || 10),
    param: computed(() => route.query.search || '')
  })

  return useQuery({
    queryKey: ['buses', query],

    queryFn: async () => {
      return await axiosClient
        .get('/buses-paged', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            param: query.param,
            page: query.page,
            sort: query.sort,
            size: query.size
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
