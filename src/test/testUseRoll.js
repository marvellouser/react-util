import React from 'react';
import useRoll from '../hooks/useRoll';

export default function TestUseRoll() {
	function test() {
		console.log('end');
	}
	const { index, start, stop } = useRoll({ endHandler: test, num: 16 });

	return (
		<div
			onClick={() => {
				start();
				setTimeout(() => {
					stop(6);
				}, 2000);
			}}
		>
			{index}
		</div>
	);
}
