export function executeFunctionLike<T extends unknown[], R>(
  callback: ((...args: T) => R) | R,
  ...params: T
): R {
  if (typeof callback === 'function') {
    // @ts-expect-error: checked
    return callback?.(...params);
  }
  return callback;
}

export function getKeyAndValue<T>(
  keyOrValue: string | T,
  valueOrNull?: T
): [string | undefined, T] {
  if (valueOrNull) {
    return [keyOrValue as string, valueOrNull];
  }
  return [undefined, valueOrNull];
}

export function createWithTypes<FN extends string[]>() {
  return function withTypes<
    T extends { new (...args: any[]): any },
    C extends Array<Record<string, Array<any>>>,
  >(
    target: T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    config: C
  ): T & {
    [P in FN[number]]: (key: keyof C[number]) => any[]; // viewForm: (key: keyof FK) => any[];
  } {
    // @ts-expect-error: just fix types
    return target;
  };
}
