<template>
    <div class="va-main-content">
        <div class="va-main-content-title" style="display: flex;">
            <el-page-header style="line-height: 50px;flex: 1;" v-if="barback" @back="goBack" :content="$route.meta.title"></el-page-header>
            <div style="flex: 1;" v-else>
                {{ $route.meta.title }}
                <div v-if="$route.meta && $route.meta.description" class="va-main-content-des">
                    {{ $route.meta.description }}
                </div>
            </div>
            <slot name="operation" />
        </div>
        <div class="va-main-content-main">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'va-main-content',
    props: ["barback"],
    data () {
        return {
        }
    },
    methods: {
        goBack() {
            this.$emit("back")
        }
    }
}
</script>

<style>

</style>
