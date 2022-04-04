<template>
    <el-pagination class="va-pagination" background :current-page="page" :page-size="pageSize" layout="total, prev, pager, next, sizes" :total="total" @size-change="sizeChange" @current-change="pageChange" />
</template>
<script>
export default {
    name: "va-pagination",
    props: ["page", "pageSize", "total"],
    data() {
        return {

        }
    },
    methods: {
        pageChangen(val) {
            this.$emit("change", { page: val, pageSize: this.pageSize })
        },
        sizeChange(val) {
            this.$emit("change", { page: this.page, pageSize: val })
        }
    }
}
</script>
