// 0目录 1菜单 2按钮
function buildPath (ppath, menus) {
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (!menu.meta.noParentPath) {
            menu.path = ppath + '/' + menu.path
        }

        if (Array.isArray(menu.children) && menu.children.length > 0) {
            // 避免空路径错误，给有子菜单的菜单目录添加redirect
            if (!menu.redirect && menu.meta) {
                const firstChild = menu.children.find((child) => child.meta.display);
                if (firstChild) {
                    menu.redirect = menu.path + '/' + firstChild.path
                }
            }
            buildPath(menu.path, menu.children)
        } else {
            delete menu.children
        }
    }
}

const VaViews = {
    'system/menus': import(/* webpackChunkName: "system/menus" */'./views/system/menus'),
    'system/users': import(/* webpackChunkName: "system/users" */'./views/system/users'),
    'system/roles': import(/* webpackChunkName: "system/roles" */'./views/system/roles'),
    'system/permissions': import(/* webpackChunkName: "system/permissions" */'./views/system/permissions'),
    404: import(/* webpackChunkName: "404" */'./views/404'),
    login: import(/* webpackChunkName: "login" */'./views/login'),
    'pages/building': import(/* webpackChunkName: "pages/building" */'./views/pages/building'),
    'pages/frame': import(/* webpackChunkName: "pages/frame" */'./views/pages/frame'),
    'pages/layout': import(/* webpackChunkName: "pages/layout" */'./views/pages/layout')
}

export function BuildMenus (menus, loader) {
    function iLoader (name) {
        return () => loader(name)
            .catch(() => VaViews[name] ? VaViews[name] : loader('building'))
            .catch(() => VaViews['pages/building'])
    }

    const mList = [];
    if (!Array.isArray(menus)) {
        return mList;
    }
    const mObj = {};
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        // 按钮类型
        if (menu.type === 2) continue;
        const menuObj = {
            name: menu.name || menu.id,
            path: menu.path,
            redirect: menu.redirect,
            meta: {
                anonymous: menu.anonymous,
                display: menu.display,
                iframe: menu.iframe,
                title: menu.title,
                type: menu.type,
                icon: menu.icon,
                layout: menu.layout,
                iframeSrc: menu.iframeSrc,
                noCache: menu.noCache,
                noParentPath: menu.noParentPath,
                withoutLogin: menu.withoutLogin,
                description: menu.description
            }
        }

        if (menu.type === 0) {
            menuObj.component = iLoader('pages/layout')
        } else if (menu.iframe && !menu.component) {
            menuObj.component = iLoader('pages/frame')
        } else {
            menuObj.component = iLoader(menu.component)
        }
        if (mObj[menu.id]) {
            menuObj.children = mObj[menu.id].children;
        } else {
            mObj[menu.id] = menuObj;
        }
        if (menu.pid && menu.pid !== 1) {
            if (!mObj[menu.pid]) mObj[menu.pid] = { children: [] };
            if (!mObj[menu.pid].children) mObj[menu.pid].children = [];

            mObj[menu.pid].children.push(menuObj)
        } else {
            mList.push(menuObj)
        }
    }

    buildPath('', mList);
    return mList;
}

export function buildMenuTree (menus) {
    const mObj = { }; const mList = [];
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const menuObj = { };
        Object.assign(menuObj, menu);

        if (mObj[menu.id]) {
            menuObj.children = mObj[menu.id].children;
        } else {
            mObj[menu.id] = menuObj;
        }
        if (menu.pid && menu.pid !== 1) {
            if (!mObj[menu.pid]) mObj[menu.pid] = { children: [] };
            if (!mObj[menu.pid].children) mObj[menu.pid].children = [];

            mObj[menu.pid].children.push(menuObj)
        } else {
            mList.push(menuObj)
        }
    }

    return mList;
}
