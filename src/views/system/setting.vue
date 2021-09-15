<template>
    <va-main-content>
        <el-form ref="form" :model="form" style="margin-top: 10px;background: #ffffff;padding: 10px;" label-width="100px">
            <el-form-item label="菜单栏样式">
                <el-radio-group v-model="form.layout" size="small">
                    <el-radio-button v-for="i of layoutType" :key="i.value" :label="i.value">{{ i.label }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="主题样式">
                <el-radio-group v-model="form.theme" size="small">
                    <el-radio-button v-for="i of themeType" :key="i.value" :label="i.value">{{ i.label }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </va-main-content>
</template>

<script>
export default {
    name: 'va-setting',
    data () {
        return {
            form: {
                layout: this.$store.state.props.layoutName,
                theme: this.$store.state.props.themeUrl
            },
            layoutType: [
                { label: '侧边栏菜单', value: 'va-left-menu-page' },
                { label: '顶部栏菜单', value: 'va-top-menu-page' }
                // { label: "顶部侧边菜单", value: "" }
            ],
            themeType: [
                { label: '默认主题', value: '' },
                { label: '主题1', value: require('!url-loader!/src/assets/theme/theme1.css') },
                { label: '主题2', value: require('!url-loader!/src/assets/theme/theme2.css') },
                { label: '主题3', value: require('!url-loader!/src/assets/theme/theme3.css') }
            ]
        }
    },
    watch: {
        'form.layout' () {
            this.$store.commit('SET_LAYOUT_NAME', this.form.layout)
        },
        'form.theme' () {
            this.$store.commit('SET_THEME_URL', this.form.theme)
        }
    },
    mounted () {
        // console.log(this.$store.state.props.themeUrl)
    },
    methods: {

    }
}
</script>
