/** @format */

import Skeleton from './script/main'
import { addSpin, addShine, addBlick } from './script/animation/index.js'

function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread()
}
function _nonIterableSpread() {
    throw new TypeError('Invalid attempt to spread non-iterable instance')
}
function _iterableToArray(e) {
    if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === '[object Arguments]')
        return Array.from(e)
}
function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t]
        return n
    }
}
// * 将百分数转化为小数
function per2num(e) {
    return e.replace(/([0-9.]+)%/, function (e, t) {
        return +t / 100
    })
}
function toPercent(e) {
    return ''.concat(parseFloat(parseFloat(100 * e).toFixed(3)), '%')
}
// 进行dom元素筛选
function sortChild(e) {
    let t = []
    return (
        Array.from(e.children).forEach(function (e) {
            const n = sortChild(e)
            t.push([e].concat((n)))
        }),
        t.sort(function (e, t) {
            const n = getComputedStyle(e[0])
            const o = getComputedStyle(t[0])
            let r = n.zIndex
            let a = o.zIndex
            const i = n.position
            const c = o.position
            return (
                i !== 'static' && r === 'auto' && (r = 0),
                c !== 'static' && a === 'auto' && (a = 0),
                r === a
                    ? 0
                    : r !== 'auto' || isNaN(+a)
                        ? isNaN(+r) || a !== 'auto'
                            ? r - a
                            : r - 1
                        : -a - 1
            )
        }),
        (t = t.reduce(function (e, t) {
            return e.concat(t)
        }, []))
    )
}
function toEhJson() {
    let childs = null
    console.log("document.body", document.body)
    childs = sortChild(document.body)
    console.log("childs", childs)
    childs.forEach(function (e) {
        if (!unUseTagList.includes(e.tagName.toLowerCase())) {
            const t = e.getBoundingClientRect() // 关键api
            // console.log('t===style', t)
            const n = getComputedStyle(e)
            const o = (getComputedStyle(e, '::before'), getComputedStyle(e, '::after'), n.boxSizing)
            let r = t.width
            var a = parseInt(t.height)
            const i = parseInt(n.fontSize)
            const c = n.lineHeight === 'normal' ? 1.2 * i : parseInt(n.lineHeight)
            let d = t.left
            d === 'auto' && (d = 0)
            let s = t.top
            var a = t.height
            // l 拿到dom元素的背景颜色 如果没有背景颜色===>容器
            const l = (n.backgroundColor, n.backgroundImage)
            const u = n.backgroundSize
            const p = n.borderRadius
            let h = (n.position, n.backgroundPositionX)
            h.includes('px') && (h = toPercent(parseFloat(h) / innerWidth))
            const f = (n.display, n.overflowY)
            const m = n.boxShadow
            let g = n.paddingLeft
            g === 'auto' && (g = 0)
            const y = { color: n.backgroundColor }
            l !== 'none' &&
                ((y.image = l),
                    (y.size = n.backgroundSize),
                    (y.repeat = n.backgroundRepeat),
                    (y.repeat = n.backgroundPosition),
                    (y.origin = n.backgroundOrigin))
            const b = {
                width: toPercent(parseFloat(n.borderLeftWidth) / innerWidth),
                style: n.borderLeftStyle,
                color: n.borderLeftColor,
            }
            const v = {
                width: toPercent(parseFloat(n.borderRightWidth) / innerWidth),
                style: n.borderRightStyle,
                color: n.borderRightColor,
            }
            const E = {
                width: toPercent(parseFloat(n.borderTopWidth) / innerWidth),
                style: n.borderTopStyle,
                color: n.borderTopColor,
            }
            const A = {
                width: toPercent(parseFloat(n.borderBottomWidth) / innerWidth),
                style: n.borderBottomStyle,
                color: n.borderBottomColor,
            }
            const k = b.width !== '0%'
            const w = v.width !== '0%'
            const x = E.width !== '0%'
            const T = A.width !== '0%'
            if (
                ((f !== 'hidden' && f !== 'scroll') ||
                    Array.from(e.getElementsByTagName('*')).forEach(function (e) {
                        ; (e.maxRight = d + r), (e.maxBottom = s + a), (e.minTop = s), (e.minLeft = d)
                    }),
                    // 宽度和高度不等于0 文本有颜色 块的话有背景色（这个时候的颜色是饿了么骨架屏输出的出的颜色）
                    r !== 0 && a !== 0 && (y.color !== 'rgba(0, 0, 0, 0)' || l !== 'none'))
            )
                if (Array.from(e.classList).includes('sk-text')) {
                    // 文本元素的处理s
                    ; (r =
                        o === 'border-box'
                            ? r -
                            parseInt(g) -
                            parseInt(n.paddingRight) -
                            parseInt(n.borderLeftWidth) -
                            parseInt(n.borderRightWidth)
                            : r),
                        (a =
                            o === 'border-box'
                                ? a -
                                parseInt(n.paddingTop) -
                                parseInt(n.paddingBottom) -
                                parseInt(n.borderTopWidth) -
                                parseInt(n.borderBottomWidth)
                                : a),
                        (s = o === 'border-box' ? s + parseInt(n.paddingTop) : s),
                        (d = o === 'border-box' ? parseFloat(d) + parseFloat(g) : d)
                    let S = r
                    isNaN(+per2num(u.split(' ')[0])) || (S = r * per2num(u.split(' ')[0]))
                    const L = parseInt(a / c)
                    if (L >= 2)
                        for (let N = 0; N < L; N++)
                            list.push({
                                width: toPercent(S / innerWidth),
                                height: toPercent(i / innerWidth),
                                left: toPercent((d + (r - S) * per2num(h)) / innerWidth),
                                top: toPercent((s + (c - i) / 2 + c * N) / innerWidth),
                                background: { color: '#EEEEEE' },
                            })
                    else
                        list.push({
                            width: toPercent(S / innerWidth),
                            height: toPercent(i / innerWidth),
                            left: toPercent((d + (r - S) * per2num(h)) / innerWidth),
                            top: toPercent((s + (c - i) / 2) / innerWidth),
                            background: { color: '#EEEEEE' },
                        })
                } else {
                    e.minTop && e.minTop > s && (s = e.minTop),
                        e.minLeft && e.minLeft > d && (d = e.minLeft),
                        e.maxBottom && e.maxBottom < s + a && (a = e.maxBottom - s),
                        e.maxRight && e.maxRight < d + r && (r = e.maxRight - d)
                    const O = {
                        width: toPercent(r / innerWidth),
                        height: toPercent(a / innerWidth),
                        left: toPercent(d / innerWidth),
                        top: toPercent(s / innerWidth),
                        background: y,
                        bRadius: p.includes('%')
                            ? p
                            : ''.concat(toPercent(parseFloat(p) / r), ' / ').concat(toPercent(parseFloat(p) / a)),
                    }
                    m !== 'none' && (O.boxShadow = m),
                        k && (O.borderLeft = b),
                        w && (O.borderRight = v),
                        x && (O.borderTop = E),
                        T && (O.borderBottom = A),
                        list.push(O)
                }
        }
    })
    return list
}
// 生成绝对定位布局
function toAbsoluteLayout(options) {
    // 这个函数不怕破坏dom结构 因为主要是收集dom结构的具体信息
    const e = toEhJson()
    console.log('toAbsoluteLayout', e)
    const cls = options.loading === 'chiaroscuro' ? 'class="blink"' : ''
    document.querySelector(
        'html',
    ).innerHTML = '\n    <head>\n      <title>前端-骨架屏预览</title>\n      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover">\n      <style>\n        html, body, p {\n          margin: 0;\n          padding: 0;\n        }\n        html, body {\n          width: 100%;\n          height: 100%;\n          overflow: hidden;\n        }\n        p {\n          position: absolute;\n        }\n      </style>\n    </head>\n    <body>\n      '.concat(
        e
            .map(function (e, t) {
                return '\n<p   '
                    .concat(cls)
                    .concat('style="\nz-index: ')
                    .concat(t, ';\n')
                    .concat(e.boxShadow ? 'box-shadow: '.concat(e.boxShadow, ';') : '', '\n')
                    .concat(e.bRadius ? 'border-radius: '.concat(e.bRadius, ';') : '', '\nbackground: ')
                    .concat(e.background.color, ';\nwidth: ')
                    .concat(e.width, ';\npadding-bottom: ')
                    .concat(e.height, ';\n')
                    .concat(e.left !== '0%' ? 'left: '.concat(e.left, ';') : '', '\nmargin-top: ')
                    .concat(e.top, ';"\n></p>\n')
            })
            .join(''),
        '\n    </body>\n  ',
    )
    switch (options.loading) {
        case 'chiaroscuro':
            addBlick()
            break
        case 'spin':
            addSpin()
            break
        case 'shine':
            addShine()
            break
        default:
            addSpin()
            break
    }
}

// * 基本配置
const defaultOptions = {
    loading: 'chiaroscuro',
    text: { color: '#EEEEEE' },
    image: { shape: 'rect', color: '#EFEFEF', shapeOpposite: [] },
    button: { color: '#EFEFEF', excludes: [] },
    svg: { color: '#EFEFEF', shape: 'circle', shapeOpposite: [] },
    pseudo: { color: '#EFEFEF', shape: 'circle', shapeOpposite: [] },
    excludes: [],
    remove: [],
    hide: [],
    grayBlock: [],
    isRegularULList: true,
    h5Only: false,
    cssUnit: 'rem',
    decimal: 4,
}
var unUseTagList = ['noscript', 'html', 'head', 'link', 'style', 'script', 'meta', 'title']
var list = []

export function genSkeleton(options) {
    const skeletonOptins = { ...defaultOptions, ...options }
    Skeleton.genSkeleton(skeletonOptins)
    toAbsoluteLayout(skeletonOptins)
}
