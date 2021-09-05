<template>
  <div class="container mx-auto">
    <Header />
    <div class="w-full px-4 mx-auto mt-10 md:w-3/4 md:px-0">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

