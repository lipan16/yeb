import {delay} from 'lodash'

/**
 * Check if an element has a class
 * @param ele
 * @param cls
 * @returns {boolean}
 */
export function hasClass(ele, cls){
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param ele
 * @param cls
 */
export function addClass(ele, cls){
    if(!hasClass(ele, cls)){
        ele.className += ' ' + cls
    }
}

/**
 * Remove class from element
 * @param ele
 * @param cls
 */
export function removeClass(ele, cls){
    if(hasClass(ele, cls)){
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

/**
 * 获取url地址参数
 * @param paraName
 */
export function getUrlParam(paraName){
    const url = document.location.toString()
    const arrObj = url.split('?')

    if(arrObj.length > 1){
        const arrPara = arrObj[1].split('&')
        let arr

        for(const element of arrPara){
            arr = element.split('=')

            if(arr !== null && arr[0] === paraName){
                return arr[1]
            }
        }
        return ''
    }
    return ''
}

/**
 * 根据码点截取字符串 可以截取四个字节的字符，如emoji表情
 *
 * @param pStart 开始位置
 * @param pEnd 结束位置
 * @returns {string}
 */
// ts-ignore
String.prototype.sliceByPoint = function(pStart: number, pEnd: number){
    let result = '' // 截取的结果
    let pIndex = 0 // 码点的指针
    let cIndex = 0 // 码元的指针
    while(true){
        if(pIndex >= pEnd || cIndex >= this.length){
            break
        }
        // 获取字符的码点值
        const point = this.codePointAt(cIndex) as number
        if(pIndex >= pStart){
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

export function toggleClassName(flag: boolean, clsName: string, target?: HTMLElement){
    const targetEl = target || document.body
    let {className} = targetEl
    className = className.replace(clsName, '')
    targetEl.className = (flag ? `${className} ${clsName}` : className).trim()
}

export function getRandomColor(){
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

// ts 类型校验：可以是任何类型，但不能是日期
type BanDate<T> = T extends Date ? never : T

// 数据前端脱敏
export function dataMasking(data = '', type = 'default'){
    switch(type){
        case 'phone':
            return data.replace(/(\d{3})\d*(\d{4})/, '$1****$2') // 手机号脱敏
        case 'name':
            let name = ''
            if(data.length <= 3){
                name = '*' + data.substring(1, data.length)
            }else if(data.length > 3 && data.length <= 6){
                name = '**' + data.substring(2, data.length)
            }else if(data.length > 6){
                name = data.substring(0, 2) + '****' + data.substring(6, data.length)
            }
            return name
        case 'card':
            return data.replace(/^(.{4})(?:\w+)(.{4})$/, '$1****$2')
        default:
            return data
    }
}

export function closuresTest(){
    let index = 0
    function add(){
        index++
    }
    return add
}

// let test = closuresTest() // 函数名是一个标识（指向函数的指针），而()才是执行函数
// test() // 1
// test() // 2 第二次调用index变量还在内存中

// 加千分位符
export const moneyFormat = money => {
    const num = Number(money)
    if(isNaN(num)){
        return money
    }
    const res1 = num.toLocaleString('en')
    const res2 = Intl.NumberFormat().format(num)
    const res3 = num.toString().replace(/(?!^)(?=(\d{3})+\.)/g, ',')
    const res4 = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return res1
}

// 防抖 n秒后在执行，如果n秒内被重新触发，则重新计时
export const debounce = (fn, wait) => {
    let timer = null
    return function(){
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this
        const args = arguments
        if(timer){
            clearTimeout(timer)
            timer = null
        }

        // @ts-ignore
        timer = setTimeout(() => {
            fn.apply(that, args)
        }, wait)
    }
}

// 节流 在单位时间内，只有一次能生效
export const throttle = (fn, delay) => {
    let preTime = Date.now()
    return function(){
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this
        const args = arguments
        const nowTime = Date.now()

        if(nowTime - preTime >= delay){
            preTime = Date.now()
            return fn.apply(that, args)
        }
    }
}
