// 所有自定义指令

export const imageerror = {
    inserted(dom, opation) {
        dom.onerror = function() {
            dom.src = opation.value
        }
    }
}