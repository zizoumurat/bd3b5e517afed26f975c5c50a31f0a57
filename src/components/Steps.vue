<template>
  <div class="box-border bg-gray-100 border-gray rounded-md border-2 py-5 mb-5">
    <div class="flex-none md:flex items-center justify-items-center">
      <step
        v-for="(step, index) in this.steps"
        :key="index"
        :text="step.Text"
        :icon="step.Icon"
        :path="step.Path"
        :showLeftLine="step.ShowLeftLine"
        :showRightLine="step.ShowRightLine"
      />
    </div>
  </div>
</template>

<script>
import Step from "./Step.vue";

export default {
  components: {
    Step,
  },
  data: function () {
    return {
      steps: [
        {
          Text: "Otel ve Tarih Seçimi",
          Icon: "far fa-calendar-alt",
          ShowRightLine: true,
          ShowLeftLine: false,
          Path: "/",
        },
        {
          Text: "Oda Tipi ve Manzara Seçimi",
          Icon: "fa fa-bed",
          ShowRightLine: true,
          ShowLeftLine: true,
          Path: "/choose-room",
        },
        {
          Text: "Önizleme ve Ödeme İşlemleri",
          Icon: "far fa-credit-card",
          ShowRightLine: false,
          ShowLeftLine: true,
          Path: "/payment",
        },
      ],
    };
  },
};
</script>

<style>
</style>