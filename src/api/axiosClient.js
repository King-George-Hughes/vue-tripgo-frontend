import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

// // Request interceptor
// axiosClient.interceptors.request.use((config) => {
//   const userStore = useUserStore()
//   const token = userStore.token

//   // Add token only if it exists
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }

//   return config
// })

// // Response interceptor
// axiosClient.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     const { response } = error

//     if (response && response.status === 401) {
//       useUserStore().setToken('')
//     }

//     throw error
//   }
// )

export default axiosClient

////////////////////////////////////////////////////////////

// import axios from 'axios'

// const axiosClient = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
// })

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("ACCESS_TOKEN");
//   config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const { response } = error;

//     if (response.status === 401) {
//       localStorage.removeItem("ACCESS_TOKEN");
//     }

//     throw error;
//   }
// );

// export default axiosClient
