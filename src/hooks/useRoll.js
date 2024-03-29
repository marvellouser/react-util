import { useState, useRef, useCallback } from 'react';

const useRoll = ({ endHandler, num = 8 }) => {
	//是否滚动状态
	const [ runing, setRuning ] = useState(false);
	//滚动坐标
	const [ index, setIndex ] = useState(-1);
	//当前滚动次数
	const rollCount = useRef(-1);
	//当前滚动速度 初始速度150
	const speed = useRef(150);
	//最小滚动速度
	const minSpeed = 320;
	//最大滚动速度
	const maxSpeed = 50;
	//减速节点 当滚动次数到达改节点后开始减速
	const slowDownNode = useRef(num * 4);
	//最终奖品的坐标
	const awardResultIndex = useRef(-1);

	//滚动的结束节点 -> 当滚动次数等于该节点 滚动停止
	const closeNodeIndex = useRef(-1);

	const engine = useRef();

	const numRoll = num * 2;

	const reset = useCallback(
		() => {
			if (engine.current) {
				clearTimeout(engine.current);
			}

			speed.current = 150;

			setIndex(-1);

			rollCount.current = -1;

			closeNodeIndex.current = -1;

			awardResultIndex.current = -1;

			slowDownNode.current = num * 4;
		},
		[ num ]
	);

	const startRoll = useCallback(
		() => {
			rollCount.current++;

			const currentIndex = rollCount.current % num;

			setIndex(currentIndex);

			if (awardResultIndex.current > -1 && rollCount.current >= slowDownNode.current) {
				speed.current = speed.current + (minSpeed - maxSpeed) / parseInt(numRoll + awardResultIndex.current);

				if (rollCount.current === closeNodeIndex.current) {
					setTimeout(() => {
						endHandler && endHandler(awardResultIndex.current);
					}, 400);

					setRuning(false);

					return;
				}
			} else {
				speed.current = speed.current <= maxSpeed ? maxSpeed : speed.current - 15;
			}
			engine.current = setTimeout(startRoll, [ speed.current ]);
		},
		[ endHandler, num, numRoll ]
	);

	const stop = useCallback(
		(index) => {
			awardResultIndex.current = index;

			//当前节点 是否大于 最小减速节点
			if (rollCount.current > slowDownNode.current) {
				//结束节点= 当前节点 - 当前节点超出索引0的值 + numRoll (2圈) + 奖品的0-7 坐标
				closeNodeIndex.current =
					rollCount.current - rollCount.current % num + numRoll + awardResultIndex.current;
			} else {
				//结束节点= 减速节点(默认最小减速节点) +numRoll (2圈) + 奖品的0-7 坐标
				closeNodeIndex.current = slowDownNode.current + numRoll + awardResultIndex.current;
			}
			//减速节点=结束节点-numRoll（2圈）
			slowDownNode.current = closeNodeIndex.current - numRoll;
		},
		[ num, numRoll ]
	);

	const start = useCallback(
		() => {
			if (runing) return;
			//开启滚动状态
			setRuning(true);
			//重置
			reset();
			//滚动函数
			startRoll();
		},
		[ reset, runing, startRoll ]
	);

	return { index, runing, start, stop, reset };
};

export default useRoll;
