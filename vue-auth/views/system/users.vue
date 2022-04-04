<template>
    <va-main-content>
        <div class="va-main-content-header">
            <!-- 搜索 -->
            <el-input v-model="nickname" size="small" clearable placeholder="搜索" class="va-system-bt-search" @keyup.enter.native="search()" />
            <el-button size="small" type="success" icon="el-icon-search" @click="search()">搜索</el-button>
            <div style="flex: 1;" />
            <!-- 新增 -->
            <div v-permission="['users:add']">
                <el-button size="small" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
            </div>
        </div>
        <el-table :data="data" class="va-table-thead-theme" v-loading="loading" element-loading-spinner="el-icon-loading">
            <el-table-column prop="username" align="center" label="账号" />
            <el-table-column prop="nickname" align="center" label="昵称" />
            <el-table-column prop="phone" align="center" label="电话" />
            <el-table-column :show-overflow-tooltip="true" align="center" prop="email" label="邮箱" />
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.state" :active-value="1" :inactive-value="0" active-color="#67C23A" inactive-color="#F56C6C"
                               @change="changeEnabled(scope.row, scope.row.state)"
                    />
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" prop="createTime" label="创建日期">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="285" align="center" v-if="$vaCheckPermission(['users:edit', 'users:del'])">
                <template slot-scope="scope">
                    <el-button v-permission="['users:edit']" icon="el-icon-lock" size="mini" type="text" @click="resetPasswd(scope.row)">
                        密码重置
                    </el-button>
                    <el-button v-permission="['users:edit']" icon="el-icon-user" size="mini" type="text" @click="setRole(scope.row)">
                        角色
                    </el-button>
                    <el-button v-permission="['users:edit']" icon="el-icon-edit" size="mini" type="text" @click="edit(scope.row)">
                        编辑
                    </el-button>
                    <el-popconfirm v-permission="['users:del']" title="确定永久删除该用户吗？" style="margin-left: 10px;" @confirm="remove(scope.row)">
                        <el-button slot="reference" type="text" icon="el-icon-delete" size="mini">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination background style="padding: 20px;background: #fff;text-align: center" :current-page.sync="page" :page-size="size" layout="total, prev, pager, next" :total="total" @size-change="sizeChange" @current-change="pageChange" />
        <el-dialog custom-class="va-dialog-submit" :visible.sync="submitFormDialog" width="580px" title="用户" :close-on-click-modal="false">
            <el-form ref="submitForm" :model="submitForm" :rules="rules" size="small" label-width="80px">
                <el-form-item v-if="!submitForm.id" label="账号" prop="username">
                    <el-input v-model="submitForm.username " placeholder="请输入登录用户名" />
                </el-form-item>
                <el-form-item v-if="!submitForm.id" label="密码 " prop="password">
                    <el-input v-model="submitForm.password" type="password" placeholder="请输入登录密码" />
                </el-form-item>
                <el-form-item label="名称" prop="nickname">
                    <el-input v-model="submitForm.nickname" placeholder="请输入用户名称" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="submitForm.email" placeholder="请输入用户邮箱" />
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="submitForm.phone" placeholder="请输入用户电话" />
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="submitForm.description" type="textarea" :rows="2" placeholder="描述信息" />
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button @click="submitFormDialog = false">取消</el-button>
                    <el-button type="primary" @click="submit()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog custom-class="va-dialog-submit" :visible.sync="roleSetDialog" width="580px" title="角色设置" :close-on-click-modal="false">
            <el-form ref="roleForm" :model="roleForm" :rules="rules" size="small" label-width="80px">
                <el-form-item label="用户角色 " prop="roleIds">
                    <el-select v-model="roleForm.roleIds" multiple style="width: 100%;" placeholder="请选择">
                        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button @click="roleSetDialog = false">取消</el-button>
                    <el-button type="primary" @click="rolesSubmit()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog custom-class="va-dialog-submit" :visible.sync="resetPasswdDialog" width="580px" title="密码重置" :close-on-click-modal="false">
            <el-form ref="pwdForm" :model="pwdForm" :rules="rules" size="small" label-width="80px">
                <el-form-item label="密码重置" prop="password">
                    <el-input v-model="pwdForm.password" type="password" placeholder="请输入新的登录密码" />
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button @click="resetPasswdDialog = false">取消</el-button>
                    <el-button type="primary" @click="pwdSubmit()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </va-main-content>
</template>

<script>
import calcMD5 from '../../utils/md5'
export default {
    name: 'va-users',
    data () {
        return {
            loading: false,
            total: 1,
            page: 1,
            size: 10,
            nickname: '',
            submitFormDialog: false,
            roleSetDialog: false,
            resetPasswdDialog: false,
            pwdForm: {
                id: '',
                password: ''
            },
            roleForm: {
                roleIds: []
            },
            submitForm: {
                id: '',
                nickname: '',
                username: '',
                password: '',
                phone: '',
                email: '',
                description: ''
            },
            rules: {
                nickname: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                roleIds: [
                    { required: true, message: '请选择用户角色', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入登录用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' }
                ],
                phone: [
                    { validator: (rule, value, callback) => { /^1[3|4|5|6|7|8]\d{9}$/.test(value) || !value ? callback() : callback(new Error('电话格式有误')) }, trigger: 'blur' }
                ],
                email: [
                    { validator: (rule, value, callback) => { /^[\w_.]+@[\w-]+(\.[\w-]+)*\.[0-9a-zA-Z0]{2,6}$/.test(value) || !value ? callback() : callback(new Error('邮箱格式有误')) }, trigger: 'blur' }
                ]
            },
            roles: [],
            currectUser: '',
            data: []
        }
    },
    mounted () {
        this.search();
        this.getRoles();
    },
    methods: {
        search (page) {
            this.loading = true;
            this.$authApi.GetAllUsers({
                page: page || 1,
                size: this.size,
                nickname: this.nickname
            }).then((resData) => {
                this.loading = false;
                this.data = resData.data.content;
                this.total = resData.data.totalElements;
            }).catch(() => { this.loading = false; });
        },
        getRoles () {
            this.$authApi.GetAllRoles({
                paged: false
            }).then((result) => {
                this.roles = result.data.content;
            })
        },
        pwdSubmit () {
            this.$refs.pwdForm.validate((valid) => {
                if (valid) {
                    const password = calcMD5('vue-auth' + this.pwdForm.password);
                    this.$authApi.EditUser(this.pwdForm.id, { password: password }).then(() => {
                        this.resetPasswdDialog = false
                        this.$message.success('操作成功')
                    })
                }
            })
        },
        rolesSubmit () {
            this.$refs.roleForm.validate((valid) => {
                if (valid) {
                    this.$authApi.resetUserRoles(this.roleForm.id, this.roleForm.roleIds).then(() => {
                        this.roleSetDialog = false;
                        this.search()
                        this.$message.success('操作成功')
                    })
                }
            })
        },
        add () {
            if (this.$refs.submitForm) this.$refs.submitForm.resetFields();
            this.currectUser = '';
            this.submitForm = {
                id: '',
                nickname: '',
                username: '',
                password: '',
                phone: '',
                email: '',
                description: '',
                state: 1
            };
            this.submitFormDialog = true;
        },
        resetPasswd (row) {
            if (this.$refs.pwdForm) this.$refs.pwdForm.resetFields();
            this.pwdForm.password = '';
            this.pwdForm.id = row.id;
            this.resetPasswdDialog = true;
        },
        setRole (row) {
            if (this.$refs.roleForm) this.$refs.roleForm.resetFields();

            this.$authApi.getUserRoles(row.id).then((resData) => {
                this.roleForm.roleIds = resData.data;
            })

            this.roleForm.id = row.id;
            this.roleSetDialog = true;
        },
        edit (row) {
            if (this.$refs.submitForm) this.$refs.submitForm.resetFields();
            this.currectUser = row;
            this.submitForm = {
                id: row.id,
                nickname: row.nickname,
                username: row.username,
                phone: row.phone,
                email: row.email,
                description: row.description
            };
            this.submitFormDialog = true;
        },
        submit () {
            this.$refs.submitForm.validate((valid) => {
                if (valid) {
                    const submitForm = { };
                    if (this.submitForm.id) {
                        for (const k in this.submitForm) {
                            if (Object.hasOwnProperty.call(this.submitForm, k)) {
                                if (this.currectUser[k] !== this.submitForm[k]) {
                                    submitForm[k] = this.submitForm[k];
                                }
                            }
                        }
                        if (Object.keys(submitForm).length === 0) {
                            this.submitFormDialog = false;
                        } else {
                            submitForm.id = this.submitForm.id;
                            this.$authApi.EditUser(submitForm.id, submitForm).then(() => {
                                this.submitFormDialog = false
                                this.$message.success('操作成功')
                                this.search();
                            })
                        }
                    } else {
                        Object.assign(submitForm, this.submitForm);
                        submitForm.password = calcMD5('vue-auth' + submitForm.password);
                        this.$authApi.AddUser(submitForm).then((resData) => {
                            this.submitFormDialog = false
                            this.$message.success('操作成功')
                            this.search();
                        })
                    }
                }
            });
        },
        remove (row) {
            this.$authApi.DelUser(row.id).then(() => {
                this.$message({ type: 'success', message: '删除成功!' });
                this.search();
            })
        },
        sizeChange (value) {
            this.size = value
        },
        pageChange (val) {
            this.search(val)
        },
        changeEnabled (row, state) {
            this.$authApi.EditUser(row.id, { state: state }).then(() => {
                this.$message.success('操作成功')
            }).catch(() => { row.state = row.state === 1 ? 0 : 1 })
        }
    }
}
</script>
