<template>
    <va-main-content>
        <div class="va-main-content-header">
            <!-- 搜索 -->
            <el-input v-model="searchKey" size="small" clearable placeholder="搜索" class="va-system-bt-search" @keyup.enter.native="search()" />
            <el-button size="small" type="success" icon="el-icon-search" @click="search()">搜索</el-button>
            <div style="flex: 1;" />
            <div>
                <el-button v-permission="['roles:add']" size="small" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
            </div>
        </div>
        <el-row>
            <!--角色管理-->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding-left: 5px;background: #fff;padding-bottom: 20px;">
                <el-table class="va-table-thead-theme" :data="data" v-loading="loading">
                    <el-table-column prop="name" width="180px" label="名称" />
                    <el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
                    <el-table-column :show-overflow-tooltip="true" width="180px" prop="createTime" label="创建日期">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="220px" align="center" v-if="$vaCheckPermission(['roles:menus', 'roles:edit', 'roles:del'])">
                        <template slot-scope="scope">
                            <el-button v-permission="['roles:menus']" icon="el-icon-lock" size="mini" type="text" @click="getRoleMenus(scope.row)">
                                权限
                            </el-button>
                            <el-button v-permission="['roles:edit']" icon="el-icon-edit" style="margin-left: 0;" size="mini" type="text" @click="edit(scope.row)">
                                编辑
                            </el-button>
                            <el-popconfirm v-permission="['roles:del']" title="确定永久删除该角色吗？" @confirm="remove(scope.row)">
                                <el-button slot="reference" type="text" icon="el-icon-delete" size="mini">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <!--分页组件-->
                <el-pagination background style="text-align: center" :current-page.sync="page" :page-size="pageSize" layout="total, prev, pager, next" :total="total" @size-change="sizeChange" @current-change="pageChange" />
            </el-col>
            <!-- 菜单 -->
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <el-card shadow="never" style="margin-left: 10px;" v-loading="loading">
                    <div slot="header">
                        <span>菜单分配<span style="color: #67C23A">（{{ currectRole.name }}）</span></span>
                        <el-button v-permission="['roles:menus']" icon="el-icon-check" size="small" style="float: right; padding: 3px 0" type="text" @click="saveMenu">
                            保存
                        </el-button>
                    </div>
                    <el-tree ref="menu" :data="menus" :default-checked-keys="menuIds" :props="defaultProps"
                             check-strictly accordion show-checkbox node-key="id"
                    />
                </el-card>
            </el-col>
            <!-- 授权 -->
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <el-card shadow="never" style="margin-left: 10px;" v-loading="loading">
                    <div slot="header">
                        <span>权限分配<span style="color: #67C23A">（{{ currectRole.name }}）</span></span>
                        <el-button v-permission="['roles:permissions']" icon="el-icon-check" size="small" style="float: right; padding: 3px 0" type="text" @click="savePermission">
                            保存
                        </el-button>
                    </div>
                    <el-tree ref="permission" :data="permissions" :default-checked-keys="permissionIds" :props="defaultProps"
                             check-strictly accordion show-checkbox node-key="id"
                    />
                </el-card>
            </el-col>
        </el-row>
        <el-dialog custom-class="va-dialog-submit" :visible.sync="submitFormDialog" width="580px" title="角色" :close-on-click-modal="false" @close="cancel">
            <el-form ref="submitForm" :model="submitForm" :rules="rules" size="small" label-width="80px">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="submitForm.name" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input v-model="submitForm.description" type="textarea" :rows="3" maxlength="128" show-word-limit placeholder="请输入角色描述" />
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button @click="submitFormDialog = false">取消</el-button>
                    <el-button type="primary" @click="submit()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </va-main-content>
</template>

<script>
import { buildMenuTree } from '../../built-menus';
export default {
    name: 'va-roles',
    data () {
        return {
            loading: true,
            searchKey: '',
            total: 1,
            page: 1,
            pageSize: 10,
            showButton: true,
            menus: [],
            permissions: [],
            permissionIds: [],
            menuIds: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            submitFormDialog: false,
            submitForm: { name: '', description: '' },
            data: [],
            currectRole: { name: '未选中角色' },
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {
        this.getMenus()
        this.getAllPermissions()
        this.search()
    },
    methods: {
        search (page) {
            this.$authApi.GetAllRoles({
                name: this.searchKey,
                page: page || 1,
                pageSize: this.pageSize
            }).then((result) => {
                this.loading = false;
                this.data = result.data;
                this.total = result.page.total;
            }).catch(() => { this.loading = false; });
        },
        getMenus () {
            this.$authApi.GetAllMenus().then((resData) => {
                this.menus = buildMenuTree(resData.data);
            })
        },
        getAllPermissions () {
            this.$authApi.GetAllPermissions().then((resData) => {
                this.permissions = buildMenuTree(resData.data);
            })
        },
        add () {
            this.submitForm = { id: '', name: '', description: '' }
            this.submitFormDialog = true;
        },
        edit (row) {
            this.submitForm = { id: row.id, name: row.name, description: row.description };
            this.submitFormDialog = true;
        },
        cancel () {
            this.submitFormDialog = false
            this.$refs.submitForm.clearValidate();
        },
        submit () {
            this.$refs.submitForm.validate((valid) => {
                if (valid) {
                    if (this.submitForm.id) {
                        this.$authApi.EditRole(this.submitForm.id, { name: this.submitForm.name, description: this.submitForm.description }).then((result) => {
                            this.$message.success('操作成功')
                            this.submitFormDialog = false;
                            this.search();
                        })
                    } else {
                        this.$authApi.AddRole({ name: this.submitForm.name, description: this.submitForm.description }).then((result) => {
                            this.$message.success('操作成功')
                            this.submitFormDialog = false;
                            this.search();
                        })
                    }
                }
            });
        },
        saveMenu () {
            if (this.currectRole.id) {
                const menuIds = [];
                this.$refs.menu.getCheckedNodes().forEach(function (data, index) {
                    menuIds.push(data.id)
                })
                this.$authApi.ResetRoleMenus(this.currectRole.id, menuIds).then((result) => {
                    this.$message.success(result.message)
                })
            } else {
                this.$message.warning('未选中角色')
            }
        },
        savePermission () {
            if (this.currectRole.id) {
                const permissionIds = [];
                this.$refs.permission.getCheckedNodes().forEach(function (data, index) {
                    permissionIds.push(data.id)
                })
                this.$authApi.ResetRolePermissions(this.currectRole.id, permissionIds).then((result) => {
                    this.$message.success(result.message)
                })
            } else {
                this.$message.warning('未选中角色')
            }
        },
        remove (row) {
            this.$authApi.DelRole(row.id).then(() => {
                this.$message({ type: 'success', message: '删除成功!' });
                this.search();
            })
        },
        getRoleMenus (row) {
            this.currectRole = row;
            this.$refs.menu.setCheckedKeys([])
            this.$authApi.GetRoleMenuIds(row.id).then((result) => {
                if (Array.isArray(result.data)) {
                    this.menuIds = result.data;
                } else {
                    this.menuIds = [];
                }
            })

            this.$refs.permission.setCheckedKeys([])

            this.$authApi.GetRolePermissionIds(row.id).then((result) => {
                if (Array.isArray(result.data)) {
                    this.permissionIds = result.data;
                } else {
                    this.permissionIds = [];
                }
            })
        },
        sizeChange (value) {
            this.pageSize = value;
            this.search();
        },
        pageChange (val) {
            this.search(val)
        }
    }
}
</script>
