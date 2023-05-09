import './index.css';
export default function HoverText({ children }) {
	return (
		<div className={'text-wrap'}>
			{children}
			<span className="inner">
				<span className="move">{children}</span>
			</span>
		</div>
	);
}
