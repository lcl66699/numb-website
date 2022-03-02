/**
 * @description: 
 * @param {*} vm : this
 * @param {*} parent : 瀑布流组件
 * @param {*} arg:{cols ： 设置列数, margin：父元素设置的margin, vgap:块之间的水平间隙,hgap ： 块之间的竖直间隙}
 * @return {*}
 */
function waterFall(vm, parent, arg) {
    const divVGap = arg.vgap || 20
    const divHGap = arg.hgap || 20
    const columns = arg.cols || 3; //默认3列
    const margin = arg.margin || 0;

    // 1 确定图片的宽度 - 滚动条宽度
    const pageWidth = parent.clientWidth - divVGap * columns - margin * 2 - 8;
    const itemWidth = parseInt(pageWidth / columns); //得到item的宽度
    const list = Array.from(parent.children)
    // 设置到item的宽度
    list.forEach((item, i) => {
        item.style.width = itemWidth + 'px'; //设置到item的宽度
    })
    vm.$nextTick(() => {
        setTimeout(() => {
            const arr = []; // 存储每列当前高度
            list.forEach((item, i) => {
                const height = item.clientHeight || item.offsetHeight;
                if (i < columns) {
                    // 2 第一行按序布局 
                    item.setAttribute("style", `top:0; left:${(itemWidth) * i + divVGap * i}px; width:${itemWidth}px`)
                    //将行高push到数组
                    arr.push(height);
                } else {
                    // 其他行
                    // 3 找到数组中最小高度  和 它的索引
                    // 这种写法虽短，但没有下面的效率高
                    // const minHeight = Math.min(...arr);
                    // const index = arr.findIndex(item => item === minHeight);

                    let minHeight = arr[0];
                    let index = 0;
                    for (let j = 0; j < arr.length; j++) {
                        if (minHeight > arr[j]) {
                            minHeight = arr[j];
                            index = j;
                        }
                    }

                    // 4 设置下一行的第一个盒子位置  top值就是最小列的高度
                    // 1.8ms：耗时 
                    // item.style.top = `${arr[index] + divHGap}px`
                    // item.style.left = `${(itemWidth) * index + divVGap * index}px`

                    // 0.3ms： 多个设置和合并成一个设置，性能更优，注意要加上width设置，此操作会把上面的width覆盖掉
                    item.setAttribute("style", `top:${arr[index] + divHGap}px; left:${(itemWidth) * index + divVGap * index}px; width:${itemWidth}px`)

                    // 5 修改最小列的高度
                    // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 竖直间隔
                    arr[index] = arr[index] + height + divHGap;
                }
            })
        }, 100)
    })
}

//clientWidth 处理兼容性
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}

export { getClient, waterFall }
