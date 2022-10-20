import copy from 'copy-to-clipboard';

// 获取视频宽高
export async function getVideoFileInfoamtion(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file); //监听文件读取结束后事件
		reader.onloadend = function(e) {
			const videoDom = document.createElement('video');
			videoDom.src = e.target.result;
			// 插入dom中才能获取视频真实宽高
			document.body.append(videoDom);
			videoDom.addEventListener('canplay', (e) => {
				const width = e.target.clientWidth;
				const height = e.target.clientHeight;
				setTimeout(() => {
					document.body.removeChild(videoDom);
				});
				resolve({ width, height });
			});
		};
	});
}

// 预加载图片
export async function preloadImage(url) {
	return new Promise((resolve) => {
		let image = new Image();
		image.src = url;

		image.onload = () => {
			resolve(true);
		};
	});
}

// 复制文本内容
export function copyContent(content, callback) {
	let flag = false;
	if (copy(content, { debug: true, message: '请在输入框内手动复制' })) {
		flag = true;
	}

	callback && callback(flag);
}

// 获取当前浏览器环境
export const getBrowser = () => {
	const ua = window.navigator.userAgent || '';
	const isAndroid = /android/i.test(ua);
	const isIos = /iphone|ipad|ipod/i.test(ua);
	const isWechat = /micromessenger\/([\d.]+)/i.test(ua);
	const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua);
	const isQQ = /qq\/([\d.]+)/i.test(ua);
	const isBrowerInQQ = /QQ\/\d\.\d\.\d/gi.test(ua) && /mqqbrowser/gi.test(ua);
	const isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua);
	// 安卓 chrome 浏览器，很多 app 都是在 chrome 的 ua 上进行扩展的
	const isOriginalChrome = /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua) && isAndroid && ua.indexOf('Version') < 0;
	// chrome for ios 和 safari 的区别仅仅是将 Version/<VersionNum> 替换成了 CriOS/<ChromeRevision>
	// ios 上很多 app 都包含 safari 标识，但它们都是以自己的 app 标识开头，而不是 Mozilla
	const isSafari = /safari\/([\d.]+)$/i.test(ua) && isIos && ua.indexOf('Crios') < 0 && ua.indexOf('Mozilla') === 0;

	// 百度app
	const isBaidu = /baiduboxapp/i.test(ua);

	function IsPC() {
		let Agents = [ 'Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'Mobile' ];
		let flag = true;
		for (let v = 0; v < Agents.length; v++) {
			if (ua.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	const isPc = IsPC();

	return {
		isAndroid,
		isIos,
		isWechat,
		isWeibo,
		isQQ,
		isBrowerInQQ,
		isQzone,
		isOriginalChrome,
		isSafari,
		isBaidu,
		isPc
	};
};

// 手写classNames
export const classNames = (...args) => {
	const classes = [];
	args.forEach((arg) => {
		const argType = typeof arg;
		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (Array.isArray(arg)) {
			const inner = classNames(...arg);
			classes.push(inner);
		} else if (argType === 'object') {
			Object.keys(arg).forEach((item) => {
				if (arg[item]) {
					classes.push(item);
				}
			});
		}
	});

	return classes.join(' ');
};
