import React from 'react';
// import { TestUseTimeCountDown } from './test';
import { copyContent, getBrowser } from './util';
export default function App() {
	// return <TestUseTimeCountDown />;
	const obj = getBrowser();
	console.log(obj, 'mmmmmmmmmmm');
	return (
		<div
			onClick={() => {
				copyContent('12312', () => {
					console.log('copy content');
				});
			}}
		>
			app
		</div>
	);
}
