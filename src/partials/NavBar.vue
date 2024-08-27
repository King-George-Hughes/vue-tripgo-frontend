<script setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Trips",
    url: "/trips",
  },
  {
    name: "Terms and Conditions",
    url: "/terms-and-conditions",
  },
];

const isActiveLink = (routePath) => {
  return route.path === routePath;
};
</script>

<template>
  <header
    class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-4"
  >
    <nav
      class="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-8 mx-auto"
      aria-label="Global"
    >
      <div class="md:col-span-3">
        <!-- Logo -->
        <RouterLink
          class="flex-none rounded-xl text-xl text-primary_color inline-block font-semibold focus:outline-none focus:opacity-80"
          to="/"
          aria-label="Preline"
        >
          LOGO
        </RouterLink>
        <!-- End Logo -->
      </div>

      <!-- Button Group -->
      <div
        class="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3"
      >
        <button
          type="button"
          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-transparent bg-primary_color text-gray-50 hover:bg-secondary_color transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-secondary_color"
        >
          Sign in
        </button>

        <div class="md:hidden">
          <button
            type="button"
            class="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-md border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
            data-hs-collapse="#navbar-collapse-with-animation"
            aria-controls="navbar-collapse-with-animation"
            aria-label="Toggle navigation"
          >
            <svg
              class="hs-collapse-open:hidden flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              class="hs-collapse-open:block hidden flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
      <!-- End Button Group -->

      <!-- Collapse -->
      <div
        id="navbar-collapse-with-animation"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
      >
        <div
          class="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0"
        >
          <div v-for="(link, index) in links" :key="index">
            <RouterLink
              :class="`${
                isActiveLink(link.url) ? 'before:bg-secondary_color' : ''
              } relative inline-block text-black before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1  dark:text-white`"
              :to="link.url"
              aria-current="page"
              >{{ link.name }}</RouterLink
            >
          </div>
        </div>
      </div>
      <!-- End Collapse -->
    </nav>
  </header>
</template>

<style scoped></style>
