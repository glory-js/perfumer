import { createWithTypes } from '@glory-js/perfumer';
export * from './table';
export * as TableColumnTools from './tableTools';
export * from './form';
export * as FormItemTools from './formTools';

export const withTypes = createWithTypes<['viewTable', 'viewForm']>();
