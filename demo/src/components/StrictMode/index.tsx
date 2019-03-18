import React, { ReactNode, StrictMode as ReactSM } from 'react';

import { isDev } from '../../helpers';

interface IProps {
	children?: ReactNode;
}

export function StrictMode({ children = null }: IProps) {
	if (isDev()) {
		return <ReactSM>{children}</ReactSM>;
	}

	return <>{children}</>;
}
