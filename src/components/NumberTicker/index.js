import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const numArr = new Array(10).fill(1).map((ele, index) => index);
function TickerNumber({ index, num }) {
	const [ changeNum, setChangeNum ] = useState(0);

	const [ height, setHeight ] = useState(0);
	useEffect(
		() => {
			setChangeNum(num);
		},
		[ num ]
	);

	useEffect(
		() => {
			if (height) {
				setChangeNum(num);
			} else {
				setHeight(heightRef.current.clientHeight);
			}
		},
		[ height, num ]
	);

	const heightRef = useRef();
	return (
		<div className="num-item-wrap" style={{ height: height || undefined }}>
			{height ? (
				<div
					className="num-item"
					style={{
						transform: `translateY(-${changeNum * 10}%)`,
						transitionDelay: index * 100 + 'ms'
					}}
				>
					{numArr.map((ele) => (
						<div style={{ height: height }} key={ele}>
							{ele}
						</div>
					))}
				</div>
			) : (
				<div ref={heightRef}>-</div>
			)}
		</div>
	);
}

export default function NumberTicker({ number, className }) {
	if (!number && number !== 0) return null;

	const stringifyNumber = number.toString();

	const splitText = stringifyNumber.split('');

	return (
		<div className={`wrap ${className || ''}`}>
			{splitText.map((ele, index) => {
				const key = `time-${index}`;
				const numItem = Number(ele);
				if (isNaN(numItem)) {
					return <React.Fragment key={key}>{ele}</React.Fragment>;
				}
				return <TickerNumber index={index} key={key} num={parseInt(numItem)} />;
			})}
		</div>
	);
}
