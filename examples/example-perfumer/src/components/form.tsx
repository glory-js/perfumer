import { ProForm, ProFormText } from '@ant-design/pro-components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderFields = (items: any[]) => {
  return items?.map((item) => {
    const {
      component: Component = ProFormText,
      children: childrenData,
      ...props
    } = item;
    const renderChildren = () => childrenData && renderFields(childrenData);

    return (
      <Component key={props.name} {...props}>
        {renderChildren()}
      </Component>
    );
  });
};

const DefaultLabelCol = {
  flex: '120px',
};

const DefaultWrapperCol = {
  span: 'auto',
};

const DefaultColProps = {
  span: 12,
};

export default function Form(inProps: {
  items: any[];
  [x: string]: any;
  grid?: true | undefined;
  labelAlign?: 'left' | undefined;
  layout?: 'horizontal' | undefined;
  autoComplete?: 'off' | undefined;
  submitter?: false | undefined;
  labelCol?: { flex: string } | undefined;
  wrapperCol?: { span: string } | undefined;
  colProps?: { span: number } | undefined;
}) {
  const {
    items,
    grid = true,
    labelAlign = 'left',
    layout = 'horizontal',
    autoComplete = 'off',
    submitter = false,
    labelCol = DefaultLabelCol,
    wrapperCol = DefaultWrapperCol,
    colProps = DefaultColProps,
    ...props
  } = inProps;

  return (
    <ProForm
      grid={grid}
      labelAlign={labelAlign}
      layout={layout}
      labelCol={labelCol}
      colProps={colProps}
      wrapperCol={wrapperCol}
      submitter={submitter}
      autoComplete={autoComplete}
      {...props}
    >
      {renderFields(items)}
    </ProForm>
  );
}
