import { getKeyAndValue } from './utils';
import {
  createStoreManager,
  Constructor,
  StoreManager,
  ItemBuilder,
} from './reflect';

interface PerfumerConfig<OP> {
  storeKey: string;
  defaultViewKey: string;
  viewFunctionName: string;
  depends?: StoreManager[];
  itemBuilder?: ItemBuilder<OP>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createPerfumer<OP = any>(config: PerfumerConfig<OP>) {
  const {
    storeKey,
    defaultViewKey,
    viewFunctionName,
    depends = [],
    itemBuilder,
  } = config;

  const manager = createStoreManager({
    storeKey,
    defaultViewKey,
    depends,
  });

  function FieldItem(keyOrOptions: string | OP, optionOrNull?: OP) {
    const [key, optionValue] = getKeyAndValue(keyOrOptions, optionOrNull);

    return function fieldDecorator(target: any, fieldName: string) {
      manager.addFieldOption({
        target: target.constructor,
        view: key,
        fieldName,
        optionValue,
      });
    };
  }

  const defaultBuilder = (item: any): any => item;
  const createFieldDecorator = (
    optionKey: string,
    optionDefaultValue: any,
    builder = defaultBuilder
  ) => {
    return (keyOrOptions?: string | OP, optionOrNull?: OP) => {
      const [viewKey = defaultViewKey, viewOptions = optionDefaultValue] = getKeyAndValue(
        keyOrOptions,
        optionOrNull
      );

      return FieldItem(viewKey, {
        [optionKey]: builder(viewOptions),
      } as OP);
    };
  };

  function Controller(views: Record<string, string[]> = {}) {
    return function <T extends Constructor>(target: T): T {
      const cacheStore: Record<string, any> = {};

      const getOptions = (viewName: string) => {
        if (!cacheStore[viewName]) {
          cacheStore[viewName] = manager.buildFieldOptions({
            target,
            view: viewName,
            fieldNames: views[viewName],
            builder: itemBuilder,
          });
        }

        return cacheStore[viewName];
      };

      Object.defineProperty(target, viewFunctionName, {
        value: function (key: string): OP[] {
          return getOptions(key);
        },
        writable: false,
        configurable: false,
        enumerable: false,
      });

      return target;
    };
  }

  return {
    store: manager,
    createFieldDecorator,
    Controller,
    FieldItem,
  };
}
