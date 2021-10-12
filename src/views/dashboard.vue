<template>
    <va-main-content>
        <div style="margin-top:10px;background: #fff;padding: 20px 40px;">
            <article itemprop="text"><h1><a id="user-content-vue-auth" class="anchor" aria-hidden="true" href="#vue-auth"></a>vue-auth</h1>
                <p>一个基于vue的前端框架<strong>插件</strong>，包括<strong>权限验证</strong>、<strong>用户管理</strong>、<strong>角色管理</strong>、<strong>菜单管理</strong>、<strong>权限管理</strong>等功能。</p>
                <div class="snippet-clipboard-content position-relative overflow-auto"><pre><code>依靠vue-auth可以迅速的搭建起一个新的管理系统
</code></pre><div class="zeroclipboard-container position-absolute right-0 top-0">
                    <pre aria-label="Copy" class="ClipboardButton btn js-pre m-2 p-0 tooltipped-no-delay" data-copy-feedback="Copied!" data-tooltip-direction="w" value="依靠vue-auth可以迅速的搭建起一个新的管理系统
" tabindex="0" role="button">
                    </pre>
                </div></div>
                <h2><a id="user-content-安装使用" class="anchor" aria-hidden="true" href="#安装使用"></a>安装使用</h2>
                <div class="snippet-clipboard-content position-relative overflow-auto"><pre><code>npm install -S @midcu/vue-auth element-ui axios
</code></pre><div class="zeroclipboard-container position-absolute right-0 top-0">
                    <pre aria-label="Copy" class="ClipboardButton btn js-pre m-2 p-0 tooltipped-no-delay" data-copy-feedback="Copied!" data-tooltip-direction="w" value="npm install -S @midcu/vue-auth element-ui axios
" tabindex="0" role="button">
                    </pre>
                </div></div>
                <h3><a id="user-content-配置" class="anchor" aria-hidden="true" href="#配置"></a>配置</h3>
                <p>框架依赖vuex作为全局状态管里，vue-router作为路由跳转控制，Axios作为HTTP请求工具，ElementUi作为UI框架</p>
                <h4><a id="user-content-可配置内容详见config其他配置可详见项目的具体代码" class="anchor" aria-hidden="true" href="#可配置内容详见config其他配置可详见项目的具体代码"></a>可配置内容，详见<a href="https://github.com/midcu/vue-auth/blob/master/src/auth/config/config.js">config</a>，其他配置可详见项目的具体代码</h4>
                <div class="snippet-clipboard-content position-relative overflow-auto"><pre><code>import Axios from 'axios'
import Auth from '@midcu/vue-auth'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

const request = Axios.create({
  baseURL: '/api',
  timeout: 30000
})

Vue.use(Auth, {
    router, //vue-router的实例
    loader: (name) =&gt; import('./views/'+name), // [name].vue页面懒加载的函数
    store, // vuex的实例
    request,// Axios的实例
    { } // config 插件的配置，覆盖默认配置
})

new Vue({
    router,
    store,
    render: (h) =&gt; h("va-main")
}).$mount('#app')

</code></pre><div class="zeroclipboard-container position-absolute right-0 top-0">
                    <pre aria-label="Copy" class="ClipboardButton btn js-pre m-2 p-0 tooltipped-no-delay" data-copy-feedback="Copied!" data-tooltip-direction="w" value="import Axios from 'axios'
import Auth from '@midcu/vue-auth'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

const request = Axios.create({
  baseURL: '/api',
  timeout: 30000
})

Vue.use(Auth, {
    router, //vue-router的实例
    loader: (name) => import('./views/'+name), // [name].vue页面懒加载的函数
    store, // vuex的实例
    request,// Axios的实例
    { } // config 插件的配置，覆盖默认配置
})

new Vue({
    router,
    store,
    render: (h) => h(&quot;va-main&quot;)
}).$mount('#app')

" tabindex="0" role="button">
                    </pre>
                </div></div>
                <h3><a id="user-content-后台项目github" class="anchor" aria-hidden="true" href="#后台项目github"></a>后台项目<a href="https://github.com/midcu/vue-auth-server">GITHUB</a></h3>
                <p>1、新建spring boot项目，添加此依赖包。</p>
                <p>2、配置mysql的数据库地址，运行项目。</p>
                <p>3、配置vue项目vue.config.js代理地址。</p>
                <p>相关配置和如何使用可查看项目的auth-main模块的配置。</p>
                <p><strong>auth-security-session</strong>包含菜单，用户，角色，和登录验证码的接口。</p>
                <div class="snippet-clipboard-content position-relative overflow-auto"><pre><code>&lt;dependency&gt;
    &lt;groupId&gt;com.midcu&lt;/groupId&gt;
    &lt;artifactId&gt;auth-security-session&lt;/artifactId&gt;
    &lt;version&gt;0.0.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="zeroclipboard-container position-absolute right-0 top-0">
                    <pre aria-label="Copy" class="ClipboardButton btn js-pre m-2 p-0 tooltipped-no-delay" data-copy-feedback="Copied!" data-tooltip-direction="w" value="<dependency>
    <groupId>com.midcu</groupId>
    <artifactId>auth-security-session</artifactId>
    <version>0.0.3</version>
</dependency>
" tabindex="0" role="button">
                    </pre>
                </div></div>
                <h3><a id="user-content-运行测试" class="anchor" aria-hidden="true" href="#运行测试"></a>运行测试</h3>
                <p>建议使用vue-cli搭建vue项目(ps:运行前清除原有的route地址)。</p>
                <p>配置相应的后台地址。</p>
                <p>运行项目即可看到管理系统</p>
                <h3><a id="user-content-下一步更新计划" class="anchor" aria-hidden="true" href="#下一步更新计划"></a>下一步更新计划</h3>
                <p>1、角色、菜单、权限的禁用功能</p>
                <p>2、文档更新</p>
                <p>3、部门管理</p>
                <p>4、数据字典</p>
                <p>5、用户状态发生变化时的session更新管理</p>
                <h3><a id="user-content-issues" class="anchor" aria-hidden="true" href="#issues"></a>ISSUES</h3>
                <p>问题讨论，BUG反馈，功能实现。</p>
            </article>
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
