
import { on, off } from '../utils/dom'

const BAR_MAP = {
    vertical: {
        offset: 'offsetHeight',
        scroll: 'scrollTop',
        scrollSize: 'scrollHeight',
        size: 'height',
        key: 'vertical',
        axis: 'Y',
        client: 'clientY',
        direction: 'top'
    },
    horizontal: {
        offset: 'offsetWidth',
        scroll: 'scrollLeft',
        scrollSize: 'scrollWidth',
        size: 'width',
        key: 'horizontal',
        axis: 'X',
        client: 'clientX',
        direction: 'left'
    }
}
function renderThumbStyle ({ move, size, bar }) {
    const style = {};
    const translate = `translate${bar.axis}(${move}%)`;

    style[bar.size] = size;
    style.transform = translate;
    style.msTransform = translate;
    style.webkitTransform = translate;

    return style;
};

export default {
    name: 'bar',
    props: {
        vertical: Boolean,
        size: String,
        move: Number
    },
    data () {
        return {
            prevPage: 0
        }
    },
    computed: {
        bar () {
            return BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
        }
    },
    render: function (h) {
        const thumb = h('div', {
            ref: 'thumb',
            class: 'va-scrollbar-thumb',
            on: {
                mousedown: (e) => this.clickThumbHandler(e)
            },
            style: renderThumbStyle({ size: this.size, move: this.move, bar: this.bar })
        })

        return h('div', { class: 'va-scrollbar-bar ' + 'va-is-' + this.bar.key, on: { mousedown: (e) => this.mouseDownDocumentHandler(e) } }, [thumb]);
    },
    methods: {
        clickThumbHandler: function (e) {
            if (e.ctrlKey || e.button === 2) {
                return;
            }
            this.startDrag(e);
            this.prevPage = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]));
        },
        startDrag: function (e) {
            e.stopImmediatePropagation();

            on(document, 'mousemove', this.mouseMoveDocumentHandler);
            on(document, 'mouseup', this.mouseUpDocumentHandler);
            document.onselectstart = () => false;
        },
        mouseDownDocumentHandler (e) {
            const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
            const thumbHalf = (this.$refs.thumb[this.bar.offset] / 2);
            const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$el[this.bar.offset]);
            this.$emit('thumbPosition', { thumbPositionPercentage, bar: this.bar });
        },
        mouseMoveDocumentHandler (e) {
            if (!this.prevPage) return;

            const offset = ((this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1);
            const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - this.prevPage);
            const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el[this.bar.offset]);

            this.$emit('thumbPosition', { thumbPositionPercentage, bar: this.bar });
        },

        mouseUpDocumentHandler (e) {
            this.cursorDown = false;
            this.prevPage = 0;
            off(document, 'mousemove', this.mouseMoveDocumentHandler);
            off(document, 'mouseup', this.mouseUpDocumentHandler);
            document.onselectstart = null;
        }
    }
}
