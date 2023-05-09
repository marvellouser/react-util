import React, { useState } from 'react';
import NumberTicker from '../components/NumberTicker';

export default function NumberTickerTest() {
	const [ num, setNum ] = useState(5);
	window.setNum = setNum;
	return (
		<div style={{ width: 300, paddingTop: 100 }}>
			<NumberTicker number={num} />
		</div>
	);
}
