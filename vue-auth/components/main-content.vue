<template>
    <div class="va-main-content">
        <div class="va-main-content-title">
            {{ $route.meta.title }}
            <div v-if="$route.meta && $route.meta.description" class="va-main-content-des">
                {{ $route.meta.description }}
            </div>
        </div>
        <div style="flex: 1;">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'va-main-content',
    data () {
        return {
        }
    }
}
</script>

<style>

</style>
