<template>
    <va-main-content>
        <div style="background: #fff;margin-top: 20px;">
            <el-form ref="form" :model="form" style="margin-top: 10px;background: #ffffff;padding: 10px;" label-width="200px">
                <el-form-item label="前端获取所有权限">
                    <el-button @click="obtainPermissions" type="primary" size="small">获取权限</el-button>
                </el-form-item>
            </el-form>
        </div>
    </va-main-content>
</template>

<script>
export default {
    name: 'test',
    data () {
        return {
            form: { }
        }
    },
    methods: {
        obtainPermissions () {
            this.$authApi.GetAllPermissions().then((result) => {
                var permissions = [];
                for (const r of result.data) {
                    permissions.push(r.name)
                }
                this.$store.commit('SET_PERMISSIONS', permissions);

                this.$message.success('设置成功！');
            })
        }
    }
}
</script>

<style>

</style>
