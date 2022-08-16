
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
