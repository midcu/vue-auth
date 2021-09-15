module.exports = {
    path: {
        logoUrl: '',
        httpUrl: '',
        themeUrl: ''
    },
    name: {
        headerName: '管理系统'
    },
    layout: {
        layoutName: 'va-left-menu-page'
    },
    animation: {
        routerAnimation: ''
    },
    routes: [
        {
            id: 'login',
            path: 'login',
            name: 'login',
            title: '登录页面',
            type: 1,
            icon: '',
            description: '登录页面',
            layout: '',
            sort: 1,
            pid: '',
            withoutLogin: true,
            component: 'login',
            remark: ''
        },
        {
            id: '404',
            noParentPath: true,
            path: '*',
            name: '404',
            title: '404页面',
            type: 1,
            icon: '',
            description: '404页面',
            layout: '',
            sort: 1,
            pid: '',
            component: '404',
            remark: ''
        }
    ]
}
