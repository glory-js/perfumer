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
