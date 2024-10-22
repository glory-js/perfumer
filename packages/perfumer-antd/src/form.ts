import { createPerfumer } from '@glory-js/perfumer';

import {
  storeKey,
  defaultViewKey,
  viewFunctionName,
  itemBuilder,
} from './formConfig';

export const {
  Controller: FormController,
  FieldItem: FormItem,
  createFieldDecorator: createFormItemDecorator,
} = createPerfumer({
  storeKey,
  defaultViewKey,
  viewFunctionName,
  itemBuilder,
});
