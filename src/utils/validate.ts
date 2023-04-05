// 验证字符串只能输入汉字、数字、大小写字母、空格（空格不能出现在首位和末位）和半角圆括号
export function validUserName(param){
    const s = param
    const r = /^([\s]|[0-9]|[a-zA-Z]|[\u4e00-\u9fa5]|[\(\)]|[\（\）])*$/
    const res = r.test(s)
    if(res){
        const len = s.length
        const trimLen = s.trim().length
        if(len === trimLen){
            return true
        }
    }
    return false
}

export function isExternalUrl(path: string){
    return /^(https?:|http?:|mailto:|tel:)/.test(path)
}
