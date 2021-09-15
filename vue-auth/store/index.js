import User from './modules/user';
import Menu from './modules/menu';
import Props from './modules/props';

export default function registerModule (store) {
    store.registerModule('menu', Menu)
    store.registerModule('user', User)
    store.registerModule('props', Props)
}
