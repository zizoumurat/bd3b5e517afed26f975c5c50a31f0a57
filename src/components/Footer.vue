<template>
<div>
  <alert />
  <div class="box-border bg-gray-100 border-gray rounded-md border-2 p-10 mt-5 mb-5">
    <div
      :class="{
        'justify-between': showBackButton,
        'justify-end': !showBackButton,
      }"
      class="flex"
    >
      <t-button v-if="showBackButton" @click="back" text="<< Geri" />
      <t-button @click="saveAndNext" :text="nextText" />
    </div>
  </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { TButton } from "vue-tailwind/dist/components";
import Alert from "./Alert.vue";


export default {
  components: {
    Alert,
    TButton,
  },

  props: {
    showBackButton: {
      type: Boolean,
      default: false,
    },

    nextButtonText: {
      type: String,
      default :''
    }
  },

  methods: {
      ...mapMutations(["clearAlert"]),

    saveAndNext() {
      this.$emit("saveAndNext");
    },

    back() {
      this.clearAlert();
      this.$router.back();
    },
  },

  computed: {
    nextText () {
      return this.nextButtonText.length > 0 ? this.nextButtonText : 'Kaydet ve Devam Et';
    }
  }
};
</script>

<style>
</style>