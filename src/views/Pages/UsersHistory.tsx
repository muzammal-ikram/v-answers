import React from 'react';
import { Breadcrumb, theme, Layout, Table, Tag } from 'antd';
import { useQuery } from 'react-query';
import { getAllUsersHistory } from '../../contexts/apiRequests';
import moment from 'moment';

const { Content} = Layout;


export const UsersHistory: React.FC = () => {

  const formatDate = (date: string) => {

    const dateFormat = moment(date).format('YYYY-MM-DD HH:mm:ss');

    return dateFormat;
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  const columns: any = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, 
    {
      title: 'LoggedIn At',
      dataIndex: 'loggedInAt',
      key: 'loggedInAt',
      render: (text: any, record :any) => <span>{formatDate(record.createdAt)}</span>,
    },
    {
      title: 'LoggedIn Status',
      dataIndex: 'loggedInStatus',
      key: 'loggedInStatus',
      render: (text: any, record :any) => <span>
                <Tag color={record.activeLoggedIn ? 'green': 'red'}>
                 {record.activeLoggedIn ? 'Active' : 'InActive'}
             </Tag>
        </span>,
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, record: any) => (
    //     <>
    //        <Tag color={record.status ? 'green': 'red'}>
    //             {record.status ? 'Active' : 'InActive'}
    //         </Tag>
    //     </>
    //   ),
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record: any) => (
    //     <Space size="middle">
    //       <a onClick={() => handleStatus(record)}>{record.status ? 'InActive' : 'Active'}</a>
    //     </Space>
    //   ),
    // },
  ];

  
  const {data: usersHistory , isLoading } = useQuery('userHistory', getAllUsersHistory);

  return (
    <>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* UsersHistory */}
            <Table
             rowKey={(record : any) => record.id}
            loading={isLoading} columns={columns} dataSource={usersHistory} />
          </Content>
    </>
  );
};
