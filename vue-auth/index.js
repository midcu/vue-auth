import './assets/index.css'
import { LeftMenuPage, TopMenuPage, MainContent, ScrollBar, ThemeBar, Pagination } from './components/index.js'
import registerModule from './store'
import registerDirective from './directive'
import initRouter from './router'
import AuthApi from './api'
import AuthMain from './views/main.js'

const Auth = { };

Auth.install = function (Vue, options) {
    if (!options || !options.router) {
        throw new Error('框架需要vue-router实例！')
    }
    if (!options.loader) {
        throw new Error('框架需要loader实例！')
    }

    if (!options.store) {
        throw new Error('框架需要vuex实例！')
    }

    const store = options.store;

    if (!options.request) {
        throw new Error('框架需要axios！')
    }

    Vue.component(AuthMain.name, AuthMain)
    Vue.component(LeftMenuPage.name, LeftMenuPage)
    Vue.component(TopMenuPage.name, TopMenuPage)
    Vue.component(MainContent.name, MainContent)
    Vue.component(ScrollBar.name, ScrollBar)
    Vue.component(ThemeBar.name, ThemeBar)
    Vue.component(Pagination.name, Pagination)

    AuthApi.init(options.request, options.store)

    registerModule(options.store)

    options.store.commit('SET_CONFIG', options.authConfig)
    // 初始化菜单之后再初始化router
    initRouter(options.router, options.loader, options.store)

    registerDirective(Vue, options.store);

    Vue.prototype.$authApi = AuthApi
    Vue.prototype.$vaCheckPermission = function (value) {
        if (value && value instanceof Array && value.length > 0) {
            const permissions = store.getters && store.getters.permissions
            if (!permissions) {
                return false;
            }
            if (permissions.some(p => value.includes(p))) {
                return true
            }
        }
        return false
    }
}

export default Auth;
