<template>
  <div class="w-full p-5 mt-5 flex items-center justify-between max-w-6xl">
    <div class="hidden lg:block">
      <small
        >Showing <span class="font-bold">{{ currentPage + 1 }}</span> out of
        <span class="font-bold">{{ totalPages }}</span> pages</small
      >
    </div>
    <div class="flex items-center justify-between lg:justify-start w-full lg:w-fit gap-3">
      <button
        :disabled="currentPage === 0"
        :class="`${currentPage === 0 ? 'bg-primary_color/40' : 'bg-primary_color/80'} rounded-md px-4 py-2 text-white`"
        @click="goToPage(currentPage - 1)"
      >
        <i class="pi pi-chevron-left" style="font-size: 0.7rem"></i> Prev
      </button>

      <button
        :disabled="currentPage >= totalPages - 1"
        :class="`${currentPage >= totalPages - 1 ? 'bg-primary_color/40 ' : 'bg-primary_color/80'} rounded-md px-4 py-2 text-white`"
        @click="goToPage(currentPage + 1)"
      >
        Next <i class="pi pi-chevron-right" style="font-size: 0.7rem"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  urlRoute: {
    type: String,
    required: true
  },
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
    name: props.urlRoute,
    query: {
      page: page
    }
  })
}
</script>

<style scoped></style>
