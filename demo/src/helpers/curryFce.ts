import { FormEvent } from 'react';

type anyFunc = (..._: any) => any;
export const curryFunction = (fce: anyFunc, ...rest: any[]) => () => fce(...rest);

export const curryInputEvent = (fce: anyFunc) => ({ currentTarget: { value } }: FormEvent<HTMLInputElement>) =>
	fce(value);
