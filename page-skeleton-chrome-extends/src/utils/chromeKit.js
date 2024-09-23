/** @format */

export default {
	// chrome原生通知
	showTip(str, opt) {
		let options = Object.assign(
			{
				type: 'basic',
				iconUrl: 'images/icon38.png',
				title: '',
				message: '',
			},
			opt,
		)

		str = str.replace('\n', ' ')

		if (str.length > 35) {
			options.message = str.substr(0, 35) + '...'
		} else {
			options.message = str
		}

		const NOTIFY_ID = '@@notify'
		chrome.notifications.create(NOTIFY_ID, options)
		setTimeout(() => {
			chrome.notifications.clear(NOTIFY_ID)
		}, 5000)
	},
	// 向当前的标签页发送消息，从而获取页面内容的信息
	sendMessageToCurrentTab(data) {
		return new Promise((resolve, reject) => {
			chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
					console.log('response', response)
					resolve(response)
				})
			})
		})
	},
	// 获取当前便签页
	getCurrentTab() {
		return new Promise((resolve, reject) => {
			chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
				console.log('getCurrentTab===>tabs', tabs)
				resolve(tabs[0])
			})
		})
	},
	// 重新加载插件并刷新当前页面
	reloadAndRefreshCurrentTab() {
		this.getCurrentTab().then((tab) => {
			chrome.tabs.reload(tab.id)
			chrome.runtime.reload()
		})
	},
	// 返回插件页面地址
	openExtensionPage(pageName) {
		let id = chrome.runtime.id
		let url = `chrome-extension://${id}/${pageName}.html`
		return url
	},
}
