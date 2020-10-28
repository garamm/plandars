import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		year: "",
		month: "",
		date: ""
	},
	mutations: {
		setDate (state, payload) {
			state.year = payload.year;
			state.month = payload.month;
			state.date = payload.date;
		}
	}
})