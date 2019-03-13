import { IEntity } from '../types';

export function update<T extends IEntity>(
  entityArray: T[],
  entityId: number,
  data: T & Object
): T[] {
  return entityArray.reduce(curriedCallBack(entityId, data), []);
}

function curriedCallBack<T extends IEntity>(entityId: number, data: T) {
  const { id, ...rest } = data;
  return function reduceCallback(prev: T[], curr: T): T[] {
    if (curr.id === entityId) {
      return [
        ...prev,
        {
          ...curr,
          ...rest,
        },
      ];
    }
    return [...prev, curr];
  };
}

export function remove<T extends IEntity>(entityArray: T[], itemId: number) {
  return entityArray.filter((cur: T) => cur.id !== itemId);
}

export function create<T>(entityArray: T[], item: T & Object) {
  return [...entityArray, item];
}

export { mountWithInitialProps, providers, renderWithProvider } from './mountHelpers';
