import { HotelsService } from "@/common/api.service";
import { FETCH_HOTEL, FETCH_HOTELS, FETCH_HOTEL_FROM_STORAGE } from "./actions.type";
import { SET_HOTEL, SET_HOTELS } from "./mutations.type";
import { saveItem, getItem} from "@/common/storage.service";
import { HOTEL_STORAGE_KEY } from "@/common/config";

const state = {
    errors: {},
    hotels: [],
    hotel: {}
};

const getters = {
    hotels: state => state.hotels,
    hotel: state => state.hotel
};

const actions = {
    [FETCH_HOTELS](context) {
        return HotelsService.get()
            .then(({ data }) => {
                context.commit(SET_HOTELS, data);
                return data;
            })
            .catch(() => {
            });
    },
    [FETCH_HOTEL](context, id) {
        return HotelsService.hotelDetail({ id })
            .then(({ data }) => {
                saveItem(HOTEL_STORAGE_KEY, data.length > 0 ? data[0] : {})
                context.commit(SET_HOTEL, data.length > 0 ? data[0] : {});
                return data;
            })
            .catch(() => {
            });
    },
    [FETCH_HOTEL_FROM_STORAGE](context) {
        var hotel = getItem(HOTEL_STORAGE_KEY);
        if (hotel) {
            context.commit(SET_HOTEL, JSON.parse(hotel));
        }
    },
};

const mutations = {
    [SET_HOTELS](state, hotels) {
        state.hotels = hotels;
        state.errors = {};
    },
    [SET_HOTEL](state, data) {
        state.hotel = data;
        state.errors = {};
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};