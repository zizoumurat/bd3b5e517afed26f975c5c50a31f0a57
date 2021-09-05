<template>
  <div class="container">
    <div
      class="box-borde border-gray rounded-md border-2 p-10 mb-4 text-center"
    >
      <div class="max-w-2xl mx-auto">
        <div class="text-success text-8xl">
          <i class="far fa-calendar-check"></i>
        </div>
        <div class="mt-6 mb-4">
          <span class="text-gray-500 text-xl font-semibold"
            >Rezervasyon kaydınız alınmıştır.</span
          >
        </div>
        <div class="mb-8">
          <span class="text-gray-500 text-lg font-semibold">
            Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda
            değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri
            kullanabilirsiniz.
          </span>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <t-button
              class="bg-blue-900 w-full"
              text="Yeni Rezervasyon Yap"
              @click="newReservation"
            />
          </div>
          <div>
            <t-button
              class="bg-blue-900 w-full"
              text="Rezervasyonu Güncelle"
              @click="updateReservation"
            />
          </div>
          <div>
            <t-button
              class="bg-blue-900 w-full"
              text="Rezervasyonu İptal Et"
              @click="deleteReservation"
            />
          </div>
        </div>
      </div>
    </div>
    <Summary :is-preview-page="true" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { TButton } from "vue-tailwind/dist/components";
import { ReservationService } from "@/common/api.service";
import { removeItem } from "@/common/storage.service";
import { HOTEL_STORAGE_KEY, RESERVATION_STORAGE_KEY } from "@/common/config";
import Summary from "@/components/Summary.vue";

export default {
  components: {
    Summary,
    TButton,
  },

  methods: {
    ...mapMutations(["resetReservation"]),

    async deleteReservation() {
      await ReservationService.deleteReservation(this.reservation.id).then();
      this.resetReservation();
      removeItem(HOTEL_STORAGE_KEY);
      removeItem(RESERVATION_STORAGE_KEY);
      this.$router.push("/");
    },

    newReservation() {
      this.resetReservation();
      removeItem(HOTEL_STORAGE_KEY);
      removeItem(RESERVATION_STORAGE_KEY);

      this.$router.push("/");
    },

    updateReservation() {
      this.$router.push("/");
    }
  },

  computed: {
    ...mapGetters(["reservation"]),
  },
};
</script>

<style>
</style>