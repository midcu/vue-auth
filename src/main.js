import Vue from 'vue'
import router from './router'
import store from './store'
import Auth from '../vue-auth'
import request from './api'
import './plugins/element-ui'

Vue.config.productionTip = false

const loader = (name) => import('./views/' + name)

Vue.use(Auth, { router, loader: loader, store, request, authConfig: {} })

new Vue({
    router,
    store,
    render: (h) => h('va-main')
}).$mount('#app')
