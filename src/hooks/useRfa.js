import { useRef, useCallback } from 'react';

const useRfa = (
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
				return setInterval(
					() => {
						eventRef.current();
					},
					[ duration ]
				);
			}
		},
		[ duration ]
	);

	const fn = useCallback(
		(timestamp) => {
			if (!startRef.current) {
				startRef.current = timestamp;
			}

			if (timestamp - startRef.current > duration) {
				eventRef.current();
				startRef.current = timestamp;
			}
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
			rfaIdRef.current = requestAnimationFrameFn();
		},
		[ requestAnimationFrameFn, immediate ]
	);

	const stop = useCallback(() => {
		startRef.current = undefined;
		cancelAnimationFrame(rfaIdRef.current);
		rfaIdRef.current = null;
	}, []);

	return {
		start,
		stop
	};
};

export default useRfa;
