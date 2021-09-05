import Vue from "vue";
import Vuex from "vuex";

import alert from "./alert.module";
import hotels from "./hotels.module";
import reservation from "./reservation.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    hotels,
    reservation
  }
});