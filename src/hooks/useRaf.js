import { useRef, useCallback } from 'react';

const useRaf = (
	duration,
	callback = () => {},
	options = {
		immediate: false
	}
) => {
	const rfaIdRef = useRef(null);
	const startRef = useRef(null);
	const eventRef = useRef(null);
	eventRef.current = callback;
	const immediate = options.immediate;

	const requestAnimationFrameFn = useCallback(
		() => {
			if (typeof window.requestAnimationFrame === 'undefined') {
				rfaIdRef.current = setInterval(
					() => {
						eventRef.current();
					},
					[ duration ]
				);
			}
			const fn = (timestamp) => {
				if (!startRef.current) {
					startRef.current = timestamp;
				}

				if (timestamp - startRef.current > duration) {
					eventRef.current();
					startRef.current = timestamp;
				}
				rfaIdRef.current = requestAnimationFrame(fn);
			};

			rfaIdRef.current = requestAnimationFrame(fn);
		},
		[ duration ]
	);

	const start = useCallback(
		() => {
			if (rfaIdRef.current) {
				return;
			}
			if (immediate) {
				eventRef.current();
			}
			requestAnimationFrameFn();
		},
		[ requestAnimationFrameFn, immediate ]
	);

	const stop = useCallback(() => {
		if (typeof window.requestAnimationFrame === 'undefined') {
			clearInterval(rfaIdRef.current);
		}
		cancelAnimationFrame(rfaIdRef.current);
		startRef.current = undefined;
		rfaIdRef.current = null;
	}, []);

	return {
		start,
		stop
	};
};

export default useRaf;
