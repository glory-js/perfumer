import { createPerfumer } from '../core';

import {
  storeKey,
  defaultViewKey,
  viewFunctionName,
  itemBuilder,
} from './tableConfig';

export const {
  Controller: TableController,
  FieldItem: TableColumn,
  createFieldDecorator: createTableColumnDecorator,
} = createPerfumer({
  storeKey,
  defaultViewKey,
  viewFunctionName,
  itemBuilder,
});
