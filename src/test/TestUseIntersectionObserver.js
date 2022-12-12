import { useRef, useCallback } from 'react';
import { useIntersectionObserver } from '../hooks';

export default function TestUseIntersectionObserver() {
	const conRef = useRef();

	const visibleHandler = useCallback(() => {
		console.log('visibleHandler');
	}, []);

	const stayHandler = useCallback(() => {
		console.log('stayHandler');
	}, []);

	useIntersectionObserver({
		nodeRef: conRef,
		visibleHandler,
		stayHandler
	});
	return (
		<div>
			<div style={{ height: 1000 }}>head</div>
			<div ref={conRef} style={{ width: 100, height: 100, background: '#f00' }}>
				content
			</div>
			<div style={{ height: 1000 }}>foot</div>
		</div>
	);
}
