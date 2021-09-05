<template>
  <div class="container">
    <Steps />
    <div class="flex flex-col-reverse md:flex-row">
      <div class="w-full p-2 box-border border-gray rounded-md border-2 md:p-10 md:mr-5 md:w-3/5">
        <div class="rounded-xl relative text-black bg-gray-100">
          <div class="px-8 py-10">
            <div class="flex justify-between text-xl">
              <div>
                <span class="font-bold">Credit</span
                ><span class="italic">Card</span>
              </div>
              <div>
                <span class="font-bold">BANK</span>
              </div>
            </div>
            <div class="my-4">
              <i class="fas fa-barcode text-6xl"></i>
            </div>
            <div>
              <p class="font-medium text-2xl mdtext-4xl w-s-10">{{ showCardNumber }}</p>
            </div>
            <div class="my-4">
              <div class="flex justify-between">
                <div>
                  <span class="text-xl">{{ showCardName }}</span>
                  <span class="font-bold block mt-2 text-lg">{{
                    showCardDate
                  }}</span>
                </div>
                <div class="-m-4-px">
                  <div
                    class="
                      rounded-full
                      border-4
                      -mr-9
                      relative
                      z-1
                      border-gray-100
                      w-16
                      h-16
                      bg-red-500
                      inline-block
                    "
                  ></div>
                  <div
                    class="
                      rounded-full
                      border-4 border-gray-100
                      w-16
                      h-16
                      bg-yellow-400
                      inline-block
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-gray-500 border-2 px-8 pt-10 pb-10 mt:pb-20 mt-8 relative">
          <span class="absolute left-3 -top-3.5 bg-white px-3 font-bold"
            >Kredi Kartı Bilgileri</span
          >
          <div>
            <span class="block">Kartın Üzerindeki İsim</span>
            <t-input
              v-model="creditCard.name"
              class="mt-1"
              placeholder="Kartın Üzerindeki İsmi Giriniz"
            />
          </div>
          <div class="my-6">
            <span class="block">Kartın Numarası</span>
            <t-input
              v-model="creditCard.number"
              class="mt-1"
              placeholder="Kart Numarasını Giriniz"
              maxlength="16"
            />
          </div>
          <div class="md:flex md:justify-between">
            <div>
              <span class="block mb-1">Kart Son Kullanma Tarihi</span>
              <div class="grid grid-cols-2 gap-2">
              <div class="inline-block w-32">
                <t-select
                  v-model="creditCard.month"
                  placeholder="Ay"
                  :options="monthOptions()"
                />
              </div>
              <div class="inline-block w-32">
                <t-select
                  v-model="creditCard.year"
                  placeholder="Yıl"
                  :options="yearOptions()"
                />
              </div>
              </div>
            </div>
            <div class="mt-6 md:mt-0">
              <span class="block">CVV</span>
              <t-input
                v-model="creditCard.cvv"
                class="mt-1"
                placeholder="CVV Giriniz"
                maxlength="3"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-2/5">
        <Summary />
      </div>
    </div>
    <Footer
      @saveAndNext="saveAndNext"
      :show-back-button="true"
      next-button-text="Ödeme Yap ve Bitir"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { TInput, TSelect } from "vue-tailwind/dist/components";
import { ReservationService } from "@/common/api.service";
import { saveItem } from "@/common/storage.service";
import { RESERVATION_STORAGE_KEY } from "@/common/config";
import Footer from "@/components/Footer.vue";
import Steps from "@/components/Steps.vue";
import Summary from "@/components/Summary.vue";

export default {
  components: {
    Footer,
    Steps,
    Summary,
    TInput,
    TSelect,
  },

  data() {
    return {
      creditCard: {
        number: "",
        name: "",
        month: "",
        year: "",
        cvv: "",
      },
    };
  },

  methods: {
    ...mapMutations(["setAlert", "clearAlert"]),

    isEmptyString(str) {
      return str.length === 0;
    },

    async saveAndNext() {
      if (
        this.isEmptyString(this.creditCard.name) ||
        this.isEmptyString(this.creditCard.number) ||
        this.isEmptyString(this.creditCard.month) ||
        this.isEmptyString(this.creditCard.year) ||
        this.isEmptyString(this.creditCard.cvv)
      ) {
        this.setAlert({
          message: "Lütfen kredi kartı bilgilerinizi eksiksiz girin",
          type: "error",
        });

        return;
      }

      const payload = (({
        hotelId,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        roomType,
        roomScenic,
        cuponCode,
        totalPrice,
      }) => ({
        hotel_id: Number(hotelId),
        start_date: checkIn,
        end_date: checkOut,
        adult: Number(adultCount),
        child: Number(childCount),
        room_type: roomType.id,
        room_scenic: roomScenic.id,
        price: totalPrice,
        coupon_code: cuponCode,
        card_name: this.creditCard.name,
        card_number: this.creditCard.number,
        card_date_month: this.creditCard.month,
        card_date_year: this.creditCard.year,
        card_cvv: this.creditCard.cvv,
      }))(this.reservation);

      if (this.reservation.id === "0") {
        const { data } = await ReservationService.addReservation(payload);
        this.reservation.id = data.id;
      }

      else if (this.reservation.id !== 0) {
        await ReservationService.updateReservation(this.reservation.id,payload)
      }

      this.reservation.activeStep = "/preview";
      
      this.clearAlert();
      saveItem(RESERVATION_STORAGE_KEY, this.reservation);

      this.$router.push("preview");
    },

    monthOptions() {
      return Array.from({ length: 12 }, (_, i) => i + 1).map((item) =>
        item < 10 ? `0${item}` : item
      );
    },

    yearOptions() {
      const start = new Date().getFullYear();
      return Array(start + 10 - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
  },

  computed: {
    ...mapGetters(["reservation"]),

    showCardNumber() {
      return this.creditCard.number.length > 0
        ? this.creditCard.number.match(/.{1,4}/g).join(" ")
        : "1234 4321 1234 4321";
    },

    showCardName() {
      return this.creditCard.name.length > 0
        ? this.creditCard.name
        : "XXXXXX XXXXXX";
    },

    showCardDate() {
      const month =
        this.creditCard.month.length > 0 ? this.creditCard.month : "XX";
      const year =
        this.creditCard.year.length > 0 ? this.creditCard.year.slice(-2) : "XX";
      return `${month}/${year}`;
    },
  },
};
</script>

<style lang="scss">
.-m-4-px {
  margin-right: -4px;
}
</style>