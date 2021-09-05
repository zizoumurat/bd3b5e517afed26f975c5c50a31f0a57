<template>
  <div class="flex-grow text-center">
    <div class="relative">
      <div
        class="
          flex
          rounded-full
          bg-white
          justify-center
          font-mono
          items-center
          mx-auto
          border-2
          relative
          z-10
          w-20
          h-20
        "
        :class="'border-' + className"
      >
        <i :class="['text-' + className, icon]" class="text-2xl"></i>
      </div>
      <div
        v-if="showRightLine"
        class="absolute top-1/2 right-0 h-px w-1/2 bg-gray-300"
      ></div>
      <div
        v-if="showLeftLine"
        class="absolute top-1/2 left-0 h-px w-1/2 bg-gray-300"
      ></div>
    </div>
    <span
      class="block text-center font-semibold leading-5 mt-4"
      :class="'text-' + className"
    >
      {{ textWithOutLastWord }}
      <br />
      {{ text.split(" ").slice(-1).join(" ") }}
      <br />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    showLeftLine: {
      type: Boolean,
      default: false,
    },
    showRightLine: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
  },

  computed: {
    textWithOutLastWord() {
      let arr = this.text.split(" ");
      arr.pop();
      return arr.join(" ");
    },

    className() {
      return this.path === this.$route.path ? "black" : "gray-300";
    },
  },
};
</script>

<style>
</style>