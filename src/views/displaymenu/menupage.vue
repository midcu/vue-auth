<template>
    <va-main-content>
        <div style="margin-top: 10px;">
            <router-view />
        </div>
        <div style="margin-top: 10px;background: #fff; padding: 0 20px;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="address" label="地址" />
            </el-table>
        </div>
    </va-main-content>
</template>

<script>
export default {
    name: 'menupage',
    data () {
        return {
            tableData: [{
                createTime: new Date().getTime(),
                name: '王xx',
                address: '上海市普陀区金沙江路 xxxx 弄'
            }, {
                createTime: new Date().getTime(),
                name: '王xx',
                address: '上海市普陀区金沙江路 xxxx 弄'
            }, {
                createTime: new Date().getTime(),
                name: '王xx',
                address: '上海市普陀区金沙江路 xxxx 弄'
            }, {
                createTime: new Date().getTime(),
                name: '王xx',
                address: '上海市普陀区金沙江路 xxxx 弄'
            }]
        }
    }
}
</script>

<style>

</style>
