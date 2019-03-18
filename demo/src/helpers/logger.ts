const noop = (..._: any) => undefined;

let log: (...args: any[]) => void = noop;

// tslint:disable-next-line:no-console
if (process.env.NODE_ENV === 'development') log = console.log;

export { log };
