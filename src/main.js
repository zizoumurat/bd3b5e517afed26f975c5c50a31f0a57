import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global.css'
import VueTailwind from 'vue-tailwind'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import TDatepicker from 'vue-tailwind/dist/t-datepicker'
import Turkish from 'vue-tailwind/dist/l10n/tr'
import moment from 'moment';
import ApiService from "./common/api.service";


Vue.config.productionTip = false

const settings = {
  't-datepicker': {
    component: TDatepicker,
    props: {
      locale: Turkish,
    },
  },
}

Vue.use(VueTailwind, settings)
ApiService.init();

moment.locale('tr');

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
