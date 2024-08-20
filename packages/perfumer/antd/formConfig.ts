export const storeKey = '__antd_form_store_key';

export const defaultViewKey = '__antd_form_default_view_key';

export const viewFunctionName = 'viewForm';

export const itemBuilder = (name: string, options: any) => {
  const { title: label, ...rest } = options;
  return {
    name,
    label,
    ...rest,
  };
};
