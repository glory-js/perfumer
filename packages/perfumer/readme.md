# perfumer
## Usage
```shell
yarn add @glory-js/perfumer
# or 
npm i @glory-js/perfumer
```

if you need antd extension:
```shell
yarn add @glory-js/perfumer-antd
# or 
npm i @glory-js/perfumer-antd
```


## How can we work with it

Perfumer is used to create some decorators, through which we can conveniently manage an entity class (or any other class you want).

For example, in the [perfumer-antd](./packages/perfumer-antd) package, we created the `FormController` and `TableController` to generate the configuration items for forms and tables.

## Antd Extension

In the [perfumer-antd](./packages/perfumer-antd) package library, we have created two sets of decorators, each serving the needs of forms and tables respectively.

```typescript
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

```

```typescript
import { createPerfumer } from '@glory-js/perfumer';

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

Subsequently, we can use the `FormController` and `TableController` decorators provided by the perfumer-antd package. For example, let's say we have defined an entity class:
```typescript
import {
  TableController,
  TableColumn,
  TableColumnTools,
  FormController,
  FormItem,
  FormItemTools,
  withTypes,
} from '@glory/perfumer-antd';
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


We can use the `TableController` and `FormController` decorators to define the configuration for the User entity class. Additionally, we can leverage the `TableColumn` and `@FormItem` decorators to define any properties we want for the table and form.

After that, we can then construct the configurations for the table and form components:
```typescript
  const columns = UserEntity.viewTable('common');
  console.log('columns===>', columns);

  const formItems = UserEntity.viewForm('common');
  console.log('formItems==>', formItems);
```


You can find the specific usage of these decorators and code examples in the [examples/example-perfumer](./examples/example-perfumer).

## more
### Multi-mapping

We can see that the code `const columns = UserEntity.viewTable('common');` passes a `common` parameter as the key. This key corresponds to the key value in the `@TableController` parameter, which guides us on which fields to use. For example, `common.edit`  will use the fields `['name', 'id', 'age']`, while `common` will only use the field `['name']`.

### Inheritance:

We can also define a base class, for example:

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

Extending from this base class, the derived classes will directly inherit its fields:

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

### Custom Decorators
In many cases, we might want to define some commonly used properties, such as the demo example you mentioned. We can create custom decorators to achieve this:

```typescript
@FormItemTools.Required('please input name')
```


`createPerfumer` provides the `createFieldDecorator` function, which allows you to implement custom decorators. For example, the implementation of the `Required` decorator could look like this:

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


## Ant Design Extension
Currently, the perfumer library provides built-in support for Ant Design's pro-components. You can add the following dependency to your project:

```
yarn add @glory/perfumer-antd
```
In the future, the perfumer library may support integrations with more external UI libraries and frameworks beyond just Ant Design's pro-components


