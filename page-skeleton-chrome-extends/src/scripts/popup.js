/** @format */
import chromeMsg from '../utils/chromeMsg'
import chromeKit from '../utils/chromeKit'
let vm = new Vue({
	el: '#app',
	data() {
		return {
			visible: false,
			currentSkeletonScreen: {},
			config: '',
		}
	},
	watch: {
		config() {
			localStorage.setItem('config', this.config)
		},
	},
	created() {
		if (localStorage.getItem('currentSkeletonScreen')) {
			this.visible = true
		}
		this.initConfig()
		this.getSkeletonInfo()
		chromeMsg.on('createSkeletonOk', () => {
			this.visible = true
		})
	},
	methods: {
		initConfig() {
			const config = localStorage.getItem('config')
			if (config) {
				this.config = config
				return
			}
			this.config = JSON.stringify({
				loading: 'chiaroscuro',
				text: { color: '#EEEEEE' },
				image: { shape: 'rect', color: '#EFEFEF', shapeOpposite: [] },
				button: { color: '#EFEFEF', excludes: [] },
				svg: { color: '#EFEFEF', shape: 'circle', shapeOpposite: [] },
				pseudo: { color: '#EFEFEF', shape: 'circle', shapeOpposite: [] },
			})
		},
		createSkeleton() {
			chromeKit.getCurrentTab().then((tab) => {
				let { id } = tab
				console.log('this.config', this.config)
				chromeMsg.emit('createSkeleton', this.config, id)
			})
		},
		getSkeletonInfo() {
			chromeMsg.on('createSkeletonInfo', (currentSkeletonScreen) => {
				console.log('currentSkeletonScreen', currentSkeletonScreen)
				this.currentSkeletonScreen = currentSkeletonScreen
				localStorage.setItem('currentSkeletonScreen', JSON.stringify(this.currentSkeletonScreen))
			})
		},
		handleEdit() {
			if (!Object.keys(this.currentSkeletonScreen).length) {
				this.$message({
					showClose: true,
					message: '请先生成骨架屏',
					type: 'warning',
				})
				return
			}
			chrome.tabs.create({ url: chrome.extension.getURL('./preview/index.html') })
		},
		handleCopy() {
			var input = document.createElement('input')
			input.setAttribute('value', this.currentSkeletonScreen.html)
			document.body.appendChild(input)
			input.select()
			var a = document.execCommand('copy')
			document.body.removeChild(input)
			if (a) {
				this.$message({
					showClose: true,
					message: '拷贝骨架屏代码片段成功！',
					type: 'success',
				})
			} else {
				this.$message({
					showClose: true,
					message: '拷贝骨架屏代码片段成功！',
					type: 'error',
				})
			}
		},
		concact() {
			window.open('https://www.yuque.com/wanggangfeng/bsp75t/inu4gw')
		},
	},
})
