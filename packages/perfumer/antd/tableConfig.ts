export const storeKey = '__antd_table_store_key';

export const defaultViewKey = '__antd_table_default_view_key';

export const viewFunctionName = 'viewTable';

export const itemBuilder = (name: string, options: any) => {
  return {
    dataIndex: name,
    ...options,
  };
};
