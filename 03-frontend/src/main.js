import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
import store from './store'

Vue.use(VueResource)

import apiConfig from './config/apiConfig'

Vue.http.options.root = apiConfig.url

Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
