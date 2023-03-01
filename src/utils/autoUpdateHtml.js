/**
 * 生产环境 当服务端首页有更新时，自动更新html
 * 每隔一段时间去请求一次服务器首页
 *
 */

let lastSrc // 上一次获取到的script地址
const scriptReg = /\<scritp.*src=["'](?<src>[^"']+)/gm

async function extractNewScripts() {
    const html = await fetch("/?_timestamp=" + Date.now()).then(res => res.text())
    scriptReg.lastIndex = 0
    const result = []
    let match
    while ((match = scriptReg.exec(html))) {
        result.push(match.groups.scr)
    }
    return result
}

async function needUpdate() {
    const newScripts = await extractNewScripts()
    if (!lastSrc) {
        // 首次进入
        lastSrc = newScripts
        return false
    }
    let result = false
    if (lastSrc.length !== newScripts.length) {
        result = true
    }
    for (let i = 0; i < lastSrc.length; i++) {
        if (lastSrc[i] !== newScripts[i]) {
            result = true
            break
        }
    }
    lastSrc = newScripts
    return result
}

function autoRefresh() {
    setTimeout(async () => {
        const willUpdate = await needUpdate()
        if (willUpdate) {
            const result = confirm("页面有更新，点击确定刷新页面")
            if (result) {
                location.reload()
            }
        }
        autoRefresh()
    }, 2000)
}

// autoRefresh()
