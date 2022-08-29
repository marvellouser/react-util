import { useRef, useCallback } from 'react';

const useRfa = (
	duration,
	callback,
	options = {
		immediate: false
	}
) => {
	const rfaIdRef = useRef(null);
	const startRef = useRef(null);
	const eventRef = useRef(null);
	eventRef.current = callback;
	const immediate = options.immediate;

	const fn = useCallback(
		(timestamp) => {
			if (!startRef.current) {
				startRef.current = timestamp;
				if (immediate) {
					eventRef.current && eventRef.current();
				}
			}

			if (timestamp - startRef.current > duration) {
				eventRef.current && eventRef.current();
				startRef.current = timestamp;
			}
			rfaIdRef.current = requestAnimationFrame(fn);
		},
		[ duration, immediate ]
	);

	const start = useCallback(
		() => {
			if (rfaIdRef.current) {
				return;
			}
			rfaIdRef.current = requestAnimationFrame(fn);
		},
		[ fn ]
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
