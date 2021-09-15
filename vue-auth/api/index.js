export default {
    requestInter: null,
    responseInter: null,
    init (request, store) {
        this.request = request;

        this.requestInter = request.interceptors.request.use(function (config) {
            config.headers.Authorization = 'Bearer ' + store.state.user.token;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // Todo
        // 获取菜单应该永远返回403或者200 不管登陆或着没登录
        // 支持匿名用户 如果没有登录 1：返回403禁止访问 2：返回200，返回匿名的菜单 （token过期也应该返回匿名的菜单或者403）

        this.responseInter = request.interceptors.response.use(function (response) {
            return response.data;
        }, function (error) {
            if (error.response.status === 403) {
                // 403代表token过期和未登录禁止访问
                // 401代表无权限访问
                // 403则清空登录凭据  然后
                store.commit('USER_LOGOUT');
            } else {
                // Message({ message: res.message, type: 'error', center: true, duration: 5 * 1000 });
            }
            return Promise.reject(error);
        });
    },
    ejectInterceptors () {
        this.request.interceptors.request.eject(this.requestInter);
        this.request.interceptors.response.eject(this.responseInter);
    },
    request: function () {

    },
    InitProject: function () {
        return this.request({
            url: '/users/init',
            method: 'get'
        })
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
    LoginIn: function (data) {
        return this.request({
            url: '/login',
            method: 'post',
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
            url: '/menus/list/all',
            method: 'get'
        })
    },
    GetMenus: function () {
        return this.request({
            url: '/menus/list',
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
