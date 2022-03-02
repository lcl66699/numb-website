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


/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getFullYear() + '年' +
            (d.getMonth() + 1) +
            '月' +
            d.getDate() +
            '日  ' +
            d.getHours() +
            ':' +
            d.getMinutes()
        )
    }
}