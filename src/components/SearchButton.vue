<script setup>
import { InputGroup, InputText, Button } from '@/hooks/usePrimevueComponents'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const search = ref('')

const props = defineProps({
  urlRoute: {
    type: String,
    required: true
  }
})

onMounted(() => {
  search.value = route.query.search || ''
})

const onSearch = () => {
  if (search.value.trim() === '') {
    router.push({
      name: props.urlRoute,
      query: {
        ...route.query,
        search: undefined
      }
    })
  } else {
    router.push({
      name: props.urlRoute,
      query: {
        ...route.query,
        search: search.value.trim()
      }
    })
  }
}
</script>

<template>
  <div>
    <InputGroup>
      <InputText placeholder="Search..." v-model="search" />
      <Button icon="pi pi-search" severity="success" @click="onSearch()" />
    </InputGroup>
  </div>
</template>

<style lang="scss" scoped></style>
