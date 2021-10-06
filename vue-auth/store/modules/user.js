const user = {
    state: {
        user: { id: 1, name: '匿名用户', tag: 'anonymous' },
        hasAuthed: false,
        permissions: []
    },
    getters: {
        hasAuthed: state => state.hasAuthed,
        permissions: state => state.permissions || []
    },
    mutations: {
        'USER_LOGIN' (state, user) {
            state.hasAuthed = true;
            state.user = user;
        },
        'SET_PERMISSIONS' (state, permissions) {
            state.permissions = permissions;
        },
        'USER_LOGOUT' (state) {
            state.user = { };
            state.hasAuthed = false;
            window.location.href = '/';
        },
        'USER_TOLOGIN' (state) {
            window.location.href = '/#/login';
        },
        'USER_UPDATE' (state, user) {
            Object.assign(state.user, user);
        }
    }
}

export default user;
