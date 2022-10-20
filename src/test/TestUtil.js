import { classNames } from '../util';

console.log(
	classNames(
		'a',
		'b',
		'c',
		[ 'd', 'e', 'f' ],
		{
			g: 10 > 9,
			h: false
		},
		{
			i: true,
			j: true,
			k: false
		}
	)
);
