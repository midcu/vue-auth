<template>
    <el-container class="va-filled">
        <el-header class="va-main-header">
            <div class="va-main-header-name">{{ $store.state.props.headerName }}</div>
            <div style="flex: 1;">&nbsp;</div>
            <div class="va-main-header-info">
                <div v-if="!$store.getters.hasAuthed" class="va-main-header-info-name" style="z-index: 100;">点击登录</div>
                <el-dropdown v-if="$store.getters.hasAuthed" @command="handleCommand">
                    <span class="va-main-header-info-name">{{ $store.state.user.user.nickname || '未登录' }}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="themebar">布局设置</el-dropdown-item>
                        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container class="va-container">
            <el-aside class="va-main-aside" :width="isCollapse ? '64px' : '210px'">
                <va-scrollbar>
                    <va-menu class="va-menu-vertical" :is-collapse="isCollapse" :menudata="menusdata" @collapse="toggleSideBar" />
                </va-scrollbar>
            </el-aside>
            <el-main style="padding: 0;">
                <router-view />
            </el-main>
        </el-container>
        <el-drawer size="300" :with-header="false" :modal="false" :visible.sync="themeBar" :show-close="false">
            <va-theme-bar />
        </el-drawer>
    </el-container>
</template>

<script>
import VaMenu from './menu';
export default {
    name: 'va-left-menu-page',
    components: {
        VaMenu
    },
    data () {
        return {
            themeBar: false,
            isCollapse: false
        }
    },
    computed: {
        menusdata () {
            return this.$store.getters.menus || [];
        }
    },
    methods: {
        toggleSideBar () {
            this.isCollapse = !this.isCollapse;
        },
        handleCommand (com) {
            switch (com) {
            case 'themebar':
                this.themeBar = true;
                break;
            case 'personal':
                break;
            case 'logout':
                this.$store.commit('USER_LOGOUT')
                break;
            case 'login':
                this.$store.commit('USER_TOLOGIN')
                break;

            default:
                break;
            }
        }
    }
}
</script>

<style>

</style>
