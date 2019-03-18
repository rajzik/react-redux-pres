import React from 'react';

interface props {
	title: string;
	onRemove: () => void;
}

export default function TodoItem({ title, onRemove }: props) {
	return (
		<div>
			<p>{title}</p>
			<button onClick={onRemove}>Remove Me</button>
		</div>
	);
}
