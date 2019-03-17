import { StateType, ActionType } from 'typesafe-actions';

export type Store = StateType<typeof import('../stores/index').default>;
export type RootAction = ActionType<typeof import('../stores/actions').default>;
export type RootState = StateType<typeof import('../stores/reducer').default>;
export type Services = typeof import('../helpers/services').default;

export interface ITodo {
	id: number;
	title: string;
	done?: boolean;
}
