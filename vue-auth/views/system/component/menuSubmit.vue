<template>
    <el-dialog custom-class="va-dialog-submit" top="5vh" :visible="visible" title="菜单" width="580px" :close-on-click-modal="false" @close="closeDialog">
        <el-form ref="submitForm" :model="submitForm" :rules="rules" size="small" label-width="80px">
            <el-form-item label="菜单类型">
                <el-radio-group v-model="submitForm.type" size="mini">
                    <el-radio-button v-for="(val, i) in menuType" :key="i" :label="i">{{ val }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="menuType[submitForm.type] + '名称'" prop="title">
                <el-input v-model="submitForm.title" :placeholder="menuType[submitForm.type] + '名称'" />
            </el-form-item>
            <el-form-item v-if="submitForm.type !== 2" label="路由地址" prop="path">
                <el-input v-model="submitForm.path" placeholder="路由地址" />
            </el-form-item>
            <el-form-item label="上级目录" prop="pid">
                <el-cascader ref="menuCascader" v-model="submitForm.pid"
                             style="width: 100%;" placeholder="选择上级类目（默认为根目录）"
                             :options="menulist"
                             :props="{ value: 'id', label: 'title', checkStrictly: true, emitPath: false, expandTrigger:'hover' }"
                             @change="pidChange"
                >
                    <template slot-scope="{ node, data }">
                        <span>{{ data.title }}</span>
                        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                    </template>
                </el-cascader>
            </el-form-item>
            <el-form-item v-show="submitForm.type !== 2" label="菜单图标">
                <el-col :span="11">
                    <el-form-item style="margin-bottom: 0px;">
                        <el-input
                            v-model="submitForm.icon"
                            placeholder="请输入图标"
                            :suffix-icon="submitForm.icon"
                        />
                    </el-form-item>
                </el-col>
                <el-col :offset="1" :span="12">
                    <el-form-item label="菜单可见" style="margin-bottom: 0px;">
                        <el-radio-group v-model="submitForm.display" class="va-full-radio">
                            <el-radio-button :label="true">是</el-radio-button>
                            <el-radio-button :label="false">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item v-show="submitForm.type === 1" label="组件名称">
                <el-col :span="11">
                    <el-form-item style="margin-bottom: 0px;">
                        <el-input v-model="submitForm.componentName" placeholder="匹配组件内Name字段" />
                    </el-form-item>
                </el-col>
                <el-col :offset="1" :span="12">
                    <el-form-item label="内嵌页面" style="margin-bottom: 0px;">
                        <el-radio-group v-model="submitForm.iframe" class="va-full-radio">
                            <el-radio-button :label="true">是</el-radio-button>
                            <el-radio-button :label="false">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item v-if="submitForm.iframe === true && submitForm.type === 1" label="内嵌路径" prop="iframeSrc">
                <el-input v-model="submitForm.iframeSrc" placeholder="内嵌路径" />
            </el-form-item>
            <el-form-item v-if="submitForm.type === 1" label="组件路径">
                <el-input v-model="submitForm.component" placeholder="组件路径" />
            </el-form-item>
            <el-form-item v-if="submitForm.type !== 2" label="页面结构" prop="layout">
                <el-col :span="11">
                    <el-form-item style="margin-bottom: 0px;" prop="layout">
                        <el-select v-model="submitForm.layout" placeholder="选择页面的结构样式">
                            <el-option
                                v-for="item in [{ name: '默认', value: 'default' }, { name: '无样式（例：登录页面）', value: '' }]"
                                :key="item.value" :label="item.name" :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :offset="1" :span="12">
                    <el-form-item label="菜单排序" style="margin-bottom: 0px;">
                        <el-input-number v-model.number="submitForm.sort" :min="0" controls-position="right" style="width: 100%;" />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="所属系统" prop="platformId">
                <el-col :span="11">
                    <el-form-item prop="platformId" style="margin-bottom: 0px;">
                        <el-select v-model="submitForm.platformId" placeholder="请选择">
                            <el-option v-for="platfrom in platforms" :key="platfrom.id" :label="platfrom.name" :value="platfrom.id"> </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :offset="1" :span="12">
                    <el-form-item label="权限标识" style="margin-bottom: 0px;">
                        <el-input v-model="submitForm.permission" placeholder="权限标识" />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="菜单描述">
                <el-input v-model="submitForm.description" type="textarea" :rows="2" placeholder="描述" />
            </el-form-item>
            <el-form-item style="text-align: right;">
                <el-button @click="closeDialog()">取消</el-button>
                <el-button type="primary" @click="submit('submitForm')">{{ form && form.id ? '保存' : '创建' }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    name: 'va-menu-submit',
    props: ['form', 'menus', 'visible', 'platforms'],
    data () {
        return {
            menuType: ['目录', '菜单'],
            submitForm: {
                type: 0,
                title: '',
                path: '',
                layout: 'default',
                component: '',
                componentName: '',
                iframe: false,
                iframeSrc: '',
                pid: 1,
                icon: '',
                display: false,
                sort: 1,
                permission: '',
                state: 1,
                description: '',
                platformId: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                path: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ],
                pid: [
                    { required: true, message: '请输入上级目录', trigger: 'blur' }
                ],
                layout: [
                    { required: true, message: '请选择页面结构', trigger: 'blur' }
                ],
                iframeSrc: [
                    { required: true, message: '请输入路径', trigger: 'blur' }
                ],
                platformId: [
                    { required: true, message: '请选择所属系统', trigger: 'blur' }
                ]
            },
            menulist: []
        }
    },
    watch: {
        form () {
            this.initform()
            this.initMenuList();
        },
        menus () {
            this.initMenuList()
        }
    },
    mounted () {
        this.initMenuList()
    },
    methods: {
        submit () {
            this.$refs.submitForm.validate((valid) => {
                if (valid) {
                    const submitForm = { };
                    for (const key in this.submitForm) {
                        if (Object.prototype.hasOwnProperty.call(this.submitForm, key)) {
                            if (this.form && this.form.id && this.form[key] === this.submitForm[key]) {
                                continue;
                            }
                            submitForm[key] = this.submitForm[key]
                        }
                    }
                    if (this.form && this.form.id) {
                        submitForm.id = this.form.id;
                    }
                    if (Object.keys(submitForm).length === 0) {
                        this.$emit('update:visible', false);
                    } else {
                        this.$emit('submit', submitForm);
                    }
                }
            })
        },
        initMenuList () {
            this.menulist = [{ id: 1, title: '根级目录' }].concat(this.menus);
        },
        initform () {
            if (this.$refs.submitForm) {
                this.$refs.submitForm.clearValidate();
            }

            if (this.form) {
                for (const key in this.submitForm) {
                    if (Object.prototype.hasOwnProperty.call(this.submitForm, key)) {
                        this.submitForm[key] = this.form[key];
                    }
                }
            } else {
                this.resetSubmitForm()
            }
        },
        resetSubmitForm () {
            this.submitForm = {
                type: 0,
                title: '',
                path: '',
                layout: 'default',
                component: '',
                componentName: '',
                iframe: false,
                iframeSrc: '',
                pid: 1,
                icon: '',
                display: false,
                sort: 1,
                permission: '',
                state: 1,
                description: '',
                platformId: ''
            }
        },
        closeDialog () {
            this.$emit('update:visible', false);
        },
        pidChange () {
            const nodes = this.$refs.menuCascader.getCheckedNodes();
            if (nodes.length > 0) {
                if (nodes[0].data.children) {
                    this.submitForm.sort = nodes[0].data.sort * 100 + nodes[0].data.children.length + 1;
                } else {
                    this.submitForm.sort = nodes[0].data.sort * 100 + 1;
                }
            }
        }
    }
}
</script>
