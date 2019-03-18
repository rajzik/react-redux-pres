import React, { useState } from 'react';

import { curryFunction, curryInputEvent, multiFunction } from '../../helpers';

interface IProps {
	addItem: (title: string) => void;
}

export default function AddTodo({ addItem }: IProps) {
	const [currentValue, changeValue] = useState('');

	return (
		<div>
			<input type="text" value={currentValue} onChange={curryInputEvent(changeValue)} />
			<button onClick={multiFunction(curryFunction(addItem, currentValue), curryFunction(changeValue, ''))}>
				Add todo
			</button>
		</div>
	);
}
