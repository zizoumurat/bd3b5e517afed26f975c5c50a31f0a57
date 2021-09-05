import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },


  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export const ReservationService = {
  addReservation(payload) {
    return ApiService.post("hotel-bookings", payload);
  },

  updateReservation(id, payload) {
    return ApiService.put(`hotel-bookings/${id}`, payload);
  },
  
  deleteReservation(id) {
    return ApiService.delete(`hotel-bookings/${id}`);
  }
};


export const HotelsService = {
  get() {
    return ApiService.get("hotels");
  },

  hotelDetail(params) {
    return ApiService.query("hotel-details", {
      params
    });
  }
};

export const CuponService = {
  getCupon(params) {
    return ApiService.query("coupons", {
      params
    });
  },
};

export default ApiService;
