<template>
  <div
    :class="{
      'border-green-400': id === activeId,
      'border-gray': id === activeId,
    }"
    class="cursor-pointer hover:border-green-300 rounded-md border-2 px-5 py-4"
    @click="selected"
  >
    <span class="block font-semibold">{{ title }}</span>
    <img class="my-2" :src="photo" :alt="title" />
    <div class="flex justify-between">
      <div>
        <span class="block leading-3">{{ label }}</span>
        <span v-if="secondaryLabel.length > 0">{{ secondaryLabel }}</span>
      </div>
      <div>
        <span class="font-semibold text-xl">{{ labelValue }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: true,
    },
    activeId: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      require: true,
    },
    labelValue: {
      type: [String, Number],
      require: true,
    },
    secondaryLabel: {
      type: String,
      default: "",
    },
  },

  methods: {
    selected() {
      this.$emit("selected", this.id);
    },
  },
};
</script>

<style>
</style>