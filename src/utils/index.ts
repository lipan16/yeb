/**
 * Check if an element has a class
 * @param ele
 * @param cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param ele
 * @param cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param ele
 * @param cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

/**
 * 获取url地址参数
 * @param paraName
 */
export function getUrlParam(paraName) {
    let url = document.location.toString()
    let arrObj = url.split('?')

    if (arrObj.length > 1) {
        let arrPara = arrObj[1].split('&')
        let arr

        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split('=')

            if (arr != null && arr[0] == paraName) {
                return arr[1]
            }
        }
        return ''
    } else {
        return ''
    }
}
