import {
  TableController,
  TableColumn,
  TableColumnTools,
  FormController,
  FormItem,
  FormItemTools,
  withTypes,
} from '@glory-js/perfumer/antd';
import Base from './-base';

const tablesViewer = {
  common: ['name', 'age'],
  'common.edit': ['name'],
};

const formsViewer = {
  common: ['name', 'age'],
  'common.edit': ['name', 'age'],
};

@TableController(tablesViewer)
@FormController(formsViewer)
class UserEntity extends Base {
  @TableColumn({
    hideInSearch: true,
  })
  @FormItem({
    placeholder: 'name',
  })
  @FormItemTools.Required('please input name')
  name = {
    title: 'name title',
  };

  @TableColumnTools.HideInSearch()
  @FormItem({})
  age = {
    title: 'age title',
  };
}

export default withTypes(UserEntity, [tablesViewer, formsViewer]);
