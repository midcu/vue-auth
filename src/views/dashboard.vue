<template>
    <va-main-content>
        <div style="margin-top:10px;background: #fff;padding: 20px;">
            <h1 id="va-auth">Va-Auth</h1>
            <p>一个基于vue的前端验证框架<strong>插件</strong>，包括<strong>权限验证</strong>、<strong>用户管理</strong>、<strong>角色管理</strong>、<strong>菜单管理</strong>等功能。</p>
            <pre><code>依靠va-auth可以迅速的搭建起一个新的管理系统
</code></pre>
            <h2 id="安装使用">安装使用</h2>
            <pre><code>npm install -S va-auth
</code></pre>
            <h3 id="配置">配置</h3>
            <p>框架依赖vuex作为全局状态管里，vue-router作为路由跳转控制，Axios作为HTTP请求工具，ElementUi作为UI框架</p>
            <pre><code>import Auth from &#39;va-auth&#39;

Vue.use(Auth, {
    router, //vue-router的实例
    loader: (name) =&gt; import(&#39;./views/&#39; + name), // [name].vue页面懒加载的函数
    store, // vuex的实例
    request,// Axios的实例
    config // 插件的配置，覆盖默认配置
})

new Vue({
    router,
    store,
    render: (h) =&gt; h(&quot;va-main&quot;)
}).$mount(&#39;#app&#39;)
</code></pre>
            <h3 id="运行测试">运行测试</h3>
            <p>建议使用vue-cli搭建vue项目</p>
            <pre><code>import &#39;va-auth/mockjs&#39;  // 前端测试，拦截前端http请求，在没有后端时使用
</code></pre>
            <p>运行项目即可看到管理系统</p>
        </div>
    </va-main-content>
</template>

<script>
export default {
    name: 'dashboard'
}
</script>

<style>

</style>
