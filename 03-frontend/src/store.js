import Vue from 'vue'
import Vuex from 'vuex'

import UsersStore from './stores/UsersStore'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		UsersStore
	}
})

export default store
