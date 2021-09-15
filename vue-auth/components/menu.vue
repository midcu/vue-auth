<script>
export default {
    name: 'va-menu',
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        },
        notitle: {
            type: Boolean,
            default: false
        },
        menudata: {
            type: Array,
            default: () => []
        },
        mode: {
            type: String,
            default: 'vertical'
        }
    },
    data () {
        return {
            activeIndex: undefined
        }
    },
    watch: {
        '$route.name': function () {
            this.initActiveIndex(this.menudata);
        }
    },
    mounted () {
        this.initActiveIndex(this.menudata);
    },
    methods: {
        toggleSideBar (event) {
            this.$emit('collapse', !this.isCollapse)
            event.stopPropagation()
        },
        initActiveIndex (menudata) {
            for (const data of menudata) {
                if (data.meta.display) {
                    this.activeIndex = data.path;
                }
                if (data.name === this.$route.name) {
                    return true;
                } else if (Array.isArray(data.children)) {
                    if (this.initActiveIndex(data.children)) {
                        return true;
                    }
                }
            }
        }
    },
    render (h) {
        const menuItem = (item) => {
            // 带有二级菜单：1：目录；2：菜单
            if ((item.children && item.children.find((child) => child.meta.display)) || (item.meta && item.meta.type === 0)) {
                const sub = [h('template', { slot: 'title' },
                    [
                        h('i', { class: item.meta && item.meta.icon ? item.meta.icon : 'el-icon-menu' }),
                        h('span', item.meta ? item.meta.title : item.name)
                    ]
                )];
                if (item.children && Array.isArray(item.children)) {
                    for (const i of item.children) {
                        if (i.meta.display) {
                            sub.push(menuItem(i))
                        }
                    }
                }

                return h('el-submenu', { props: { index: item.path } }, sub)
            } else {
                return h('el-menu-item', { props: { index: item.path } }, [
                    h('i', { class: item.meta && item.meta.icon ? item.meta.icon : 'el-icon-menu' }),
                    h('span', item.meta ? item.meta.title : item.name)
                ])
            }
        }

        const subMenu = []

        if (!this.notitle) {
            subMenu.push(
                h('el-menu-item', { props: { index: 'main' }, style: 'padding: 0px' }, [
                    h('div', { style: 'padding: 0 20px', on: { click: this.toggleSideBar } }, [
                        h('i', { class: 'el-icon-s-fold' }),
                        h('span', this.$store.state.props.headerName)
                    ])
                ])
            )
        }

        if (this.menudata) {
            for (const i of this.menudata) {
                if (i.meta.display) {
                    subMenu.push(menuItem(i))
                }
            }
        }

        return h('el-menu', { props: { mode: this.mode, 'default-active': this.activeIndex, collapse: this.isCollapse, router: true, 'unique-opened': true } }, subMenu)
    }
}

</script>
