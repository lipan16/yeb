/**
 * Check if an element has a class
 * @param ele
 * @param cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))
}

/**
 * Add class to element
 * @param ele
 * @param cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += " " + cls
    }
}

/**
 * Remove class from element
 * @param ele
 * @param cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)")
        ele.className = ele.className.replace(reg, " ")
    }
}

/**
 * 获取url地址参数
 * @param paraName
 */
export function getUrlParam(paraName) {
    const url = document.location.toString()
    const arrObj = url.split("?")

    if (arrObj.length > 1) {
        const arrPara = arrObj[1].split("&")
        let arr

        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=")

            if (arr !== null && arr[0] === paraName) {
                return arr[1]
            }
        }
        return ""
    }
    return ""
}

/**
 * 根据码点截取字符串 可以截取四个字节的字符，如emoji表情
 *
 * @param pStart 开始位置
 * @param pEnd 结束位置
 * @returns {string}
 */
String.prototype.sliceByPoint = function (pStart: number, pEnd: number) {
    let result = "" // 截取的结果
    let pIndex = 0 // 码点的指针
    let cIndex = 0 // 码元的指针
    while (true) {
        if (pIndex >= pEnd || cIndex >= this.length) {
            break
        }
        // 获取字符的码点值
        const point = this.codePointAt(cIndex) as number
        if (pIndex >= pStart) {
            // 根据码点恢复字符
            result += String.fromCodePoint(point)
        }
        // 码点值大于0xFFFF 表示该字符存储占四个字节两个字符，码元的指针往后加2
        cIndex += point > 0xffff ? 2 : 1
        pIndex++
    }
    return result
}

// 😀
// console.log('😀死了'.sliceByPoint(0, 1))
// '\uD83D'
// console.log('😀死了'.slice(0, 1))

export function toggleClassName(flag: boolean, clsName: string, target?: HTMLElement) {
    const targetEl = target || document.body
    let {className} = targetEl
    className = className.replace(clsName, "")
    targetEl.className = (flag ? `${className} ${clsName}` : className).trim()
}

export function getRandomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

// ts 类型校验：可以是任何类型，但不能是日期
type BanDate<T> = T extends Date ? never : T
