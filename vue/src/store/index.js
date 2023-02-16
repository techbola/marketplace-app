import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    listings: [],
  },
  getters: {
    allListings: function (state) {
      return state.listings;
    },
  },
  actions: {
    searchListing({ commit }, searchData) {
      return axiosClient
        .get("/listings", {
          params: {
            category: searchData.category,
            search_query: searchData.search_query,
          },
        })
        .then(({ data }) => {
          commit("getListings", data);
          return data;
        });
    },
    getAllListing({ commit }) {
      return axiosClient.get("/listings").then(({ data }) => {
        commit("getListings", data);
        return data;
      });
    },
    createListing({ commit }, listing) {
      return axiosClient.post("/listings", listing).then(({ data }) => {
        commit("createListing", data);
        return data;
      });
    },
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
    createListing: (state, data) => {
      state.listings.push(data.listing);
    },
    getListings: (state, data) => {
      state.listings = data;
    },
  },
  modules: {},
});

export default store;
