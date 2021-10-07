<template>
    <va-main-content>
        <div class="va-main-content-header">
            <div style="flex: 1;" />
            <div>
                <el-button size="small" type="success" icon="el-icon-refresh" @click="search">刷新</el-button>
                <el-button v-permission="['menus:add']" size="small" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
            </div>
        </div>
        <div class="va-menu-tree-header va-table-thead-theme">
            <div class="va-menu-tree-node">
                <span>菜单名称</span>
                <span class="va-menu-tree-node-header-title">
                    <span>类型</span>
                    <span class="va-menu-tree-node-span">权限标识</span>
                    <span class="va-menu-tree-node-span">组件</span>
                    <span class="va-menu-tree-node-span">路径</span>
                    <span>排序</span>
                    <span>可见</span>
                    <span>图标</span>
                    <span style="width: 140px;">操作</span>
                </span>
            </div>
        </div>
        <el-tree
            v-loading="loading"
            ref="tree"
            :data="menus"
            class="va-menu-tree"
            node-key="id"
            :expand-on-click-node="false"
            :accordion="true"
            :default-expanded-keys="defExKeys"
            @node-expand="onNodeExpand"
            @node-collapse="onNodeCollapse"
        >
            <div slot-scope="{ data }" class="va-menu-tree-node">
                <span>{{ data.title }}</span>
                <span class="va-menu-tree-node-header-title">
                    <span>{{ data.type | MenuType }}</span>
                    <span class="va-menu-tree-node-span" :title="data.permission">{{ data.permission }}</span>
                    <span class="va-menu-tree-node-span" :title="data.component">{{ data.component }}</span>
                    <span class="va-menu-tree-node-span" :title="data.path">{{ data.path }}</span>
                    <span>{{ data.sort }}</span>
                    <span :style="{ color: data.display ? '#67c23a' : '#e6a23c' }">{{ data.display ? "是" : "否" }}</span>
                    <span><i :class="data.icon" /></span>
                    <span style="width: 140px;">
                        <el-button v-permission="['menus:edit']" icon="el-icon-edit" type="text" size="mini" @click.stop="edit(data)">编辑</el-button>
                        <el-popconfirm v-permission="['menus:del']" style="margin-left: 10px;" title="确定永久删除该菜单吗？" @confirm="del(data)">
                            <el-button slot="reference" type="text" icon="el-icon-delete" size="mini">删除</el-button>
                        </el-popconfirm>
                    </span>
                </span>
            </div>
        </el-tree>
        <VaMenuSubmit ref="VaMenuSubmit" :menus="menus" :visible.sync="submitFormDialog" :form="form" @submit="submit" />
    </va-main-content>
</template>

<script>
import { buildMenuTree } from '../../built-menus';
import VaMenuSubmit from './component/menuSubmit.vue'
export default {
    name: 'va-menus',
    components: {
        VaMenuSubmit
    },
    filters: {
        MenuType (value) {
            if (value === 0) {
                return '目录'
            } else if (value === 1) {
                return '菜单'
            } else {
                return '按钮'
            }
        }
    },
    data () {
        return {
            menus: [],
            form: null,
            defExKeys: [],
            defNodeExpandId: '',
            submitFormDialog: false,
            loading: true,
            menuType: ['目录', '菜单', '按钮']
        }
    },
    mounted () {
        this.search()
    },
    methods: {
        search () {
            this.$authApi.GetMenus().then((result) => {
                this.loading = false;
                this.menus = buildMenuTree(result.data);
                if (this.defNodeExpandId) {
                    this.defExKeys = [this.defNodeExpandId];
                }
            }).catch(() => { this.loading = false; });
        },
        onNodeExpand (data) {
            this.defNodeExpandId = data.id;
        },
        onNodeCollapse (data) {
            if (data.id === this.defNodeExpandId) {
                this.defNodeExpandId = ''
            }
        },
        edit (data) {
            this.form = data;
            this.submitFormDialog = true;
        },
        del (data) {
            this.$authApi.DelMenu(data.id).then((result) => {
                this.$message({ type: 'success', message: result.message });
                this.search();
            })
        },
        add () {
            this.form = null;
            this.submitFormDialog = true;
        },
        submit (form) {
            if (form.id) {
                this.$authApi.EditMenu(form.id, form).then((result) => {
                    this.$message.success(result.message);
                    this.search()
                    this.submitFormDialog = false;
                });
            } else {
                this.$authApi.AddMenu(form).then((result) => {
                    this.$message.success(result.message);
                    this.search();
                    this.submitFormDialog = false;

                    this.$refs.VaMenuSubmit.resetSubmitForm()
                })
            }
        }
    }
}
</script>
