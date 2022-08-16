import React from 'react';
import { useRoll } from '../hooks';
function test() {}
export default function TestUseRoll() {
	const { index, start, stop } = useRoll({ endHandler: test });

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
