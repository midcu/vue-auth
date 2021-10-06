export default {
    init (request) {
        this.request = request;
    },
    request: function () {

    },
    InitProject: function () {
        return this.request({
            url: '/init',
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
