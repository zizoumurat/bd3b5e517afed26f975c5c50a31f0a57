<template>
  <div class="container">
    <Steps />
    <div class="box-borde border-gray bg-gray-100 rounded-md border-2 p-10">
      <div>
        <span class="font-bold text-lg mr-2">{{ reservation.hotelName }}</span>
        <span>({{ reservation.city }})</span>
      </div>
      <div class="mt-2">
        <span class="font-semibold">Giriş Tarihi: </span>
        <span>{{ reservation.checkIn }}</span>
        <div class="block mt-2 md:inline-block md:mt-0"><span class="hidden md:block md:mx-1">-</span></div>
        <span class="font-semibold">Çıkış Tarihi: </span>
        <span>{{ reservation.checkOut }}</span>
        <div class="block mt-2 md:inline-block md:mt-0"><span class="hidden md:block md:mx-1">-</span></div>
        <span class="font-semibold">Yetişkin: </span>
        <span>{{ reservation.adultCount }}</span>
        <span class="mx-1">-</span>
        <span class="font-semibold">Çocuk: </span>
        <span>{{ reservation.childCount }}</span>
      </div>
    </div>
    <div class="mt-5 mb-4">
      <span class="font-semibold text-lg mb-2 block">Oda Tipi Seçimi</span>
      <hr />
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <room-detail
        v-for="(roomType, index) in roomTypes"
        :id="roomType.id"
        :title="roomType.title"
        :photo="roomType.photo"
        :label="`${reservation.dayCount} Gün`"
        :secondary-label="`${reservation.adultCount} Yetişkin`"
        :label-value="`${roomType.price} TL`"
        :active-id="reservation.roomType.id"
        :key="`roomType-${index}`"
        @selected="selectedRoomType"
      />
    </div>
    <div class="mt-5 mb-4">
      <span class="font-semibold text-lg mb-2 block">Manzara Seçimi</span>
      <hr />
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <room-detail
        v-for="(roomScenic, index) in roomScenics"
        :id="roomScenic.id"
        :title="roomScenic.title"
        :photo="roomScenic.photo"
        label="Fiyat Etki Oranı"
        :label-value="`+ ${roomScenic.price_rate} %`"
        :active-id="reservation.roomScenic.id"
        :key="`roomScenic-${index}`"
        @selected="selectedRoomScenic"
      />
    </div>
    <Footer @saveAndNext="saveAndNext" :show-back-button="true" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Footer from "@/components/Footer.vue";
import Steps from "@/components/Steps.vue";
import RoomDetail from "@/components/RoomDetail.vue";
import { saveItem } from "@/common/storage.service";
import { RESERVATION_STORAGE_KEY } from "@/common/config";

export default {
  components: {
    Footer,
    Steps,
    RoomDetail,
  },

  methods: {
    ...mapMutations(["setAlert", "clearAlert"]),

    selectedRoomType(id) {
      this.reservation.roomType = (({ id, title, price }) => ({
        id,
        title,
        price,
      }))(this.roomTypes.find((room) => room.id === id));
    },

    selectedRoomScenic(id) {
      this.reservation.roomScenic = (({ id, title, price_rate }) => ({
        id,
        title,
        priceRate: price_rate,
      }))(this.roomScenics.find((room) => room.id === id));
    },

    saveAndNext() {
      if (this.reservation.roomType.id === 0) {
        this.setAlert({
          message: "Lütfen oda tipi seçiminizi yapın",
          type: "error",
        });

        return;
      }

      if (this.reservation.roomScenic.id === 0) {
        this.setAlert({
          message: "Lütfen manzara seçiminizi yapın",
          type: "error",
        });

        return;
      }

      this.reservation.activeStep = "/payment";
      saveItem(RESERVATION_STORAGE_KEY, this.reservation);
      this.clearAlert();
      this.$router.push("payment");
    },
  },

  computed: {
    ...mapGetters(["hotel", "reservation"]),

    roomTypes() {
      return this.hotel.room_type;
    },

    roomScenics() {
      return this.hotel.room_scenic;
    },
  },
};
</script>

<style>
</style>