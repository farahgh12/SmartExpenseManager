import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { Table, Button, Modal, Form, Input, DatePicker, Select, InputNumber, Tag, Space, notification } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function Expenses({ expenses, categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  
  const { post, processing } = useForm();

  const handleAddExpense = (values) => {
    // Format date before sending
    const payload = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };
    
    router.post('/expenses', payload, {
      onSuccess: () => {
        setIsModalOpen(false);
        form.resetFields();
        notification.success({ message: 'Expense added successfully!' });
      },
      onError: () => {
        notification.error({ message: 'Failed to add expense. Please check your inputs.' });
      }
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this expense?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        router.delete(`/expenses/${id}`, {
          onSuccess: () => notification.success({ message: 'Expense deleted successfully!' })
        });
      }
    });
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => dayjs(text).format('MMM DD, YYYY'),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="orange" className="border-earth-200 text-earth-800 bg-earth-100">{category?.name || 'Uncategorized'}</Tag>
      ),
      filters: categories.map(c => ({ text: c.name, value: c.id })),
      onFilter: (value, record) => record.category_id === value,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="text-clay-600 font-semibold">-${Number(amount).toFixed(2)}</span>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <AppLayout title="Manage Expenses">
      <Head title="Expenses" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-earth-900">Your Expenses</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setIsModalOpen(true)}
          className="bg-sage-600 shadow-md hover:bg-sage-500 border-none"
          size="large"
        >
          Add Expense
        </Button>
      </div>

      <Table 
        dataSource={expenses} 
        columns={columns} 
        rowKey="id" 
        className="premium-shadow border border-earth-100 rounded-xl overflow-hidden"
        pagination={{ pageSize: 10 }}
      />

      <Modal 
        title={<span className="text-lg font-bold text-earth-900">Add New Expense</span>}
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddExpense}
          className="mt-4"
        >
          <Form.Item 
            name="description" 
            label="Description" 
            rules={[{ required: true, message: 'Please enter a description!' }]}
          >
            <Input size="large" placeholder="E.g., Groceries from Walmart" />
          </Form.Item>
          
          <div className="flex gap-4">
            <Form.Item 
              name="amount" 
              label="Amount ($)" 
              rules={[{ required: true, message: 'Please enter the amount!' }]}
              className="flex-1"
            >
              <InputNumber size="large" className="w-full" min={0.01} step={0.01} placeholder="0.00" />
            </Form.Item>

            <Form.Item 
              name="date" 
              label="Date" 
              rules={[{ required: true, message: 'Please select a date!' }]}
              className="flex-1"
            >
              <DatePicker size="large" className="w-full" />
            </Form.Item>
          </div>

          <Form.Item 
            name="category_id" 
            label="Category" 
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select size="large" placeholder="Select a category">
              {categories.map(c => (
                <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full bg-sage-600 hover:bg-sage-700 h-12 text-base shadow-md border-none font-bold mt-2"
            loading={processing}
          >
            Save Expense
          </Button>
        </Form>
      </Modal>
    </AppLayout>
  );
}
