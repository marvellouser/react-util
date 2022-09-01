import { useRaf } from '../hooks';

export default function TestUseRaf() {
	const { start, stop } = useRaf(
		1000,
		() => {
			console.log(1111);
		},
		{ immediate: true }
	);

	return (
		<div>
			<button onClick={start}>start</button>
			<button onClick={stop}>stop</button>
		</div>
	);
}
