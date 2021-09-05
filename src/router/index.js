import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import ChooseRoom from '../views/ChooseRoom.vue'
import Payment from '../views/Payment.vue'
import Preview from '../views/Preview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/choose-room',
    name: 'ChooseRoom',
    component: ChooseRoom
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview
  }
]



const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})

router.beforeEach((to, from, next) => {
  store.dispatch("fetchReservationFromStorage");
  store.dispatch("fetchHotelFromStorage");
  const reservation = store.getters.reservation;
  const activeStepIndex = routes.findIndex(route => route.path === reservation.activeStep);
  const routeStepIndex = routes.findIndex(route => route.path === to.path)
  if (routeStepIndex > activeStepIndex) next(reservation.activeStep)
  else next()
})

export default router
