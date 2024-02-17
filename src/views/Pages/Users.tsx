import React from 'react';
import { Breadcrumb, theme, Layout, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useMutation, useQuery } from 'react-query'
import { getAllUsers, updateUserStatus } from '../../contexts/apiRequests';
import moment from 'moment';


const { Content} = Layout;



interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }


  const formatDate = (date: string) => {

    const dateFormat = moment(date).format('YYYY-MM-DD HH:mm:ss');

    return dateFormat;
  };


export const Users: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record :any) => <span>{record.fullname}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'JoinedAt',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (text, record :any) => <span>{formatDate(record.createdAt)}</span>,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, record: any) => (
        <>
           <Tag color={record.status ? 'green': 'red'}>
                {record.status ? 'Active' : 'InActive'}
            </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => (
        <Space size="middle">
          <a onClick={() => handleStatus(record)}>{record.status ? 'InActive' : 'Active'}</a>
        </Space>
      ),
    },
  ];
  
   const {data: users , isLoading , refetch} = useQuery('users', getAllUsers);

   const mutation = useMutation(updateUserStatus, {
    onSuccess: () => {
      refetch();
    },
  })

  const handleStatus = (record: any) => {
    console.log(record , '@recordrecordrecordrecord')
    mutation.mutate({
      userId: record.id,
      status: !record.status
    })
  }


  console.log(users, isLoading , '@users')
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
            <Table
             rowKey={(record : any) => record.id}
            loading={isLoading} columns={columns} dataSource={users} />
          </Content>
    </>
  );
};
