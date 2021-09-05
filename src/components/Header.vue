<template>
  <div class="bg-gradient-to-r from-blue-800 to-blue-900 p-4">
    <div class="flex text-white justify-between items-center">
      <div>
        <a href="#" class="inline-block">
          <span class="font-mono text-xl block">Otel</span>
          <span class="font-mono text-sm">Rezervasyon Sistemi</span>
        </a>
      </div>
      <div>
        <button
          class="
            bg-white
            hover:bg-blue-500
            text-gray-700
            hover:text-white
            py-1
            px-2
            border border-gray-500
            hover:border-transparent
            rounded
          "
          @click="newReservation"
        >
          Yeni Rezervasyon Yap
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { removeItem } from "@/common/storage.service";
import { HOTEL_STORAGE_KEY, RESERVATION_STORAGE_KEY } from "@/common/config";

export default {
  methods: {
    newReservation() {
      removeItem(HOTEL_STORAGE_KEY);
      removeItem(RESERVATION_STORAGE_KEY);

      window.location.href='/';
    },
  },
};
</script>