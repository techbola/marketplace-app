import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN")
        },
        listings: [
            {
                id: 1,
                title: 'Listing1',
                slug: 'listing-1',
                image: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500',
                description: 'Description about lisiting 1'
            },
            {
                id: 2,
                title: 'Listing2',
                slug: 'listing-2',
                image: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500',
                description: 'Description about lisiting 2'
            }
        ]
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return axiosClient.post('/register', user)
            .then(({ data }) => {
                commit("setUser", data);
                return data;
            })
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
            .then(({ data }) => {
                commit("setUser", data);
                return data;
            })
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
            .then(({ data }) => {
                commit("logout");
                return data;
            })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("TOKEN", userData.token)
        }
    },
    modules: {},
})

export default store;