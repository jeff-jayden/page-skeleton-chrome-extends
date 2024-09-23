!function (e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var r = t[o] = {i: o, l: !1, exports: {}};
        return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var r in e) n.d(o, r, function (t) {
            return e[t]
        }.bind(null, r));
        return o
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 6)
}({
    0: function (e, t, n) {
        "use strict";
        let o = [];
        chrome.runtime && chrome.runtime.onMessage.addListener((e, t, n) => {
            let {command: r, content: i} = e;
            Array.isArray(o[r]) && o[r].forEach(e => {
                e(i, t, n)
            })
        }), t.a = {
            on(e, t, n = !1) {
                o[e] || (o[e] = []), "function" == typeof t && (o[e].length, n ? o[e].push(t) : o[e] = [t])
            }, emit(e, t, n) {
                n ? chrome.tabs.sendMessage(n, {command: e, content: t}) : chrome.runtime.sendMessage({
                    command: e,
                    content: t
                })
            }, showAllListener() {
            }
        }
    }, 6: function (e, t, n) {
        "use strict";
        n.r(t);
        var o = n(0), r = {
            showTip(e, t) {
                let n = Object.assign({type: "basic", iconUrl: "images/icon38.png", title: "", message: ""}, t);
                (e = e.replace("\n", " ")).length > 35 ? n.message = e.substr(0, 35) + "..." : n.message = e, chrome.notifications.create("@@notify", n), setTimeout(() => {
                    chrome.notifications.clear("@@notify")
                }, 5e3)
            }, sendMessageToCurrentTab: e => new Promise((t, n) => {
                chrome.tabs.query({active: !0, currentWindow: !0}, (function (n) {
                    chrome.tabs.sendMessage(n[0].id, e, (function (e) {
                        t(e)
                    }))
                }))
            }), getCurrentTab: () => new Promise((e, t) => {
                chrome.tabs.query({active: !0, currentWindow: !0}, (function (t) {
                    e(t[0])
                }))
            }), reloadAndRefreshCurrentTab() {
                this.getCurrentTab().then(e => {
                    chrome.tabs.reload(e.id), chrome.runtime.reload()
                })
            }, openExtensionPage: e => `chrome-extension://${chrome.runtime.id}/${e}.html`
        };
        new Vue({
            el: "#app", data: () => ({visible: !1, currentSkeletonScreen: {}, config: ""}), watch: {
                config() {
                    localStorage.setItem("config", this.config)
                }
            }, created() {
                localStorage.getItem("currentSkeletonScreen") && (this.visible = !0), this.initConfig(), this.getSkeletonInfo(), o.a.on("createSkeletonOk", () => {
                    this.visible = !0
                })
            }, methods: {
                initConfig() {
                    const e = localStorage.getItem("config");
                    this.config = e || JSON.stringify({
                        loading: "chiaroscuro",
                        text: {color: "#EEEEEE"},
                        image: {shape: "rect", color: "#EFEFEF", shapeOpposite: []},
                        button: {color: "#EFEFEF", excludes: []},
                        svg: {color: "#EFEFEF", shape: "circle", shapeOpposite: []},
                        pseudo: {color: "#EFEFEF", shape: "circle", shapeOpposite: []}
                    })
                }, createSkeleton() {
                    r.getCurrentTab().then(e => {
                        let {id: t} = e;
                        o.a.emit("createSkeleton", this.config, t)
                    })
                }, getSkeletonInfo() {
                    o.a.on("createSkeletonInfo", e => {
                        this.currentSkeletonScreen = e, localStorage.setItem("currentSkeletonScreen", JSON.stringify(this.currentSkeletonScreen))
                    })
                }, handleEdit() {
                    Object.keys(this.currentSkeletonScreen).length ? chrome.tabs.create({url: chrome.extension.getURL("./preview/index.html")}) : this.$message({
                        showClose: !0,
                        message: "请先生成骨架屏",
                        type: "warning"
                    })
                }, handleCopy() {
                    var e = document.createElement("input");
                    e.setAttribute("value", this.currentSkeletonScreen.html), document.body.appendChild(e), e.select();
                    var t = document.execCommand("copy");
                    document.body.removeChild(e), t ? this.$message({
                        showClose: !0,
                        message: "拷贝骨架屏代码片段成功！",
                        type: "success"
                    }) : this.$message({showClose: !0, message: "拷贝骨架屏代码片段成功！", type: "error"})
                }, concact() {
                    window.open("https://www.yuque.com/wanggangfeng/bsp75t/inu4gw")
                }
            }
        })
    }
});

//@ sourceMappingURL=popup.js.map
