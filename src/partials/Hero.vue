<template>
  <div
    class="relative overflow-hidden flex items-center justify-center h-[60vh]"
  >
    <img
      src="/images/hero2.jpg"
      alt="banner"
      class="w-full h-full object-cover"
    />

    <div
      class="absolute w-full h-full bg-gradient-to-b from-black/50 to-black/90"
    />

    <div
      class="absolute max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 z-10"
    >
      <!-- Title -->
      <div class="mt-5 max-w-4xl text-center mx-auto">
        <h1 class="block font-bold text-white text-2xl md:text-5xl lg:text-6xl">
          Where are you
          <span
            class="bg-clip-text bg-gradient-to-br from-primary_color to-secondary_color text-transparent"
            >traveling to?</span
          >
        </h1>
      </div>
      <!-- End Title -->

      <div class="mt-5 max-w-3xl text-center mx-auto">
        <p class="text-sm lg:text-xl text-gray-400">
          Book with us and enjoy the best at affordable prices.
        </p>
      </div>

      <div class="mt-5 lg:mt-12 flex justify-center">
        <FilterSearch />
      </div>
    </div>
  </div>

  <div
    class="relative w-full h-[200px] lg:h-[80px] flex items-center justify-center"
  >
    <div
      class="lg:w-[84rem] w-[90vw] mx-auto p-5 bg-white h-full absolute -top-5 lg:-top-10 flex flex-col lg:flex-row items-center justify-between rounded-lg shadow-md"
    >
      <div class="w-full md:w-2/6 flex items-center justify-center gap-4">
        <i
          class="pi pi-check-circle text-primary_color"
          style="font-size: 2rem"
        ></i>
        <div>
          <p class="font-semibold">24/7 Customer Service</p>
          <p class="text-gray-500">All Languages</p>
        </div>
      </div>
      <div class="w-full md:w-2/6 flex items-center justify-center gap-4">
        <i
          class="pi pi-check-circle text-primary_color"
          style="font-size: 2rem"
        ></i>
        <div>
          <p class="font-semibold">Get Great Deals</p>
          <p class="text-gray-500">No hidden costs</p>
        </div>
      </div>
      <div class="w-full md:w-2/6 flex items-center justify-center gap-4">
        <i
          class="pi pi-check-circle text-primary_color"
          style="font-size: 2rem"
        ></i>
        <div>
          <p class="font-semibold">No. 1 in the Country</p>
          <p class="text-gray-500">Reliable and Psersonal</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterSearch from "../components/FilterSearch.vue";
</script>

<style lang="scss" scoped></style>
