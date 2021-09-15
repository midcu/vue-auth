export default function registerDirective (Vue, store) {
    Vue.directive('permission', {
        inserted (el, binding, vnode) {
            const { value } = binding
            const permissions = store.getters && store.getters.permissions

            if (!permissions) {
                el.parentNode && el.parentNode.removeChild(el)
            } else if (value && value instanceof Array && value.length > 0) {
                const permissionRoles = value

                if (!permissions.some(role => permissionRoles.includes(role))) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            } else {
                throw new Error('need permissions! Like v-permission="[\'menus:add\',\'menus:edit\']"')
            }
        }
    })
}
