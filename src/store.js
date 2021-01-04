import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {
			data: null
		}
	},
	getters: {
		user (state) {
			return state.user
		}
	},
	mutations: {
		setUser (state, data) {
			state.user.data = data
		}
	},
	actions: {
		fetchUser ({ commit }, user) {
			if (user) {
				commit('setUser', {
					displayName: user.displayName,
					email: user.email,
					uid: user.uid
				})
			} else {
				commit('setUser', null)
			}
		}
	}
})
