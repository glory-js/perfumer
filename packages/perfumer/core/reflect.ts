import "reflect-metadata";

export type Constructor = { new (...args: any[]): any };

export type ItemBuilder<T> = (name: string, item: T) => any;

const defaultOptionBuilder = (name: string, item: any) => item;

export interface StoreManagerProps {
  storeKey: string;
  defaultViewKey: string;
  depends: StoreManager[];
}

interface BuildFieldOptionsProps<OP> {
  target: Constructor;
  view: string;
  fieldNames: string[];
  builder?: ItemBuilder<OP>;
}

export interface StoreManager<OP = any> {
  config: StoreManagerProps;

  getStore: (target: Constructor) => any;

  addFieldOption: (params: {
    target: Constructor;
    view: string;
    fieldName: string;
    optionValue: any;
  }) => void;

  getOwnerOptions: (target: Constructor, view: string, fieldName: string) => OP;

  getFieldOptions: (target: Constructor, view: string, fieldName: string) => OP;

  buildFieldOptions: (params: BuildFieldOptionsProps<OP>) => OP[];
}

export function createStoreManager<OP>(
  config: StoreManagerProps
): StoreManager<OP> {
  const { storeKey, defaultViewKey, depends } = config;

  const getStore = (target: Constructor) => {
    if (!Reflect.hasMetadata(storeKey, target.prototype)) {
      Reflect.defineMetadata(storeKey, {}, target.prototype);
    }
    return Reflect.getMetadata(storeKey, target.prototype);
  };

  const addFieldOption = (params: {
    target: Constructor;
    view: string;
    fieldName: string;
    optionValue: any;
  }) => {
    const { target, view = defaultViewKey, fieldName, optionValue } = params;

    const store = getStore(target);
    if (!store[view]) {
      store[view] = {};
    }

    if (!store[view][fieldName]) {
      store[view][fieldName] = [];
    }

    store[view][fieldName].push(optionValue);
  };

  const getOwnerOptions = (
    target: Constructor,
    view: string,
    fieldName: string
  ) => {
    const store = getStore(target);
    return [
      ...(store[defaultViewKey]?.[fieldName] || []),
      ...(store[view]?.[fieldName] || []),
    ].reduce(
      (acc, cur) => ({
        ...acc,
        ...cur,
      }),
      {}
    );
  };

  const getFieldOptions = (
    target: Constructor,
    view: string,
    fieldName: string
  ): OP => {
    const dependsOptions = depends.reduce((acc, store) => {
      return {
        ...acc,
        ...store.getFieldOptions(target, view, fieldName),
      };
    }, {});

    return {
      ...dependsOptions,
      ...getOwnerOptions(target, view, fieldName),
    };
  };

  const buildFieldOptions = (params: BuildFieldOptionsProps<OP>): OP[] => {
    const { target, view, fieldNames, builder = defaultOptionBuilder } = params;
    const instance = new target();
    return fieldNames.map((fieldName) => {
      return builder(fieldName, {
        ...instance[fieldName],
        ...getFieldOptions(target, view, fieldName),
      });
    });
  };

  return {
    config,
    getStore,
    addFieldOption,
    getOwnerOptions,
    getFieldOptions,
    buildFieldOptions,
  };
}
