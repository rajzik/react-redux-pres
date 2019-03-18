import React from 'react';
import { Router as ReachRouter } from '@reach/router';
import { pages } from '../../const';
import { IPages } from '../../types/pages';

function mapPages({ Component, props }: IPages) {
	return <Component {...props} />;
}

export function Router() {
	return <ReachRouter>{pages.map(mapPages)}</ReachRouter>;
}
