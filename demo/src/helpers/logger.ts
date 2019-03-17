// tslint:disable-next-line:no-console
const noop = (...args: any) => {};

let log = noop;

if (process.env.NODE_ENV === 'development') log = console.log;

export { log };
