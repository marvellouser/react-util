import useRfa from '../hooks/useRfa';

export default function TestUseRfa() {
	const { start, stop } = useRfa(
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
