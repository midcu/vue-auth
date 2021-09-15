const TOKEN_NAME = 'vue-auth-token'
const userToken = {
    getToken () {
        return window.localStorage.getItem(TOKEN_NAME)
    },
    setToken (val) {
        window.localStorage.setItem(TOKEN_NAME, val)
    }
}

const user = {
    state: {
        user: { id: 1, name: '匿名用户', tag: 'anonymous' },
        token: userToken.getToken(),
        hasAuthed: !!userToken.getToken(),
        permissions: []
    },
    getters: {
        hasAuthed: state => state.hasAuthed,
        permissions: state => state.permissions || []
    },
    mutations: {
        'SET_USER' (state, user) {
            state.user = user;
        },
        'SET_PERMISSIONS' (state, permissions) {
            state.permissions = permissions;
        },
        'USER_TOKEN' (state, token) {
            state.token = token;
            state.hasAuthed = true;
            userToken.setToken(token);
        },
        'USER_LOGOUT' (state) {
            state.user = { };
            userToken.setToken('');
            state.hasAuthed = false;

            window.location.href = '/';
        },
        'USER_TOLOGIN' (state) {
            userToken.setToken('');

            window.location.href = '/#/login';
        },
        'USER_UPDATE' (state, user) {
            Object.assign(state.user, user);
        }
    }
}

export default user;
