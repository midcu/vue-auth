export default {
    name: 'VaMain',
    data () {
        return { }
    },
    render (h) {
        return h(this.layout)
    },
    mounted () {
    },
    computed: {
        layout () {
            if (this.$route.meta && this.$route.meta.layout && this.$root.$options.components[this.$route.meta.layout]) {
                return this.$route.meta.layout
            } else if (this.$route.meta && this.$route.meta.layout && this.$store && this.$store.state.props && this.$store.state.props.layoutName && this.$root.$options.components[this.$store.state.props.layoutName]) {
                return this.$store.state.props.layoutName;
            } else {
                // layout值为空
                return 'router-view';
            }
        }
    }
}
