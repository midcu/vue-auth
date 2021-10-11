<template>
    <va-main-content>
        <div class="va-main-content-header">
            <div style="flex: 1;" />
            <div>
                <el-button size="small" type="success" icon="el-icon-refresh" @click="search">刷新</el-button>
                <el-button v-permission="['menus:add']" size="small" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
            </div>
        </div>
        <div class="va-permission-tree-header va-table-thead-theme">
            <span>权限名称</span>
            <div class="va-permission-tree-desc">
                <span style="width: 200px;">权限标识</span>
                <span style="width: 400px;">权限描述</span>
                <span style="width: 140px;" v-if="$vaCheckPermission(['permissions:edit', 'permissions:del'])">操作</span>
            </div>
        </div>
        <el-tree
            v-loading = "loading"
            ref="tree"
            :data="permissions"
            class="va-menu-tree"
            node-key="id"
            :expand-on-click-node="false"
            :accordion="true"
            :default-expanded-keys="defExKeys"
            @node-expand="onNodeExpand"
            @node-collapse="onNodeCollapse"
        >
            <div slot-scope="{ data }" class="va-permission-tree-body" style="width: 100%;">
                <span>{{ data.title }}</span>
                <div class="va-permission-tree-desc">
                    <span style="width: 200px;" :title="data.name">{{ data.name }}</span>
                    <span style="width: 400px;">{{ data.description }}</span>
                    <span style="width: 140px;" v-if="$vaCheckPermission(['permissions:edit', 'permissions:del'])">
                        <el-button v-permission="['permissions:edit']" icon="el-icon-edit" type="text" size="mini" @click.stop="edit(data)">编辑</el-button>
                        <el-popconfirm v-permission="['permissions:del']" style="margin-left: 10px;" title="确定永久删除该菜单吗？" @confirm="del(data)">
                            <el-button slot="reference" type="text" icon="el-icon-delete" size="mini">删除</el-button>
                        </el-popconfirm>
                    </span>
                </div>
            </div>
        </el-tree>
        <el-dialog :visible.sync="submitFormDialog" :close-on-click-modal="false" @close="dialogClose">
            <el-form ref="submitForm" :model="submitForm" :rules="rules" size="small" label-width="80px">
                <el-form-item label="权限标题" prop="title">
                    <el-input v-model="submitForm.title" placeholder="请输入名称，例：新增菜单" />
                </el-form-item>
                <el-form-item label="权限标识" prop="name">
                    <el-input v-model="submitForm.name" placeholder="请输入标识，例：menus:add" />
                </el-form-item>
                <el-form-item label="上级目录" prop="pid">
                    <el-cascader
                        ref="menuCascader" v-model="submitForm.pid"
                        style="width: 100%;" placeholder="选择上级类目（默认为根目录）"
                        :options="permissionList"
                        :props="{ value: 'id', label: 'title', checkStrictly: true, emitPath: false, expandTrigger:'hover' }"
                    >
                        <template slot-scope="{ node, data }">
                            <span>{{ data.title }}</span>
                            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                        </template>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="菜单描述">
                    <el-input v-model="submitForm.description" type="textarea" :rows="2" placeholder="描述" />
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button @click="submitFormDialog = false">取消</el-button>
                    <el-button type="primary" @click="submit">{{ submitForm && submitForm.id ? '保存' : '创建' }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </va-main-content>
</template>

<script>
import { buildMenuTree } from '../../built-menus';
export default {
    name: 'va-menus',
    data () {
        return {
            loading: true,
            permissions: [],
            permissionList: [],
            defExKeys: [],
            submitForm: {
                name: '',
                title: '',
                description: '',
                pid: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入标识，例：menus:add', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: '请输入名称，例：新增菜单', trigger: 'blur' }
                ],
                pid: [
                    { required: true, message: '请选择父节点', trigger: 'blur' }
                ]
            },
            defNodeExpandId: '',
            submitFormDialog: false
        }
    },
    mounted () {
        this.search()
    },
    methods: {
        search () {
            this.$authApi.GetAllPermissions().then((result) => {
                this.loading = false;
                this.permissions = buildMenuTree(result.data);
                this.permissionList = [{ id: 1, title: '根级目录' }].concat(this.permissions);
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
            this.submitForm = {
                id: data.id,
                title: data.title,
                description: data.description,
                name: data.name,
                pid: data.pid
            };
            this.submitFormDialog = true;
        },
        del (data) {
            this.$authApi.DelPermission(data.id).then((result) => {
                this.$message({ type: 'success', message: result.message });
                this.search();
            })
        },
        add () {
            this.submitForm = {
                id: '',
                name: '',
                title: '',
                description: '',
                pid: 1
            };
            this.submitFormDialog = true;
        },
        dialogClose () {
            this.$refs.submitForm.resetFields();
        },
        submit () {
            if (this.submitForm.id) {
                this.$authApi.EditPermission(this.submitForm.id, this.submitForm).then((result) => {
                    this.$message.success(result.message);
                    this.search()
                    this.submitFormDialog = false;
                });
            } else {
                this.$authApi.AddPermission(this.submitForm).then((result) => {
                    this.$message.success(result.message);
                    this.search();
                    this.submitFormDialog = false;
                })
            }
        }
    }
}
</script>
