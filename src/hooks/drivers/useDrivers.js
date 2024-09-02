import axiosClient from '@/api/axiosClient'
import { useUserStore } from '@/stores/user'
import { useQuery } from '@tanstack/vue-query'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

const useDrivers = () => {
  const route = useRoute()
  const token = useUserStore().token

  const query = reactive({
    page: computed(() => parseInt(route.query.page) || 0),
    sort: computed(() => route.query.sort || 'dateCreated,desc'),
    size: computed(() => parseInt(route.query.size) || 10),
    param: computed(() => route.query.search || '')
  })

  return useQuery({
    queryKey: ['drivers', query],

    queryFn: async () => {
      return await axiosClient
        .get('/drivers-paged', {
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
    },
    keepPreviousData: true
  })
}

export default useDrivers

// import axiosClient from '@/api/axiosClient'
// import { useUserStore } from '@/stores/user'
// import { useQuery } from '@tanstack/vue-query'

// const useDrivers = () => {
//   const token = useUserStore().token

//   return useQuery({
//     queryKey: ['drivers'],

//     queryFn: async () => {
//       return await axiosClient
//         .get('/drivers', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         })
//         .then(({ data }) => {
//           return data
//         })
//         .catch((error) => console.log(error))
//     }
//   })
// }

// export default useDrivers
