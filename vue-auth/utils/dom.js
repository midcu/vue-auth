
export function hasClass (el, cls) {
    if (!el || !cls) return false;
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
};

export function addClass (el, cls) {
    if (!el || !cls) return;
    var curClass = el.className;
    var classes = cls.split(/\s+/);

    for (var i = 0; i < classes.length; i++) {
        var clsName = classes[i];

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.setAttribute('class', curClass);
    }
};

export function removeClass (el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(/\s+/);
    var curClass = ' ' + el.className + ' ';

    for (var i = 0; i < classes.length; i++) {
        var clsName = classes[i];

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.setAttribute('class', trim(curClass));
    }
};

export function on (element, event, handler) {
    if (element && event && handler) {
        if (document.addEventListener) {
            element.addEventListener(event, handler, false);
        } else {
            element.attachEvent('on' + event, handler);
        }
    }
};

export function off (element, event, handler) {
    if (element && event && handler) {
        if (document.removeEventListener) {
            element.removeEventListener(event, handler, false);
        } else {
            element.detachEvent('on' + event, handler);
        }
    }
};

var scrollBarWidth = undefined;

export function getScrollBarWidth () {
    if (scrollBarWidth !== undefined) {
        return scrollBarWidth;
    }

    var outer = document.createElement('div');

    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    outer.style.overflow = 'scroll';

    document.body.appendChild(outer);

    scrollBarWidth = outer.offsetWidth - outer.clientWidth;

    outer.parentNode.removeChild(outer);

    return scrollBarWidth;
}

export function addResizeListener (targetNode, fn) {
    // 观察器的配置（需要观察什么变动）
    const config = { attributes: true, subtree: true };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver((mutationsList) => {
        let change = false;
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes') {
                change = true;
            }
        }
        if (change) fn();
    });
    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config);

    return observer;
}
