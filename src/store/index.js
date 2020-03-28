import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    url: 'https://seguprev.glitch.me',
    events: [],
    resources: []
  },
  mutations: {
    addEvents: function(state, events) {
      state.events = events;
    },
    addResources: function(state, resources) {
      state.resources = resources;
    }
  },
  actions: {
    addEvents_action: function({commit}, events) {
      commit('addEvents', events);
    },
    addResources_action: function({commit}, res) {
      commit('addResources', res);
    }
  },
  getters: {
    getUrl: function(state) {
      return state.url;
    },
    getResources: function(state) {
      return state.resources;
    },
    getEvents: function(state) {
      return state.events;
    }
  }
});
