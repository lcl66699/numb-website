//防抖函数
export function debounce(fn, wait) {
    var timeout = null;
    return function () {
        if (timeout !== null) {
            clearInterval(timeout);
        }
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait);
    };
}

//节流实现，兼顾了首节流和尾节流
export function throttle(fn, delay) {
    var last = 0;
    var timer = null;
    return function () {
        const now = Date.now();
        clearInterval(timer);
        if (now - last >= delay) {
            fn.call(this, ...arguments);
            last = Date.now();
        } else {
            timer = setTimeout(() => {
                fn.call(this, ...arguments);
                last = Date.now();
            }, delay);
        }
    };
}