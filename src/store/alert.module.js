import { SET_ALERT, CLEAR_ALERT } from "./mutations.type";

const state = {
    alert: {
        message: '',
        type: ''
    }
};

const getters = {
    alert: state => state.alert
};

const mutations = {
    [SET_ALERT](state, alert) {
        state.alert = alert;
    },

    [CLEAR_ALERT](state) {
        state.alert = {message: '', type: ''};
    }
};

export default {
    state,
    mutations,
    getters
};