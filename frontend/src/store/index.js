import { createStore } from "vuex";
import axios from "axios";
import { server } from "../helper";

export default createStore({
  state: {
    authenticated: false,
    user: {},
    users: [],
    concert: {},
    concerts: [],
    userConcerts: {},
    searchResults: {},
  },
  mutations: {
    SET_AUTHENTICATION(state, status) {
      state.authenticated = status;
    },
    SET_USER(state, status) {
      state.user = status;
    },
    GET_USERS(state, status) {
      state.users = status;
    },
    GET_CONCERTS(state, status) {
      state.concerts = status;
    },
    GET_CONCERTS_BY_USER(state, status) {
      state.userConcerts = status;
    },
    GET_SEARCH_RESULTS(state, status) {
      state.searchResults = status;
    },
  },

  actions: {
    logout({ commit }, state) {},

    async getAllUsers({ commit }) {
      const reponse = await axios.get(`${server.baseURL}/user/all`);
      commit("GET_USERS", reponse.data);
    },
    async getAllConcerts({ commit }) {
      const response = await axios.get(`${server.baseURL}/concerts`);
      commit("GET_CONCERTS", response.data);
    },

    async getConcertsByUsers({ commit }) {
      const response = await axios.get(
        `${server.baseURL}/user/concerts/${this.state.user.id}`
      );
      commit("GET_CONCERTS_BY_USER", response.data);
    },
    async getSearchConcerts({ commit }, res) {
      const response = await axios.post(`${server.baseURL}/concerts/search`, {
        search: res,
      });
      commit("GET_SEARCH_RESULTS", response.data);
    },
  },
  getters: {
    getAllUsersCount: (state) => {
      return state.users.length;
    },
    getAdminsCount: (state) => {
      return state.users.filter((user) => user.admin === true).length;
    },
    // getUsersCount: (state) => {
    //   return state.users.filter((user) => user.admin === false).length;
    // },
    getAllConcertsCount: (state) => {
      return state.concerts.length;
    },
    getUsersCount: (state) => {
      return state.users.filter((user) => user.admin === false).length;
    },
    getConcertsSearch: (state) => (search) => {
      console.log(search);
    },
  },
  modules: {},
});
