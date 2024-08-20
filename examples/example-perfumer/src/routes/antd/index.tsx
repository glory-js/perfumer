import { ProTable } from '@ant-design/pro-components';
import { createFileRoute } from '@tanstack/react-router';
import styled from '@emotion/styled';
import Form from '../../components/form';
import UserEntity from './-userEntity';

export const Route = createFileRoute('/antd/')({
  component: About,
});

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled.div({
  padding: 20,
});

function About() {
  const columns = UserEntity.viewTable('common');
  console.log('columns===>', columns);

  const formItems = UserEntity.viewForm('common');
  console.log('formItems==>', formItems);

  return (
    <Root>
      <Content>
        <ProTable columns={columns} />
      </Content>
      <Content>
        <Form items={formItems} />
      </Content>
    </Root>
  );
}
