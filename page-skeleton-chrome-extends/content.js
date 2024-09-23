!function (n) {
    var e = {};

    function t(r) {
        if (e[r]) return e[r].exports;
        var o = e[r] = {i: r, l: !1, exports: {}};
        return n[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }

    t.m = n, t.c = e, t.d = function (n, e, r) {
        t.o(n, e) || Object.defineProperty(n, e, {enumerable: !0, get: r})
    }, t.r = function (n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: !0})
    }, t.t = function (n, e) {
        if (1 & e && (n = t(n)), 8 & e) return n;
        if (4 & e && "object" == typeof n && n && n.__esModule) return n;
        var r = Object.create(null);
        if (t.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: n
        }), 2 & e && "string" != typeof n) for (var o in n) t.d(r, o, function (e) {
            return n[e]
        }.bind(null, o));
        return r
    }, t.n = function (n) {
        var e = n && n.__esModule ? function () {
            return n.default
        } : function () {
            return n
        };
        return t.d(e, "a", e), e
    }, t.o = function (n, e) {
        return Object.prototype.hasOwnProperty.call(n, e)
    }, t.p = "", t(t.s = 5)
}([function (n, e, t) {
    "use strict";
    let r = [];
    chrome.runtime && chrome.runtime.onMessage.addListener((n, e, t) => {
        let {command: o, content: a} = n;
        Array.isArray(r[o]) && r[o].forEach(n => {
            n(a, e, t)
        })
    }), e.a = {
        on(n, e, t = !1) {
            r[n] || (r[n] = []), "function" == typeof e && (r[n].length, t ? r[n].push(e) : r[n] = [e])
        }, emit(n, e, t) {
            t ? chrome.tabs.sendMessage(t, {command: n, content: e}) : chrome.runtime.sendMessage({
                command: n,
                content: e
            })
        }, showAllListener() {
        }
    }
}, function (n, e, t) {
    "use strict";
    n.exports = function (n) {
        var e = [];
        return e.toString = function () {
            return this.map((function (e) {
                var t = function (n, e) {
                    var t, r, o, a = n[1] || "", i = n[3];
                    if (!i) return a;
                    if (e && "function" == typeof btoa) {
                        var c = (t = i, r = btoa(unescape(encodeURIComponent(JSON.stringify(t)))), o = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r), "/*# ".concat(o, " */")),
                            s = i.sources.map((function (n) {
                                return "/*# sourceURL=".concat(i.sourceRoot || "").concat(n, " */")
                            }));
                        return [a].concat(s).concat([c]).join("\n")
                    }
                    return [a].join("\n")
                }(e, n);
                return e[2] ? "@media ".concat(e[2], " {").concat(t, "}") : t
            })).join("")
        }, e.i = function (n, t, r) {
            "string" == typeof n && (n = [[null, n, ""]]);
            var o = {};
            if (r) for (var a = 0; a < this.length; a++) {
                var i = this[a][0];
                null != i && (o[i] = !0)
            }
            for (var c = 0; c < n.length; c++) {
                var s = [].concat(n[c]);
                r && o[s[0]] || (t && (s[2] ? s[2] = "".concat(t, " and ").concat(s[2]) : s[2] = t), e.push(s))
            }
        }, e
    }
}, function (n, e, t) {
    var r = t(3), o = t(4);
    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [[n.i, o, ""]]);
    r(o, {insert: "head", singleton: !1}), n.exports = o.locals || {}
}, function (n, e, t) {
    "use strict";
    var r, o = function () {
        var n = {};
        return function (e) {
            if (void 0 === n[e]) {
                var t = document.querySelector(e);
                if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
                    t = t.contentDocument.head
                } catch (n) {
                    t = null
                }
                n[e] = t
            }
            return n[e]
        }
    }(), a = [];

    function i(n) {
        for (var e = -1, t = 0; t < a.length; t++) if (a[t].identifier === n) {
            e = t;
            break
        }
        return e
    }

    function c(n, e) {
        for (var t = {}, r = [], o = 0; o < n.length; o++) {
            var c = n[o], s = e.base ? c[0] + e.base : c[0], d = t[s] || 0, l = "".concat(s, " ").concat(d);
            t[s] = d + 1;
            var p = i(l), u = {css: c[1], media: c[2], sourceMap: c[3]};
            -1 !== p ? (a[p].references++, a[p].updater(u)) : a.push({
                identifier: l,
                updater: m(u, e),
                references: 1
            }), r.push(l)
        }
        return r
    }

    function s(n) {
        var e = document.createElement("style"), r = n.attributes || {};
        if (void 0 === r.nonce) {
            var a = t.nc;
            a && (r.nonce = a)
        }
        if (Object.keys(r).forEach((function (n) {
            e.setAttribute(n, r[n])
        })), "function" == typeof n.insert) n.insert(e); else {
            var i = o(n.insert || "head");
            if (!i) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            i.appendChild(e)
        }
        return e
    }

    var d, l = (d = [], function (n, e) {
        return d[n] = e, d.filter(Boolean).join("\n")
    });

    function p(n, e, t, r) {
        var o = t ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
        if (n.styleSheet) n.styleSheet.cssText = l(e, o); else {
            var a = document.createTextNode(o), i = n.childNodes;
            i[e] && n.removeChild(i[e]), i.length ? n.insertBefore(a, i[e]) : n.appendChild(a)
        }
    }

    var u = null, h = 0;

    function m(n, e) {
        var t, r, o;
        if (e.singleton) {
            var a = h++;
            t = u || (u = s(e)), r = p.bind(null, t, a, !1), o = p.bind(null, t, a, !0)
        } else t = s(e), r = function (n, e, t) {
            var r = t.css, o = t.media, a = t.sourceMap;
            if (o ? n.setAttribute("media", o) : n.removeAttribute("media"), a && "undefined" != typeof btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a)))), " */")), n.styleSheet) n.styleSheet.cssText = r; else {
                for (; n.firstChild;) n.removeChild(n.firstChild);
                n.appendChild(document.createTextNode(r))
            }
        }.bind(null, t, e), o = function () {
            !function (n) {
                if (null === n.parentNode) return !1;
                n.parentNode.removeChild(n)
            }(t)
        };
        return r(n), function (e) {
            if (e) {
                if (e.css === n.css && e.media === n.media && e.sourceMap === n.sourceMap) return;
                r(n = e)
            } else o()
        }
    }

    n.exports = function (n, e) {
        (e = e || {}).singleton || "boolean" == typeof e.singleton || (e.singleton = (void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), r));
        var t = c(n = n || [], e);
        return function (n) {
            if (n = n || [], "[object Array]" === Object.prototype.toString.call(n)) {
                for (var r = 0; r < t.length; r++) {
                    var o = i(t[r]);
                    a[o].references--
                }
                for (var s = c(n, e), d = 0; d < t.length; d++) {
                    var l = i(t[d]);
                    0 === a[l].references && (a[l].updater(), a.splice(l, 1))
                }
                t = s
            }
        }
    }
}, function (n, e, t) {
    "use strict";
    t.r(e);
    var r = t(1), o = t.n(r)()(!0);
    o.push([n.i, "\r\n.sk * {\r\n    color: #eee;\r\n}\r\n\r\n.sk-text {\r\n    --c: #eee;\r\n    --fp: 0%;\r\n    --sp: 0%;\r\n    --lh: 0;\r\n\r\n    display: inline-block;\r\n    background-origin: content-box !important;\r\n    background-clip: content-box !important;\r\n    background-color: transparent !important;\r\n    background-repeat: repeat-y !important;\r\n    /*color: var(--c) !important;*/\r\n    background-image: linear-gradient(transparent var(--fp), var(--c) 0, var(--c) var(--sp), transparent 0);\r\n    background-size: 100% var(--lh);\r\n    color: transparent !important;\r\n\r\n}\r\n\r\n.sk-text > * {\r\n    color: transparent;\r\n}\r\n\r\n.sk-button {\r\n    color: #eee !important;\r\n    background: #eee !important;\r\n    border: none !important;\r\n    box-shadow: none !important;\r\n    outline: none !important;\r\n}\r\n\r\n.sk-border {\r\n    /*outline: 1px solid #eee !important;*/\r\n    border-color: #eee;\r\n}\r\n\r\n.sk-bg {\r\n    background: #eee !important;\r\n}\r\n\r\n.sk-list {\r\n    color: #eee;\r\n}\r\n\r\n.sk-input {\r\n    background: #eee !important;\r\n    color: transparent !important;\r\n    border-color: transparent;\r\n}\r\n\r\n.sk-input::-webkit-input-placeholder {\r\n    color: transparent !important;\r\n}\r\n\r\n.sk-block {\r\n    background-color: #eee !important;\r\n    border-color: #eee !important;\r\n}\r\n\r\n.sk-ignore {\r\n    opacity: 0;\r\n}\r\n", "", {
        version: 3,
        sources: ["webpack://src/style/index.css"],
        names: [],
        mappings: ";AACA;IACI,WAAW;AACf;;AAEA;IACI,SAAS;IACT,QAAQ;IACR,QAAQ;IACR,OAAO;;IAEP,qBAAqB;IACrB,yCAAyC;IACzC,uCAAuC;IACvC,wCAAwC;IACxC,sCAAsC;IACtC,8BAA8B;IAC9B,uGAAuG;IACvG,+BAA+B;IAC/B,6BAA6B;;AAEjC;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,sBAAsB;IACtB,2BAA2B;IAC3B,uBAAuB;IACvB,2BAA2B;IAC3B,wBAAwB;AAC5B;;AAEA;IACI,sCAAsC;IACtC,kBAAkB;AACtB;;AAEA;IACI,2BAA2B;AAC/B;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,2BAA2B;IAC3B,6BAA6B;IAC7B,yBAAyB;AAC7B;;AAEA;IACI,6BAA6B;AACjC;;AAEA;IACI,iCAAiC;IACjC,6BAA6B;AACjC;;AAEA;IACI,UAAU;AACd",
        sourcesContent: ["\r\n.sk * {\r\n    color: #eee;\r\n}\r\n\r\n.sk-text {\r\n    --c: #eee;\r\n    --fp: 0%;\r\n    --sp: 0%;\r\n    --lh: 0;\r\n\r\n    display: inline-block;\r\n    background-origin: content-box !important;\r\n    background-clip: content-box !important;\r\n    background-color: transparent !important;\r\n    background-repeat: repeat-y !important;\r\n    /*color: var(--c) !important;*/\r\n    background-image: linear-gradient(transparent var(--fp), var(--c) 0, var(--c) var(--sp), transparent 0);\r\n    background-size: 100% var(--lh);\r\n    color: transparent !important;\r\n\r\n}\r\n\r\n.sk-text > * {\r\n    color: transparent;\r\n}\r\n\r\n.sk-button {\r\n    color: #eee !important;\r\n    background: #eee !important;\r\n    border: none !important;\r\n    box-shadow: none !important;\r\n    outline: none !important;\r\n}\r\n\r\n.sk-border {\r\n    /*outline: 1px solid #eee !important;*/\r\n    border-color: #eee;\r\n}\r\n\r\n.sk-bg {\r\n    background: #eee !important;\r\n}\r\n\r\n.sk-list {\r\n    color: #eee;\r\n}\r\n\r\n.sk-input {\r\n    background: #eee !important;\r\n    color: transparent !important;\r\n    border-color: transparent;\r\n}\r\n\r\n.sk-input::-webkit-input-placeholder {\r\n    color: transparent !important;\r\n}\r\n\r\n.sk-block {\r\n    background-color: #eee !important;\r\n    border-color: #eee !important;\r\n}\r\n\r\n.sk-ignore {\r\n    opacity: 0;\r\n}\r\n"],
        sourceRoot: ""
    }]), e.default = o
}, function (n, e, t) {
    "use strict";
    t.r(e);
    var r = t(0);
    t(2);
    const o = "transparent", a = /\.(jpeg|jpg|png|gif|svg|webp)/, i = /gradient/, c = /display:\s*none/, s = ["script"],
        d = "sk-", l = "sk-text-id", p = window.Node, u = new Map, h = n => {
            const e = "." + (d + n), t = `{\n    border-radius: ${"rect" === n ? "0" : "50%"};\n  }`;
            u.has(e) || u.set(e, t)
        }, m = (n, e) => {
            u.has(n) || u.set(n, e)
        };
    var f = u;
    const g = window.getComputedStyle, b = document.querySelectorAll.bind(document),
        A = document.querySelector.bind(document), y = n => "circle" === n ? "rect" : "circle",
        k = (n, e = "rem", t = 4) => {
            const r = "string" == typeof n ? parseFloat(n, 10) : n;
            if ("rem" === e) {
                const n = g(document.documentElement).fontSize;
                return `${(r / parseFloat(n, 10)).toFixed(t)}${e}`
            }
            return `${(r / (() => {
                const n = window.innerHeight, e = window.innerWidth;
                return {vh: n, vw: e, vmax: Math.max(e, n), vmin: Math.min(e, n)}
            })()[e] * 100).toFixed(t)}${e}`
        }, C = (n, e) => {
            let t = document.querySelector("#" + l);
            if (!t) {
                const n = document.createElement("p");
                t = document.createElement("span"), Object.assign(n.style, {width: "10000px"}), t.id = l, n.appendChild(t), document.body.appendChild(n)
            }
            return Object.assign(t.style, e), t.textContent = n, t.getBoundingClientRect().width
        }, v = (n, e) => {
            for (const t of e) n.classList.add(t)
        }, E = n => {
            const e = "sk-opacity";
            m("." + e, "{\n    opacity: 0 !important;\n  }"), n.classList.add(e)
        }, x = n => {
            const e = "sk-transparent";
            m("." + e, `{\n    color: ${o} !important;\n  }`), n.classList.add(e)
        }, w = n => {
            const e = n.parentNode;
            e && e.removeChild(n)
        };
    var B = function (n, {color: e, shape: t}) {
        const r = "sk-image", o = d + t;
        m("." + r, `{\n    background: ${e} !important;\n  }`), h(t), v(n, [r, o])
    }, I = function (n, {color: e, excludes: t}) {
        if (t.indexOf(n) > -1) return !1;
        const r = "sk-button";
        m("." + r, `{\n    color: ${e} !important;\n    background: ${e} !important;\n    border: none !important;\n    box-shadow: none !important;\n  }`), n.classList.add(r)
    }, S = function (n, {color: e}) {
        const t = "sk-gray";
        m("." + t, `{\n    color: ${e} !important;\n    background: ${e} !important;\n  }`), n.classList.add(t);
        const r = n.querySelectorAll("*");
        Array.from(r).forEach(n => {
            const e = n.childNodes;
            Array.from(e).some(n => n.nodeType === p.TEXT_NODE) && n.classList.add(t)
        })
    }, L = function (n, {color: e, shape: t, shapeOpposite: r}) {
        const {width: o, height: a} = n.getBoundingClientRect(), i = {
            width: o,
            height: a,
            src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        }, c = r.indexOf(n) > -1 ? y(t) : t;
        ((n, e) => {
            Object.keys(e).forEach(t => n.setAttribute(t, e[t]))
        })(n, i);
        const s = "sk-image", l = d + c;
        m("." + s, `{\n    background: ${e} !important;\n  }`), h(c), v(n, [s, l]), n.hasAttribute("alt") && n.removeAttribute("alt")
    }, O = function ({ele: n, hasBefore: e, hasAfter: t}, {color: r, shape: o, shapeOpposite: a}) {
        const i = a.indexOf(n) > -1 ? y(o) : o, c = "sk-pseudo", s = "sk-pseudo-rect", d = "sk-pseudo-circle", l = {
            [`.${c}::before, .${c}::after`]: `{\n      background: ${r} !important;\n      background-image: none !important;\n      color: transparent !important;\n      border-color: transparent !important;\n    }`,
            [`.${s}::before, .${s}::after`]: "{\n      border-radius: 0 !important;\n    }",
            [`.${d}::before, .${d}::after`]: "{\n      border-radius: 50% !important;\n    }"
        };
        Object.keys(l).forEach(n => {
            m(n, l[n])
        }), v(n, [c, "circle" === i ? d : s])
    }, T = function (n, {color: e, shape: t, shapeOpposite: r}, a, i) {
        const {width: c, height: s} = n.getBoundingClientRect();
        if (0 === c || 0 === s || "true" === n.getAttribute("aria-hidden")) return w(n);
        r.indexOf(n) > -1 && y(t), (n => {
            n.innerHTML = ""
        })(n);
        const l = d + t;
        if (h(t), Object.assign(n.style, {width: k(c, a, i), height: k(s, a, i)}), v(n, [l]), e === o) E(n); else {
            const t = "sk-svg";
            m("." + t, `{\n      background: ${e} !important;\n    }`), n.classList.add(t)
        }
    }, N = function (n, {color: e}, t, r) {
        const {width: o} = n.getBoundingClientRect();
        if (o <= 50) return E(n);
        const a = g(n), i = n.textContent;
        let {
            lineHeight: c,
            paddingTop: s,
            paddingRight: d,
            paddingBottom: l,
            paddingLeft: p,
            position: u,
            fontSize: h,
            textAlign: f,
            wordSpacing: b,
            wordBreak: A
        } = a;
        /\d/.test(c) || (c = 1.4 * (parseFloat(h, 10) || 14) + "px");
        const y = ["fixed", "absolute", "flex"].find(n => n === u) ? u : "relative",
            x = (n.offsetHeight - parseFloat(s, 10) - parseFloat(l, 10)) / parseFloat(c, 10) | 0;
        let w = parseFloat(h, 10) / parseFloat(c, 10);
        Number.isNaN(w) && (w = 1 / 1.4);
        const B = ((1 - w) / 2 * 100).toFixed(r), I = (100 * ((1 - w) / 2 + w)).toFixed(r), S = "100% " + k(c, t, r),
            L = "sk-text-" + B.toString(32).replace(/\./g, "-"), O = "sk-text";
        if (m("." + L, `{\n    background-image: linear-gradient(transparent ${B}%, ${e} 0%, ${e} ${I}%, transparent 0%) !important;\n    background-size: ${S};\n    position: ${y} !important;\n  }`), m("." + O, "{\n    background-origin: content-box !important;\n    background-clip: content-box !important;\n    background-color: transparent !important;\n    color: transparent !important;\n    background-repeat: repeat-y !important;\n  }"), v(n, [L, O]), x > 1) !function (n, {
            textAlign: e,
            lineHeight: t,
            paddingBottom: r,
            paddingLeft: o,
            paddingRight: a
        }, i = .5) {
            let c, s;
            switch (e) {
                case"center":
                    [c = document.createElement("span"), s = document.createElement("span")].forEach(n => {
                        Object.assign(n.style, {
                            display: "inline-block",
                            width: i / 2 * 100 + "%",
                            height: t,
                            background: "#fff",
                            position: "absolute",
                            bottom: r
                        })
                    }), c.style.left = o, s.style.right = a, n.appendChild(c), n.appendChild(s);
                    break;
                case"right":
                    c = document.createElement("span"), Object.assign(c.style, {
                        display: "inline-block",
                        width: 100 * i + "%",
                        height: t,
                        background: "#fff",
                        position: "absolute",
                        bottom: r,
                        left: o
                    }), n.appendChild(c);
                    break;
                case"left":
                default:
                    s = document.createElement("span"), Object.assign(s.style, {
                        display: "inline-block",
                        width: 100 * i + "%",
                        height: t,
                        background: "#fff",
                        position: "absolute",
                        bottom: r,
                        right: a
                    }), n.appendChild(s)
            }
        }(n, a); else {
            const e = C(i, {
                fontSize: h,
                lineHeight: c,
                wordBreak: A,
                wordSpacing: b
            }) / (o - parseInt(d, 10) - parseInt(p, 10));
            switch (n.style.backgroundSize = `${100 * (e > 1 ? 1 : e)}% ${k(c, t, r)}`, f) {
                case"left":
                    break;
                case"center":
                    n.style.backgroundPositionX = "50%";
                    break;
                case"right":
                    n.style.backgroundPositionX = "100%"
            }
        }
    }, F = function (n) {
        const {remove: e, hide: t, loading: r = "spin"} = n;
        if (t.length) {
            const n = b(t.join(","));
            Array.from(n).forEach(n => E(n))
        }
        !function (n) {
            const {
                    remove: e,
                    excludes: t,
                    text: r,
                    image: d,
                    button: u,
                    svg: h,
                    grayBlock: m,
                    pseudo: f,
                    cssUnit: y,
                    decimal: k
                } = n, C = t.length ? Array.from(b(t.join(","))) : [], v = m.length ? Array.from(b(m.join(","))) : [],
                E = document.documentElement, F = [], j = [], R = [];
            let M = [];
            const W = [], $ = [], H = [], z = [], P = [];
            Array.isArray(e) && (e.push(".sk-console", ...s), M.push(...b(e.join(",")))), u && u.excludes.length && (u.excludes = Array.from(b(u.excludes.join(",")))), [h, f, d].forEach(n => {
                n.shapeOpposite.length && (n.shapeOpposite = Array.from(b(n.shapeOpposite.join(","))))
            }), function n(e) {
                const t = g(e), r = (n => {
                    const e = "" !== g(n, "::before").getPropertyValue("content"),
                        t = "" !== g(n, "::after").getPropertyValue("content");
                    return !(!e && !t) && {hasBefore: e, hasAfter: t, ele: n}
                })(e);
                return !(n => {
                    const e = n.getBoundingClientRect();
                    return e.top < window.innerHeight && e.left < window.innerWidth
                })(e) || c.test(e.getAttribute("style")) ? M.push(e) : ~v.indexOf(e) ? P.push(e) : !~C.indexOf(e) && (r && H.push(r), (n => "none" !== n.getPropertyValue("border-style"))(t) && (e.style.border = "none"), e.children.length > 0 && /UL|OL/.test(e.tagName) && function n(e) {
                    const t = e.children, r = Array.from(t).filter(n => "LI" === n.tagName).length;
                    if (0 === r) return !1;
                    const o = t[0];
                    if ("LI" !== o.tagName) return n(o);
                    Array.from(t).forEach((n, e) => {
                        e > 0 && n.parentNode.removeChild(n)
                    });
                    for (let n = 1; n < r; n++) e.appendChild(o.cloneNode(!0))
                }(e), e.children && e.children.length > 0 && Array.from(e.children).forEach(e => n(e)), e.childNodes && Array.from(e.childNodes).some(n => n.nodeType === p.TEXT_NODE) && x(e), (n => !/none/.test(n.textDecorationLine))(t) && (e.style.textDecorationColor = o), "svg" === e.tagName ? $.push(e) : a.test(t.background) || a.test(t.backgroundImage) ? R.push(e) : i.test(t.background) || i.test(t.backgroundImage) ? z.push(e) : "IMG" === e.tagName || (n => /base64/.test(n.src))(e) ? W.push(e) : e.nodeType === p.ELEMENT_NODE && ("BUTTON" === e.tagName || "A" === e.tagName && "button" === e.getAttribute("role")) ? j.push(e) : e.childNodes && 1 === e.childNodes.length && e.childNodes[0].nodeType === p.TEXT_NODE && /\S/.test(e.childNodes[0].textContent) ? F.push(e) : void 0)
            }(E), $.forEach(n => T(n, h, y, k)), F.forEach(n => N(n, r, y, k)), j.forEach(n => I(n, u)), R.forEach(n => B(n, d)), W.forEach(n => L(n, d)), H.forEach(n => O(n, f)), z.forEach(n => B(n, d)), P.forEach(n => S(n, u));
            const U = A("#" + l);
            U && U.parentNode && M.push(U.parentNode), M.forEach(n => w(n))
        }(n);
        let d = "";
        for (const [n, e] of f) d += `${n} ${e}\n`;
        const u = document.createElement("style");
        window.createPopup || u.appendChild(document.createTextNode("")), u.innerHTML = d, document.head ? document.head.appendChild(u) : document.body.appendChild(u)
    };
    const j = () => {
        const n = document.createElement("style");
        n.innerHTML = "\n      @keyframes loading-rotate {\n        100% {\n          transform: rotate(360deg);\n        }\n      }\n\n      @keyframes loading-dash {\n        0% {\n          stroke-dasharray: 1, 200;\n          stroke-dashoffset: 0;\n        }\n        50% {\n          stroke-dasharray: 90, 150;\n          stroke-dashoffset: -40px;\n        }\n        100% {\n          stroke-dasharray: 90, 150;\n          stroke-dashoffset: -120px;\n        }\n      }\n\n      .sk-loading-spinner {\n        top: 50%;\n        margin-top: -0.5rem;\n        width: 100%;\n        text-align: center;\n        position: absolute;\n      }\n\n      .sk-loading-spinner .circular {\n        height: 1rem;\n        width: 1rem;\n        animation: loading-rotate 2s linear infinite;\n      }\n\n      .sk-loading-spinner .path {\n        animation: loading-dash 1.5s ease-in-out infinite;\n        stroke-dasharray: 90,150;\n        stroke-dashoffset: 0;\n        stroke-width: 2;\n        stroke: #409eff;\n        stroke-linecap: round;\n      }\n    ", document.head.appendChild(n);
        const e = document.createElement("div");
        e.classList.add("sk-loading-spinner"), e.innerHTML = '<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>', document.body.appendChild(e)
    };

    function R(n) {
        return n.replace(/([0-9.]+)%/, (function (n, e) {
            return +e / 100
        }))
    }

    function M(n) {
        return "".concat(parseFloat(parseFloat(100 * n).toFixed(3)), "%")
    }

    const W = {
        loading: "chiaroscuro",
        text: {color: "#EEEEEE"},
        image: {shape: "rect", color: "#EFEFEF", shapeOpposite: []},
        button: {color: "#EFEFEF", excludes: []},
        svg: {color: "#EFEFEF", shape: "circle", shapeOpposite: []},
        pseudo: {color: "#EFEFEF", shape: "circle", shapeOpposite: []},
        excludes: [],
        remove: [],
        hide: [],
        grayBlock: [],
        isRegularULList: !0,
        h5Only: !1,
        cssUnit: "rem",
        decimal: 4
    };
    var $ = ["noscript", "html", "head", "link", "style", "script", "meta", "title"], H = [];

    function z(n) {
        const e = {...W, ...n};
        F(e), function (n) {
            const e = (function n(e) {
                let t = [];
                return Array.from(e.children).forEach((function (e) {
                    const r = n(e);
                    t.push([e].concat(r))
                })), t.sort((function (n, e) {
                    const t = getComputedStyle(n[0]), r = getComputedStyle(e[0]);
                    let o = t.zIndex, a = r.zIndex;
                    return "static" !== t.position && "auto" === o && (o = 0), "static" !== r.position && "auto" === a && (a = 0), o === a ? 0 : "auto" !== o || isNaN(+a) ? isNaN(+o) || "auto" !== a ? o - a : o - 1 : -a - 1
                })), t = t.reduce((function (n, e) {
                    return n.concat(e)
                }), [])
            }(document.body).forEach((function (n) {
                if (!$.includes(n.tagName.toLowerCase())) {
                    const t = n.getBoundingClientRect(), r = getComputedStyle(n),
                        o = (getComputedStyle(n, "::before"), getComputedStyle(n, "::after"), r.boxSizing);
                    let a = t.width;
                    var e = parseInt(t.height);
                    const i = parseInt(r.fontSize), c = "normal" === r.lineHeight ? 1.2 * i : parseInt(r.lineHeight);
                    let s = t.left;
                    "auto" === s && (s = 0);
                    let d = t.top;
                    e = t.height;
                    const l = (r.backgroundColor, r.backgroundImage), p = r.backgroundSize, u = r.borderRadius;
                    let h = (r.position, r.backgroundPositionX);
                    h.includes("px") && (h = M(parseFloat(h) / innerWidth));
                    const m = (r.display, r.overflowY), f = r.boxShadow;
                    let g = r.paddingLeft;
                    "auto" === g && (g = 0);
                    const b = {color: r.backgroundColor};
                    "none" !== l && (b.image = l, b.size = r.backgroundSize, b.repeat = r.backgroundRepeat, b.repeat = r.backgroundPosition, b.origin = r.backgroundOrigin);
                    const A = {
                        width: M(parseFloat(r.borderLeftWidth) / innerWidth),
                        style: r.borderLeftStyle,
                        color: r.borderLeftColor
                    }, y = {
                        width: M(parseFloat(r.borderRightWidth) / innerWidth),
                        style: r.borderRightStyle,
                        color: r.borderRightColor
                    }, k = {
                        width: M(parseFloat(r.borderTopWidth) / innerWidth),
                        style: r.borderTopStyle,
                        color: r.borderTopColor
                    }, C = {
                        width: M(parseFloat(r.borderBottomWidth) / innerWidth),
                        style: r.borderBottomStyle,
                        color: r.borderBottomColor
                    }, v = "0%" !== A.width, E = "0%" !== y.width, x = "0%" !== k.width, w = "0%" !== C.width;
                    if ("hidden" !== m && "scroll" !== m || Array.from(n.getElementsByTagName("*")).forEach((function (n) {
                        n.maxRight = s + a, n.maxBottom = d + e, n.minTop = d, n.minLeft = s
                    })), 0 !== a && 0 !== e && ("rgba(0, 0, 0, 0)" !== b.color || "none" !== l)) if (Array.from(n.classList).includes("sk-text")) {
                        a = "border-box" === o ? a - parseInt(g) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth) : a, e = "border-box" === o ? e - parseInt(r.paddingTop) - parseInt(r.paddingBottom) - parseInt(r.borderTopWidth) - parseInt(r.borderBottomWidth) : e, d = "border-box" === o ? d + parseInt(r.paddingTop) : d, s = "border-box" === o ? parseFloat(s) + parseFloat(g) : s;
                        let n = a;
                        isNaN(+R(p.split(" ")[0])) || (n = a * R(p.split(" ")[0]));
                        const t = parseInt(e / c);
                        if (t >= 2) for (let e = 0; e < t; e++) H.push({
                            width: M(n / innerWidth),
                            height: M(i / innerWidth),
                            left: M((s + (a - n) * R(h)) / innerWidth),
                            top: M((d + (c - i) / 2 + c * e) / innerWidth),
                            background: {color: "#EEEEEE"}
                        }); else H.push({
                            width: M(n / innerWidth),
                            height: M(i / innerWidth),
                            left: M((s + (a - n) * R(h)) / innerWidth),
                            top: M((d + (c - i) / 2) / innerWidth),
                            background: {color: "#EEEEEE"}
                        })
                    } else {
                        n.minTop && n.minTop > d && (d = n.minTop), n.minLeft && n.minLeft > s && (s = n.minLeft), n.maxBottom && n.maxBottom < d + e && (e = n.maxBottom - d), n.maxRight && n.maxRight < s + a && (a = n.maxRight - s);
                        const t = {
                            width: M(a / innerWidth),
                            height: M(e / innerWidth),
                            left: M(s / innerWidth),
                            top: M(d / innerWidth),
                            background: b,
                            bRadius: u.includes("%") ? u : "".concat(M(parseFloat(u) / a), " / ").concat(M(parseFloat(u) / e))
                        };
                        "none" !== f && (t.boxShadow = f), v && (t.borderLeft = A), E && (t.borderRight = y), x && (t.borderTop = k), w && (t.borderBottom = C), H.push(t)
                    }
                }
            })), H), t = "chiaroscuro" === n.loading ? 'class="blink"' : "";
            switch (document.querySelector("html").innerHTML = '\n    <head>\n      <title>前端-骨架屏预览</title>\n      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover">\n      <style>\n        html, body, p {\n          margin: 0;\n          padding: 0;\n        }\n        html, body {\n          width: 100%;\n          height: 100%;\n          overflow: hidden;\n        }\n        p {\n          position: absolute;\n        }\n      </style>\n    </head>\n    <body>\n      '.concat(e.map((function (n, e) {
                return "\n<p   ".concat(t).concat('style="\nz-index: ').concat(e, ";\n").concat(n.boxShadow ? "box-shadow: ".concat(n.boxShadow, ";") : "", "\n").concat(n.bRadius ? "border-radius: ".concat(n.bRadius, ";") : "", "\nbackground: ").concat(n.background.color, ";\nwidth: ").concat(n.width, ";\npadding-bottom: ").concat(n.height, ";\n").concat("0%" !== n.left ? "left: ".concat(n.left, ";") : "", "\nmargin-top: ").concat(n.top, ';"\n></p>\n')
            })).join(""), "\n    </body>\n  "), n.loading) {
                case"chiaroscuro":
                    (() => {
                        const n = document.createElement("style");
                        n.innerHTML = "\n      @keyframes blink {\n        0% {\n          opacity: .4;\n        }\n\n        50% {\n          opacity: 1;\n        }\n\n        100% {\n          opacity: .4;\n        }\n      }\n      .blink {\n        animation-duration: 2s;\n        animation-name: blink;\n        animation-iteration-count: infinite;\n      }\n    ", document.head.appendChild(n), document.body.firstElementChild.classList.add("blink")
                    })();
                    break;
                case"spin":
                    j();
                    break;
                case"shine":
                    (() => {
                        const n = document.createElement("style");
                        n.innerHTML = "\n      body {\n        overflow: hidden;\n      }\n      @keyframes flush {\n        0% {\n          left: -100%;\n        }\n        50% {\n          left: 0;\n        }\n        100% {\n          left: 100%;\n        }\n      }\n      .sk-loading {\n        animation: flush 2s linear infinite;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        width: 100%;\n        background: linear-gradient(to left, \n          rgba(255, 255, 255, 0) 0%,\n          rgba(255, 255, 255, .85) 50%,\n          rgba(255, 255, 255, 0) 100%\n        )\n      }\n    ";
                        const e = document.createElement("div");
                        e.classList.add("sk-loading"), document.head.appendChild(n), document.body.appendChild(e)
                    })();
                    break;
                default:
                    j()
            }
        }(e)
    }

    r.a.on("createSkeleton", n => {
        try {
            z(JSON.parse(n));
            const e = "<style>".concat(document.querySelector("style").innerHTML, "</style>") + "<style>".concat(document.querySelectorAll("style")[1].innerHTML, "</style>").concat(document.body.innerHTML);
            e && (r.a.emit("createSkeletonOk"), r.a.emit("createSkeletonInfo", {url: window.location.href, html: e}))
        } catch (n) {
        }
    })
}]);

//@ sourceMappingURL=content.js.map