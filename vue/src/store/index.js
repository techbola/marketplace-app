import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    listings: [
      {
        id: 1,
        title: "Listing1",
        slug: "listing-1",
        image:
          "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500",
        description: "Description about lisiting 1",
        date_online: "2023-02-18",
        date_offline: "2023-03-18",
        price: "3000",
        currency: "naira",
        mobile: "12345678",
        email: "listing1@test.com",
        category: "Cars",
      },
      {
        id: 2,
        title: "Listing2",
        slug: "listing-2",
        image:
          "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500",
        description: "Description about lisiting 2",
        date_online: "2023-02-18",
        date_offline: "2023-03-18",
        price: "5000",
        currency: "rand",
        mobile: "12345678",
        email: "listing2@test.com",
        category: "Property",
      },
    ],
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then(({ data }) => {
        commit("logout");
        return data;
      });
    },
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
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  modules: {},
});

export default store;
