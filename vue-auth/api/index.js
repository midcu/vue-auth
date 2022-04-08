import { BuildMenus } from '../built-menus.js'

export default {
    init (request) {
        this.request = request;
    },
    request: function () {

    },
    InitProject: function (router, store, loader, platformId) {
        return new Promise((resolve, reject) => {
            this.request({ url: '/init/' + platformId, method: 'get' }).then(({ menus, user, permissions }) => {
                // 构建菜单
                const routerMenus = BuildMenus(menus, loader);

                // 第一个可展示的菜单配置为首页
                const firstChild = routerMenus.find(i => i.meta.display);
                if (firstChild) {
                    router.addRoute({ path: '', redirect: firstChild.path });
                }

                for (const i of routerMenus) {
                    router.addRoute(i);
                }

                store.commit('SET_MENUS', routerMenus || []);
                store.commit('SET_PERMISSIONS', permissions || []);
                store.commit('USER_LOGIN', user);

                resolve();
            }).catch(() => {
                reject(new Error("请求出错"));
            })
        });
    },
    GetRoleMenuIds: function (id) {
        return this.request({
            url: '/roles/menus/' + id,
            method: 'get'
        })
    },
    GetRolePermissionIds: function (id) {
        return this.request({
            url: '/roles/permissions/' + id,
            method: 'get'
        })
    },
    ResetRoleMenus: function (id, data) {
        return this.request({
            url: '/roles/menus/' + id,
            data: data,
            method: 'post'
        })
    },
    ResetRolePermissions: function (id, data) {
        return this.request({
            url: '/roles/permissions/' + id,
            data: data,
            method: 'post'
        })
    },
    Login: function (data) {
        return this.request({
            url: '/login',
            method: 'post',
            data: data
        })
    },
    Logout: function () {
        return this.request({
            url: '/logout',
            method: 'get'
        })
    },
    FormLogin: function (data) {
        return this.request({
            url: '/login',
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            data: data
        })
    },
    GetUserInfo: function () {
        return this.request({
            url: '/userinfo',
            method: 'get'
        })
    },
    GetAllMenus: function () {
        return this.request({
            url: '/menus/lite',
            method: 'get'
        })
    },
    GetMenus: function (params) {
        return this.request({
            url: '/menus/list',
            params,
            method: 'get'
        })
    },
    AddMenu: function (menu) {
        return this.request({
            url: '/menus',
            data: menu,
            method: 'post'
        })
    },
    EditMenu: function (id, menu) {
        return this.request({
            url: '/menus/' + id,
            data: menu,
            method: 'put'
        })
    },
    DelMenu: function (id) {
        return this.request({
            url: '/menus/' + id,
            method: 'delete'
        })
    },
    GetMenu: function (menu) {
        return this.request({
            url: '/menus',
            data: menu,
            method: 'get'
        })
    },
    /* --------------roles------------  */
    GetAllRoles: function (params) {
        return this.request({
            url: '/roles/list',
            params: params,
            method: 'get'
        })
    },
    AddRole: function (role) {
        return this.request({
            url: '/roles',
            data: role,
            method: 'post'
        })
    },
    EditRole: function (id, role) {
        return this.request({
            url: '/roles/' + id,
            data: role,
            method: 'put'
        })
    },
    DelRole: function (id) {
        return this.request({
            url: '/roles/' + id,
            method: 'delete'
        })
    },
    GetRole: function (role) {
        return this.request({
            url: '/roles',
            data: role,
            method: 'get'
        })
    },
    /* --------------users------------  */
    GetAllUsers: function (params) {
        return this.request({
            url: '/users/list',
            params: params,
            method: 'get'
        })
    },
    AddUser: function (data) {
        return this.request({
            url: '/users',
            data: data,
            method: 'post'
        })
    },
    EditUser: function (id, data) {
        return this.request({
            url: '/users/' + id,
            data: data,
            method: 'put'
        })
    },
    DelUser: function (id) {
        return this.request({
            url: '/users/' + id,
            method: 'delete'
        })
    },
    GetUser: function (data) {
        return this.request({
            url: '/users',
            data: data,
            method: 'get'
        })
    },
    getUserRoles: function (id) {
        return this.request({
            url: '/users/roles/' + id
        })
    },
    resetUserRoles: function (id, roleIds) {
        return this.request({
            url: '/users/roles/' + id,
            data: roleIds,
            method: 'post'
        })
    },
    /* --------------permissions------------  */
    GetAllPermissions: function (params) {
        return this.request({
            url: '/permissions/list',
            params: params,
            method: 'get'
        })
    },
    AddPermission: function (data) {
        return this.request({
            url: '/permissions',
            data: data,
            method: 'post'
        })
    },
    EditPermission: function (id, data) {
        return this.request({
            url: '/permissions/' + id,
            data: data,
            method: 'put'
        })
    },
    DelPermission: function (id) {
        return this.request({
            url: '/permissions/' + id,
            method: 'delete'
        })
    },
    GetPermission: function (data) {
        return this.request({
            url: '/permissions',
            data: data,
            method: 'get'
        })
    }
}
