<template>
  <div class="container mx-auto">
    <Header />
    <div class="w-3/4 mx-auto mt-10">
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

<style scoped>
  .content {
    width: 600px;
  }
</style>

