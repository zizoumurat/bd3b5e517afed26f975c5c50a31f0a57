import { getItem } from "@/common/storage.service";
import { RESERVATION_STORAGE_KEY } from "@/common/config";
import { FETCH_RESERVATION_FROM_STORAGE } from "./actions.type";
import { RESET_RESERVATION, SET_RESERVATION } from "./mutations.type";

const getDefaultState = () => {
    return {
        reservation: {
            id: '0',
            hotelId: 1,
            hotelName: '',
            roomType: {
                id: 0,
                title: '',
                price: 0,
            },
            roomScenic: {
                id: 0,
                title: '',
                priceRate: 0
            },
            city: '',
            checkIn: '',
            checkOut: '',
            dayCount: 0,
            adultCount: 0,
            childCount: 0,
            cuponCode: '',
            discount: 0,
            totalPrice: 0,
            activeStep: '/'
        }
    }
}

const state = getDefaultState();

const getters = {
    reservation: state => state.reservation
};

const actions = {
    [FETCH_RESERVATION_FROM_STORAGE](context) {
        var reservation = getItem(RESERVATION_STORAGE_KEY);
        if (reservation) {
            context.commit(SET_RESERVATION, JSON.parse(reservation));
        }
    },
};

const mutations = {
    [SET_RESERVATION](state, reservation) {
        state.reservation = reservation;
        state.errors = {};
    },

    [RESET_RESERVATION](state) {
        Object.assign(state, getDefaultState())
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};