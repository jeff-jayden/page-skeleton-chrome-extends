import chromeMsg  from '../utils/chromeMsg'
import './css/popup.css'
import { genSkeleton } from './skeleton'

chromeMsg.on('createSkeleton', (config) => {
	try {
		genSkeleton(JSON.parse(config))
		const skeletonHtml = '<style>'
			.concat(document.querySelector('style').innerHTML, '</style>')+'<style>'
			.concat(document.querySelectorAll('style')[1].innerHTML, '</style>')
			.concat(document.body.innerHTML)
		if (skeletonHtml) {
			chromeMsg.emit('createSkeletonOk') // 生成成功
			chromeMsg.emit('createSkeletonInfo', {
				url: window.location.href,
				html: skeletonHtml,
			})
		}
	} catch (error) {
		// 生成失败
	}
})
