const menu = {
    state: {
        menus: undefined,
        constantRoutes: undefined
    },
    getters: {
        menus: state => state.menus,
        hasMenus: state => state.menus
    },
    mutations: {
        'SET_MENUS' (state, menus) {
            state.menus = menus;
        },
        'PUSH_CONSTANT_ROUTES' (state, routes) {
            state.constantRoutes ? state.constantRoutes.push(...routes) : (state.constantRoutes = routes)
        }
    }
}
export default menu;
