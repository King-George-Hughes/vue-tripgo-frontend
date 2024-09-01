<template>
  <div
    className="w-full grid grid-cols-3 gap-2 border-2  rounded-lg h-[100px] transition-all duration-200"
  >
    <div className="col-span-1 w-full flex items-center justify-center p-2">
      <i :class="`pi ${icon}`" :style="`font-size: 3rem; color: ${color}`"></i>
    </div>
    <div className="col-span-2 w-full flex flex-col items-start justify-center p-2">
      <h4 className="font-bold text-4xl mb-2">{{ results }}</h4>
      <p className="text-md">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String
  },
  results: {
    type: Number
  },
  icon: {
    type: String
  },
  color: {
    type: String
  }
})
</script>

<style lang="scss" scoped></style>
