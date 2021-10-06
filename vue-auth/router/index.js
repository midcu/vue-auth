// withoutlogin 不需要登陆（登录不可查看）
// needtologin 需要登陆
// nomatterlogin  登录不登陆无所谓

// 增加匿名访问的页面功能！！！！！！！！！！

import { BuildMenus } from '../built-menus.js'
import AuthApi from '../api'
import fileConfig from '../config/config'

/*
1：角色菜单（所有情况都有角色， 匿名角色id：1,管理员角色id：2，普通用户角色id：3+）::::: 不可能会出现没有角色的情况了！ 三种类型角色！！！
2：用户信息
3：权限列表
*/
function initRouterMenus (router, store, loader, to, from, next) {
    AuthApi.InitProject().then(({ menus, user, permissions }) => {
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

        next({ path: to.fullPath })
    }).catch(() => {
        // 获取菜单失败 跳转至登陆页面
        next({ name: 'login', redirect: from.fullPath });
    })
}

export default function initRouter (router, loader, store) {
    // 静态路由配置
    const constantRoutes = BuildMenus(fileConfig.routes, loader);

    for (const i of constantRoutes) {
        router.addRoute(i);
    }

    router.beforeEach((to, from, next) => {
        if (store.getters.hasAuthed) {
            // 已经登陆
            if (to.meta && to.meta.withoutLogin) {
                // 不需要登陆 如：login 跳转到首页
                next({ path: '/', replace: true })
            } else {
                next()
            }
        } else {
            if (to.meta && to.meta.withoutLogin) {
                // 不需要登陆 如：login 跳转到首页
                next()
            } else {
                // 获取菜单！
                initRouterMenus(router, store, loader, to, from, next);
            }
        }
    });
}
