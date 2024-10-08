/** @format */

import {
	$$,
	$,
	getComputedStyle,
	checkHasPseudoEle,
	inViewPort,
	checkHasBorder,
	isBase64Img,
	transparent,
	checkHasTextDecoration,
	removeElement,
	setOpacity,
} from './util.js'
import {
	DISPLAY_NONE,
	Node,
	EXT_REG,
	TRANSPARENT,
	GRADIENT_REG,
	PRE_REMOVE_TAGS,
	MOCK_TEXT_ID,
	CONSOLE_SELECTOR,
} from './config.js'
import * as handler from './handler/index.js'
import styleCache from './handler/styleCache.js'

function traverse(options) {
	const {
		remove,
		excludes,
		text,
		image,
		button,
		svg,
		grayBlock,
		pseudo,
		cssUnit,
		decimal,
	} = options
	const excludesEle = excludes.length ? Array.from($$(excludes.join(','))) : []
	const grayEle = grayBlock.length ? Array.from($$(grayBlock.join(','))) : []
	const rootElement = document.documentElement

	const texts = []
	const buttons = []
	const hasImageBackEles = []
	let toRemove = []
	const imgs = []
	const svgs = []
	const pseudos = []
	const gradientBackEles = []
	const grayBlocks = []

	if (Array.isArray(remove)) {
		remove.push(CONSOLE_SELECTOR, ...PRE_REMOVE_TAGS)
		toRemove.push(...$$(remove.join(',')))
	}

	if (button && button.excludes.length) {
		// translate selector to element
		button.excludes = Array.from($$(button.excludes.join(',')))
	}

	;[svg, pseudo, image].forEach((type) => {
		if (type.shapeOpposite.length) {
			type.shapeOpposite = Array.from($$(type.shapeOpposite.join(',')))
		}
	})
	// ! 转化之前先做一些操作
	;(function preTraverse(ele) {
		const styles = getComputedStyle(ele)
		const hasPseudoEle = checkHasPseudoEle(ele)
		if (!inViewPort(ele) || DISPLAY_NONE.test(ele.getAttribute('style'))) {
			return toRemove.push(ele)
		}
		// https://www.kancloud.cn/chandler/javascript/785489
		// ~-1==>就是0
		if (~grayEle.indexOf(ele)) {
			// eslint-disable-line no-bitwise
			return grayBlocks.push(ele)
		}
		if (~excludesEle.indexOf(ele)) return false // eslint-disable-line no-bitwise

		if (hasPseudoEle) {
			pseudos.push(hasPseudoEle)
		}

		if (checkHasBorder(styles)) {
			ele.style.border = 'none'
		}

		if (ele.children.length > 0 && /UL|OL/.test(ele.tagName)) {
			handler.list(ele)
		}
		if (ele.children && ele.children.length > 0) {
			Array.from(ele.children).forEach((child) => preTraverse(child))
		}

		// 将所有拥有 textChildNode 子元素的元素的文字颜色设置成背景色，这样就不会在显示文字了。
		if (ele.childNodes && Array.from(ele.childNodes).some((n) => n.nodeType === Node.TEXT_NODE)) {
			transparent(ele)
		}
		if (checkHasTextDecoration(styles)) {
			ele.style.textDecorationColor = TRANSPARENT
		}
		// 隐藏所有 svg 元素
		if (ele.tagName === 'svg') {
			return svgs.push(ele)
		}
		// ! 针对于容器中如果有background或者img的 如果有需要当做块处理 否则就以容器为处理
		if (EXT_REG.test(styles.background) || EXT_REG.test(styles.backgroundImage)) {
			return hasImageBackEles.push(ele)
		}
		// export const GRADIENT_REG = /gradient/
		// CSS linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片
		if (GRADIENT_REG.test(styles.background) || GRADIENT_REG.test(styles.backgroundImage)) {
			return gradientBackEles.push(ele)
		}
		if (ele.tagName === 'IMG' || isBase64Img(ele)) {
			return imgs.push(ele)
		}
		if (
			ele.nodeType === Node.ELEMENT_NODE &&
			(ele.tagName === 'BUTTON' || (ele.tagName === 'A' && ele.getAttribute('role') === 'button'))
		) {
			return buttons.push(ele)
		}
		if (
			ele.childNodes &&
			ele.childNodes.length === 1 &&
			ele.childNodes[0].nodeType === Node.TEXT_NODE &&
			/\S/.test(ele.childNodes[0].textContent)
		) {
			return texts.push(ele)
		}
	})(rootElement)

	// ! dom节点 引用类型  这里统一收集对应类型的dom 然后集中用对应的handler处理
	console.log('button数组', buttons)
	console.log('hasImageBackEles', hasImageBackEles)
	console.log(pseudos, gradientBackEles, grayBlocks)
	svgs.forEach((e) => handler.svg(e, svg, cssUnit, decimal))
	texts.forEach((e) => handler.text(e, text, cssUnit, decimal))
	buttons.forEach((e) => handler.button(e, button))
	console.log('imgs数组', imgs)

	hasImageBackEles.forEach((e) => handler.background(e, image))
	imgs.forEach((e) => handler.image(e, image))
	pseudos.forEach((e) => handler.pseudos(e, pseudo))
	gradientBackEles.forEach((e) => handler.background(e, image))
	grayBlocks.forEach((e) => handler.grayBlock(e, button))
	// remove mock text wrapper
	const offScreenParagraph = $(`#${MOCK_TEXT_ID}`)
	if (offScreenParagraph && offScreenParagraph.parentNode) {
		toRemove.push(offScreenParagraph.parentNode)
	}
	toRemove.forEach((e) => removeElement(e))
}

function genSkeleton(options) {
	const { remove, hide, loading = 'spin' } = options
	/**
	 * before walk
	 */
	// 将 `hide` 队列中的元素通过调节透明度为 0 来进行隐藏
	if (hide.length) {
		const hideEle = $$(hide.join(','))
		Array.from(hideEle).forEach((ele) => setOpacity(ele))
	}
	/**
	 * walk in process
	 */

	traverse(options)
	/**
	 * add `<style>`
	 */
	let rules = ''

	for (const [selector, rule] of styleCache) {
		rules += `${selector} ${rule}\n`
	}

	const styleEle = document.createElement('style')

	if (!window.createPopup) {
		// For Safari
		styleEle.appendChild(document.createTextNode(''))
	}
	styleEle.innerHTML = rules
	if (document.head) {
		document.head.appendChild(styleEle)
	} else {
		document.body.appendChild(styleEle)
	}
}

export default {
	genSkeleton, // 干了什么
}
