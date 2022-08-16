import React from 'react';
import dayjs from 'dayjs';

const useTimeCountDown = (overHandler) => {
	const [ time, setTime ] = React.useState({
		day: 0,
		hour: 0,
		minutes: 0,
		seconds: 0
	});

	const end = React.useRef(null);

	const refMounted = React.useRef(false);

	const overHandlerRef = React.useRef(overHandler);

	const countDownAPI = React.useCallback(() => {
		if (!refMounted.current) return;

		let nowTime = dayjs();

		let day = end.current.diff(nowTime, 'days');
		let hour = end.current.diff(nowTime, 'hours') % 24;
		let minutes = end.current.diff(nowTime, 'minutes') % 60;
		let seconds = end.current.diff(nowTime, 'seconds') % 60;
		if (day <= 0 && hour <= 0 && minutes <= 0 && seconds <= 0) {
			setTime({
				day: 0,
				hour: 0,
				minutes: 0,
				seconds: 0
			});

			overHandlerRef.current && overHandlerRef.current();

			return;
		}
		hour = hour >= 10 ? hour : `0${hour}`;
		minutes = minutes >= 10 ? minutes : `0${minutes}`;
		seconds = seconds >= 10 ? seconds : `0${seconds}`;

		setTime({
			day,
			hour,
			minutes,
			seconds
		});

		setTimeout(countDownAPI, 1000);
	}, []);

	const start = React.useCallback(
		(endtime) => {
			if (endtime) {
				end.current = endtime;
				countDownAPI();
			}
		},
		[ countDownAPI ]
	);

	React.useEffect(() => {
		refMounted.current = true;

		return () => {
			refMounted.current = false;
		};
	}, []);

	const over = end.current && time.day === 0 && time.hour === 0 && time.minutes === 0 && time.seconds === 0;

	return { start, time, over };
};

export default useTimeCountDown;
