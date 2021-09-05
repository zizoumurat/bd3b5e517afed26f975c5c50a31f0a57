<template>
  <div
    v-if="alert.message.length > 0"
    :class="{ 'bg-red-100 border-red-500': alert.type === 'error', 'bg-green-50 border-green-500': alert.type === 'success' }"
    class="rounded p-4 flex text-sm border-l-4 mt-4"
  >
    <div
      :class="{ 'text-red-700': alert.type === 'error', 'text-green-700': alert.type === 'success' }"
      class="flex-grow text-lg"
    >
      <i class="fas fa-exclamation-circle"></i>
      {{ alert.message }}
    </div>
    <button
      type="button"
      :class="{ 'text-red-700 hover:text-red-500': alert.type === 'error', 'text-green-700 hover:text-green-500': alert.type === 'success' }"
      class="ml-4 rounded"
      @click="closeAlert"
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      alertOpen: true,
    };
  },

  methods: {
      ...mapMutations(["setAlert", "clearAlert"]),

    closeAlert: function () {
      this.clearAlert();
    },
  },

  computed: {
    ...mapGetters(["alert"]),
  },
};
</script>