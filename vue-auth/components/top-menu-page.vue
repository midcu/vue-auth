<template>
    <el-container class="va-filled">
        <el-header class="va-main-header va-main-aside">
            <div class="va-main-header-name">{{ $store.state.props.headerName }}</div>
            <div style="flex: 1;">
                <va-menu style="justify-content: center; display: flex;" mode="horizontal" :notitle="true" :is-collapse="isCollapse" :menudata="menusdata" @collapse="toggleSideBar" />
            </div>
            <div class="va-main-header-info">
                <el-dropdown @command="handleCommand">
                    <div class="va-main-header-info-icon">
                        <i class="el-icon-user-solid" @click="themeBar = true" />
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>{{ $store.state.user.user.name }}</el-dropdown-item>
                        <!-- <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="a">个人设置</el-dropdown-item> -->
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-tooltip content="主题设置" placement="bottom">
                    <div class="va-main-header-info-icon">
                        <i class="el-icon-menu" @click="themeBar = true" />
                    </div>
                </el-tooltip>
            </div>
        </el-header>
        <el-container class="va-container">
            <el-main>
                <router-view />
            </el-main>
        </el-container>
        <el-drawer title="我是标题" size="20%" :visible.sync="themeBar">
            <va-theme-bar />
        </el-drawer>
    </el-container>
</template>

<script>
import VaMenu from './menu';
export default {
    name: 'va-top-menu-page',
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
            case 'logout':
                this.$store.commit('USER_LOGOUT')
                break;

            default:
                break;
            }
        }
    }
}
</script>

<style>
.a {
    cursor: pointer;
}
</style>
