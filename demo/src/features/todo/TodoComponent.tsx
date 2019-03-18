import React from 'react';
import { Props } from './TodoContainer';

function TodoComponent(props: Props) {
	console.log(props);
	return <div>Ahoj svete</div>;
}

export default TodoComponent;
