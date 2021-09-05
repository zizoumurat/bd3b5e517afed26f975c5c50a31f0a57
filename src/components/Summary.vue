<template>
  <div
    :class="{ 'p-5 mb-10': isPreviewPage, 'p-2 md:p-10': !isPreviewPage }"
    class="box-border border-gray rounded-md border-2 bg-gray-100"
  >
    <div class="text-xl mb-4">
      <span class="font-bold mr-2">{{ reservation.hotelName }}</span>
      <span>({{ reservation.city }})</span>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="text-center bg-white rounded-lg py-4">
        <span class="block font-semibold">Giriş Tarihi:</span>
        <span>{{ reservation.checkIn }}</span>
      </div>
      <div class="text-center bg-white rounded-lg py-4">
        <span class="block font-semibold">Çıkış Tarihi:</span>
        <span>{{ reservation.checkOut }}</span>
      </div>
      <div class="text-center bg-white rounded-lg py-4">
        <span class="block font-semibold">Yetişkin:</span>
        <span>{{ reservation.adultCount }}</span>
      </div>
      <div class="text-center bg-white rounded-lg py-4">
        <span class="block font-semibold">Çocuk:</span>
        <span>{{ reservation.childCount }}</span>
      </div>
      <div class="text-center bg-white rounded-lg py-4">
        <span class="block font-semibold">Oda Tipi:</span>
        <span>{{ reservation.roomType.title }}</span>
      </div>
      <div class="text-center bg-white rounded-lg py-4">
        <span class="block font-semibold">Manzara:</span>
        <span>{{ reservation.roomScenic.title }}</span>
      </div>
    </div>
    <div v-if="!isPreviewPage" class="mt-4 p-4 bg-white rounded-lg">
      <div class="md:flex">
        <div class="flex-grow mr-2">
          <t-input v-model="cuponCode" placeholder="Kupon Kodu" />
        </div>
        <div>
          <t-button
            :disabled="cuponCode.length < 5"
            class="bg-blue-900 w-full mt-2 md:m-auto md:mt-0"
            text="Kodu Kullan"
            @click="applyCuponCode"
          />
        </div>
      </div>
      <div v-if="cuponCodeErrorMessage.length > 0" class="mt-2 text-red-600">
        {{ cuponCodeErrorMessage }}
      </div>
    </div>
    <div class="bg-white rounded-lg pt-6 pb-8 mt-4">
      <div class="flex justify-between px-4 mb-4">
        <span class="font-bold">Oda Fiyatı</span>
        <span>{{ reservation.roomType.price }} TL</span>
      </div>
      <div class="flex justify-between px-4 mb-4">
        <span class="font-bold">Fiyat Etki Oranı</span>
        <span>%{{ reservation.roomScenic.priceRate }}</span>
      </div>
      <div class="flex justify-between px-4 mb-4">
        <div>
          <span class="font-bold mr-2">Konaklama</span>
          <span>({{ reservation.dayCount }} Gün)</span>
        </div>
        <span>{{ reservation.roomType.price * reservation.dayCount }} TL</span>
      </div>
      <div
        v-if="reservation.cuponCode.length > 0"
        class="flex justify-between px-4 mb-7"
      >
        <div>
          <span class="font-bold mr-2">İndirim</span>
          <span>({{ reservation.cuponCode }})</span>
        </div>
        <span>-{{ reservation.discount }} TL</span>
      </div>
      <hr class="mb-6" />
      <span class="block text-center text-gray-800 font-semibold text-lg"
        >TOPLAM TUTAR</span
      >
      <span class="block text-center text-gray-900 font-semibold text-5xl mt-4"
        >{{ reservation.totalPrice }} TL</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CuponService } from "@/common/api.service";
import { TButton, TInput } from "vue-tailwind/dist/components";
import { saveItem } from "@/common/storage.service";
import { RESERVATION_STORAGE_KEY } from "@/common/config";

export default {
  components: {
    TButton,
    TInput,
  },

  props: {
    isPreviewPage: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      cuponCode: "",
      cuponCodeErrorMessage: "",
    };
  },

  methods: {
    setTotalPrice() {
      const price = this.reservation.roomType.price * this.reservation.dayCount;
      this.reservation.totalPrice = Math.round(
        price +
          (price * this.reservation.roomScenic.priceRate) / 100 -
          this.reservation.discount
      );
    },

    async applyCuponCode() {
      await CuponService.getCupon({ code: this.cuponCode }).then(({ data }) => {
        if (data.length === 0) {
          this.cuponCodeErrorMessage = "Geçersiz kupon kodu!";

          return;
        }

        const cuponCodeData = data[0];

        if (Date.now() > Date.parse(cuponCodeData.expiration_at)) {
          this.cuponCodeErrorMessage = "Kupon kodunun süresi dolmuş!";

          return;
        }

        this.cuponCodeErrorMessage = "";
        this.reservation.cuponCode = cuponCodeData.code;
        this.reservation.discount = cuponCodeData.discount_ammount;

        this.setTotalPrice();
        saveItem(RESERVATION_STORAGE_KEY, this.reservation);
      });
    },
  },

  beforeMount() {
    this.setTotalPrice();
  },

  computed: {
    ...mapGetters(["reservation"]),
  },
};
</script>

<style>
</style>