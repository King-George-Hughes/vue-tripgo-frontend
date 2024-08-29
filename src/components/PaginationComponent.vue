<template>
  <div class="pagination">
    <button :disabled="currentPage === 0" @click="goToPage(currentPage - 1)">Previous</button>

    <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>

    <button :disabled="currentPage >= totalPages - 1" @click="goToPage(currentPage + 1)">
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  }
})

const currentPage = computed(() => {
  return parseInt(route.query.page) || 0
})

const goToPage = (page) => {
  if (page < 0 || page >= props.totalPages) return

  router.push({
    name: 'schedules',
    query: {
      page: page
    }
  })
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
