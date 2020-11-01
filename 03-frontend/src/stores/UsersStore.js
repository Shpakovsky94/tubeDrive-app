import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        users: []
    },
    actions: {
        async searchUsersByName({ commit }, data) {
            commit('set', { type: "users", value: [] })
            let response = await Vue.http.post('search', {query: {name: data}})
            commit('set', { type: "users", value:response.body.results })
        }
    },
    mutations: {
        set(state, { type, value }) {
            state[type] = value
        }
    }
}
