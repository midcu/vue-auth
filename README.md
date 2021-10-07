# vue-auth
一个基于vue的前端框架**插件**，包括**权限验证**、**用户管理**、**角色管理**、**菜单管理**、**权限管理**等功能。
#### 项目[demo](https://midcu.github.io/)，用户密码：admin：123
```
依靠vue-auth可以迅速的搭建起一个新的管理系统
```
## 安装使用
```
npm install -S @midcu/vue-auth element-ui axios
```
### 配置
框架依赖vuex作为全局状态管里，vue-router作为路由跳转控制，Axios作为HTTP请求工具，ElementUi作为UI框架
#### 可配置内容，详见[config](https://github.com/midcu/vue-auth/blob/master/src/auth/config/config.js)，其他配置可详见项目的具体代码
```
import Axios from 'axios'
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
    render: (h) => h("va-main")
}).$mount('#app')

```

### 后台项目[GITHUB]](https://github.com/midcu/vue-auth-server)
1、新建spring boot项目，添加此依赖包。
2、配置mysql的数据库地址，运行项目。
3、配置vue项目vue.config.js代理地址。

相关配置和如何使用可查看项目的auth-main模块的配置。

**auth-security-session**包含菜单，用户，角色，和登录验证码的接口。

```
<dependency>
    <groupId>com.midcu</groupId>
    <artifactId>auth-security-session</artifactId>
    <version>0.0.2</version>
</dependency>
```
### 运行测试
建议使用vue-cli搭建vue项目(ps:运行前清除原有的route地址)。

配置相应的后台地址。

运行项目即可看到管理系统

### 下一步更新计划
1、角色、菜单、权限的禁用功能

2、文档更新

3、部门管理

4、数据字典

5、用户状态发生变化时的session更新管理


### ISSUES

问题讨论，BUG反馈，功能实现。