import React from 'react';
import useTimeCountDown from '../hooks/useTimeCountDown';
import dayjs from 'dayjs';

export default function TestUseTimeCountDown() {
	const { time, start } = useTimeCountDown(() => {
		console.log('end');
	});
	const { day, hour, minutes, seconds } = time;
	return (
		<div>
			<button
				onClick={() => {
					start(dayjs(dayjs() + 1000 * 60));
				}}
			>
				开始
			</button>
			<div>
				{day} : {hour} : {minutes} : {seconds}
			</div>
		</div>
	);
}
