import {
  TableController,
  TableColumn,
  FormController,
} from '@glory-js/perfumer/antd';

@TableController()
@FormController()
export default class BaseEntity {
  @TableColumn({
    hideInTable: true,
    fieldProps: {
      placeholder: 'please input search value',
    },
  })
  searchValue = { title: 'search' };

  @TableColumn({
    hideInSearch: true,
    valueType: 'index',
    width: '60px',
  })
  index = { title: 'index' };
}
