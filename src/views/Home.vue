<template>
  <div class="container">
    <Steps />
    <div class="box-borde border-gray rounded-md border-2 p-10">
      <t-rich-select
        v-model="reservation.hotelId"
        placeholder="Rezervasyon yapmak istediğiniz oteli seçiniz"
        class="w-full"
        :options="hotelList"
        @change="hotelSelected"
      >
      </t-rich-select>
      <div class="grid grid-cols-1 md:grid-cols-4 mt-4 border-black border-2">
        <div class="p-5 md:border-r-2 border-black">
          <span class="mb-2 block text-black font-semibold">Giriş Tarihi</span>
          <t-datepicker
            v-model="reservation.checkIn"
            class="border-black border-2 rounded"
            :clearable="false"
            :date-formatter="dateFormatter"
            :date-parser="dateParser"
            :min-date="now"
            @change="changedCheckIn"
            date-format="DD/MM/YYYY"
            user-format="L"
          />
        </div>
        <div class="p-5 border-r-2 md:border-black">
          <span class="mb-2 block text-black font-semibold">Çıkış Tarihi</span>
          <t-datepicker
            v-model="reservation.checkOut"
            class="border-black border-2 rounded"
            :clearable="false"
            :date-formatter="dateFormatter"
            :date-parser="dateParser"
            :min-date="minCheckOut"
            date-format="DD/MM/YYYY"
            user-format="L"
          />
        </div>
        <div class="p-5 border-r-2 md:border-black">
          <span class="mb-2 block text-black font-semibold"
            >Yetişkin Sayısı</span
          >
          <t-input
            type="Number"
            v-model="reservation.adultCount"
            :min="0"
            :max="maxAdultCount"
            @input="changeAdultCount"
          />
        </div>
        <div class="p-5 relative">
          <span class="mb-2 block text-black font-semibold">Çocuk Sayısı</span>
          <t-input
            type="Number"
            v-model="reservation.childCount"
            :min="0"
            :max="5"
            :disabled="
              hotel && Object.keys(hotel).length > 0 && !hotel.child_status
            "
            @input="changeChildCount"
          />
          <span
            v-if="hotel && Object.keys(hotel).length > 0 && !hotel.child_status"
            class="
              absolute
              left-0
              right-0
              text-center
              bottom-0
              text-red-500 text-sm
              font-semi-bold
            "
            >Çocuk Ziyaretçi Kabul Edilmemektedir !</span
          >
        </div>
      </div>
    </div>
    <Footer @saveAndNext="saveAndNext" />
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { TRichSelect, TInput } from "vue-tailwind/dist/components";
import { saveItem } from "@/common/storage.service";
import { RESERVATION_STORAGE_KEY } from "@/common/config";
import Footer from "@/components/Footer.vue";
import Steps from "@/components/Steps.vue";

const dateFormat = "DD/MM/YYYY";

export default {
  components: {
    Footer,
    Steps,
    TRichSelect,
    TInput,
  },

  data() {
    return {
      now: moment(Date.now()).format(dateFormat),
      minCheckIn: moment(Date.now()).format(dateFormat),
      minCheckOut: moment(Date.now()).format(dateFormat),
      isFirst: true,
    };
  },

  methods: {
    ...mapActions(["fetchHotel", "fetchHotels"]),
    ...mapMutations(["setAlert", "clearAlert", "resetReservation"]),

    dateFormatter(date, format) {
      return moment(date).format(format);
    },

    dateParser(date, format) {
      return moment(date, format).toDate();
    },

    initDates() {
      this.isFirst = this.reservation.checkIn.length === 0;
      this.reservation.checkIn =
        this.reservation.checkIn.length === 0
          ? moment(new Date()).format(dateFormat)
          : this.reservation.checkIn;
      this.reservation.checkOut =
        this.reservation.checkOut.length === 0
          ? moment(new Date()).format(dateFormat)
          : this.reservation.checkOut;
      this.setCheckout();
    },

    changedCheckIn() {
      this.isFirst = true;
      this.setCheckout();
    },

    setCheckout() {
      const date = this.stringToDate(this.reservation.checkIn);
      const addedDayDate = date;
      addedDayDate.setDate(date.getDate() + 1);
      this.minCheckOut = moment(addedDayDate).format(dateFormat);
      if (this.isFirst)
        this.reservation.checkOut = moment(addedDayDate).format(dateFormat);
    },

    stringToDate(strDate) {
      const arr = strDate.split("/");
      return new Date(arr[2] + "-" + arr[1] + "-" + arr[0]);
    },

    async hotelSelected(id) {
      this.resetReservation();
      this.reservation.hotelId = id;
      this.initDates();
      const selectedHotel = this.hotels.find((hotel) => hotel.id === id);
      this.reservation.hotelName = selectedHotel
        ? selectedHotel.hotel_name
        : "";
      await this.fetchHotel(this.reservation.hotelId);
      this.reservation.city = this.hotel.city;
    },

    saveAndNext() {
      if (this.reservation.hotelId === 0) {
        this.setAlert({
          message: "Lütfen otel seçiminizi yapın",
          type: "error",
        });

        return;
      }

      if (this.reservation.adultCount === 0) {
        this.setAlert({
          message: "Lütfen yetişkin sayısını belirtin",
          type: "error",
        });

        return;
      }

      const checkInDate = this.stringToDate(this.reservation.checkIn);
      const checkOutDate = this.stringToDate(this.reservation.checkOut);
      const timeSpan = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      var dayCount = Math.ceil(timeSpan / (1000 * 3600 * 24));
      this.reservation.dayCount = dayCount;
      this.reservation.activeStep = "/choose-room";
      saveItem(RESERVATION_STORAGE_KEY, this.reservation);
      this.clearAlert();
      this.$router.push("choose-room");
    },

    changeAdultCount(val) {
      if (val > this.maxAdultCount) {
        this.reservation.adultCount = this.maxAdultCount;
      }
    },

    changeChildCount(val) {
      if (val > 5) {
        this.reservation.childCount = 5;
      }
    },
  },

  async beforeMount() {
    this.initDates();
    await this.fetchHotels();
  },

  computed: {
    ...mapGetters(["hotels", "hotel", "reservation"]),

    hotelList() {
      return this.hotels.map((hotel) => ({
        value: hotel.id,
        text: hotel.hotel_name,
      }));
    },

    maxAdultCount() {
      return this.hotel.max_adult_size ? this.hotel.max_adult_size : 5;
    },
  },
};
</script>

<style>
</style>
