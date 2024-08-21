import { createTableColumnDecorator } from './table';

export const HideInSearch = createTableColumnDecorator('hideInSearch', true);

export const HideInTable = createTableColumnDecorator('hideInTable', true);

export const Ellipsis = createTableColumnDecorator('ellipsis', {
  showTitle: true,
});
