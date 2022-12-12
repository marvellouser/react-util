import { useRef, useEffect } from 'react';

export default function useIntersectionObserver({
	nodeRef,
	visibleHandler,
	stayHandler,
	stayTime = 2000,
	threshold = 0.3
}) {
	const startTime = useRef();

	const timeHandler = useRef();

	const io = useRef();

	useEffect(
		() => {
			const node = nodeRef.current;
			if (!node || !IntersectionObserver) return;

			io.current = new IntersectionObserver(
				(entries) => {
					entries.forEach((m) => {
						if (m.isIntersecting) {
							startTime.current = m.time;

							visibleHandler && visibleHandler();

							timeHandler.current = setTimeout(() => {
								startTime.current = null;
								stayHandler && stayHandler();
							}, stayTime);
						} else {
							if (startTime.current) {
								let endTime = m.time;
								//完全展示小于2秒
								if (endTime - startTime.current < stayTime) {
									startTime.current = null;
									//清空定时器
									if (timeHandler.current) clearTimeout(timeHandler.current);
								}
							}
						}
					});
				},
				{
					threshold: [ threshold ]
				}
			);

			io.current.observe(node);

			return () => {
				//清空定时器
				if (timeHandler.current) clearTimeout(timeHandler.current);

				io.current && io.current.disconnect();
			};
		},
		[ nodeRef, stayHandler, visibleHandler, stayTime, threshold ]
	);
}
