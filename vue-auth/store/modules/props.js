import fileConfig from '../../config/config'

function assignDeepCopy (from, to) {
    for (const i in from) {
        if (Object.hasOwnProperty.call(from, i) && Object.hasOwnProperty.call(to, i) && typeof from[i] === typeof to[i]) {
            if (typeof from[i] === 'object') {
                assignDeepCopy(from[i], to[i])
            } else if (Array.isArray(to[i]) && Array.isArray(from[i])) {
                from[i] = [...to[i]];
            } else if (['number', 'string', 'boolean'].indexOf(typeof to[i]) > -1) {
                from[i] = to[i]
            }
        }
    }
}
const props = {
    state: {
        httpUrl: '',
        logoUrl: '',
        themeUrl: '',
        routerAnimation: '',
        layoutName: '',
        headerName: '',
        platformId: '',
        anonymous: false
    },
    getters: {
        anonymous: state => state.anonymous
    },
    mutations: {
        SET_CONFIG (state, userFileConfig) {
            if (userFileConfig) {
                assignDeepCopy(fileConfig, userFileConfig);
            }
            state.httpUrl = fileConfig.path.httpUrl;
            state.logoUrl = fileConfig.path.logoUrl;
            state.themeUrl = fileConfig.path.themeUrl;
            state.routerAnimation = fileConfig.animation.routerAnimation;
            state.layoutName = fileConfig.layout.layoutName;
            state.headerName = fileConfig.name.headerName;
            state.anonymous = fileConfig.anonymous;
            state.platformId = fileConfig.platformId;
        },
        SET_ROUTER_ANIMATION (state, payload) {
            state.routerAnimation = payload
        },
        SET_THEME_URL (state, payload) {
            state.themeUrl = payload

            let linkEl = document.getElementById('va-themeCssId1001');
            if (!linkEl) {
                linkEl = document.createElement('link');
                linkEl.rel = 'stylesheet';
                linkEl.type = 'text/css';
                linkEl.id = 'va-themeCssId1001';
                const head = document.getElementsByTagName('head')[0];
                head.appendChild(linkEl);
            }
            linkEl.href = state.themeUrl
        },
        SET_HEADER_NAME (state, payload) {
            state.headerName = payload
        },
        SET_LAYOUT_NAME (state, payload) {
            state.layoutName = payload
        },
        SET_HTTP_URL (state, payload) {
            state.httpUrl = payload
        },
        SET_PLATFORM_ID(state, payload) {
            state.platformId = payload
        }
    }
}

export default props;
