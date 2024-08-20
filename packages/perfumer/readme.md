# perfumer
## How can we work with it

perfumer 用于创建一些装饰器，通过这些装饰器我们可以方便的管理一个实体类（或者是你想要的其他类）。 

例如： `antd` 工具包中，我们创建的 `FormController` 和 `TableController` 用于生成表单和表格的配置项。

## antd 扩展
在 `antd` 中我们创建了两套分别服务与表单和表格的装饰器。
```typescript
import { createPerfumer } from '../core';

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

```

```typescript
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

```

随后我们遍可以使用他们， 例如我们定义了一个实体类：
```typescript
import {
  TableController,
  TableColumn,
  TableColumnTools,
  FormController,
  FormItem,
  FormItemTools,
  withTypes,
} from '@glory/perfumer/antd';
import Base from './-base';

const tablesViewer = {
  common: ['name'],
  'common.edit': ['name', 'age'],
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
```

我们可以通过 `TableController`/ `@FormController` 定义这个实体类， 并且
在 `@TableColumn` 和 `@FormItem` 定义任何你希望的属性。随后便可以构造表格与表单的配置：
```typescript
  const columns = UserEntity.viewTable('common');
  console.log('columns===>', columns);

  const formItems = UserEntity.viewForm('common');
  console.log('formItems==>', formItems);
```

这些代码在 `examples/example-perfumer` 可以查看具体用法。



## 更多
### 多映射
我们可以看到  `const columns = UserEntity.viewTable('common');` 这行代码传入了一个 `common` 参数作为 key. 这个 key 对应 `@TableController` 参数中的 key 值，用于指导我们需要使用哪些字段。 例如 `'common.edit'` 将使用 `['name', 'id', 'age']` 两个字段而 `common` 仅使用 `['name']` 这一个字段。

### 继承
我们还可以定义一个基类， 例如：
```typescript
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
```
继这个基类将直接获取其字段：
```typescript
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
```

### 自定义装饰器
在很多时候， 我们希望自定义一些常用的属性，如 demo 中的 
```typescript
@FormItemTools.Required('please input name')
```

`createPerfumer` 通过其返回值 `createFieldDecorator` 实现这一特性。例如创建 `Required` 这个装饰器的代码如下：
```typescript
import { createFormItemDecorator } from './form';

export const Required = createFormItemDecorator(
  'rules',
  'please input',
  (message) => [
    {
      required: true,
      message,
    },
  ]
);
```


## antd 扩展
目前对 ant 的 pro-component 这个库做了内置的支持。其位于 `@glory/perfumer/antd` 下。 后续可能会支持更多其他的用法。



