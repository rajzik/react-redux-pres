import { lazy } from 'react';

import { IPages } from '../../types/pages';

const pages: IPages[] = [
	{
		Component: lazy(() => import('../../pages/Main')),
		props: {
			path: '/',
			key: '/'
		}
	}
];

export { pages };
