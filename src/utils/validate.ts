// 验证字符串只能输入汉字、数字、大小写字母、空格（空格不能出现在首位和末位）和半角圆括号
export function validUserName(param) {
    let s = param
    let r = /^([\s]|[0-9]|[a-zA-Z]|[\u4e00-\u9fa5]|[\(\)]|[\（\）])*$/;
    let res = r.test(s);
    if (res) {
        let len = s.length;
        let trimLen = s.trim().length;
        if (len === trimLen) {
            return true;
        }
    }
    return false;
}

export function isExternal(path: string) {
    return /^(https?:|http?:|mailto:|tel:)/.test(path);
}
