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
    // Selection is an array because of mode="tags"
    const selection = values.category_selection?.[0];
    const isNew = isNaN(selection);
    
    const payload = {
      description: values.description,
      amount: values.amount,
      date: values.date.format('YYYY-MM-DD'),
      category_id: !isNew ? selection : null,
      category_name: isNew ? selection : null,
    };
    
    router.post('/expenses', payload, {
      onSuccess: () => {
        setIsModalOpen(false);
        form.resetFields();
        notification.success({ message: 'Dépense ajoutée avec succès !' });
      },
      onError: () => {
        notification.error({ message: 'Erreur lors de l\'ajout de la dépense.' });
      }
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Voulez-vous vraiment supprimer cette dépense ?',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk: () => {
        router.delete(`/expenses/${id}`, {
          onSuccess: () => notification.success({ message: 'Dépense supprimée avec succès !' })
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
      title: 'Catégorie',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="orange" className="border-earth-200 text-earth-800 bg-earth-100">{category?.name || 'Non catégorisé'}</Tag>
      ),
      filters: categories.map(c => ({ text: c.name, value: c.id })),
      onFilter: (value, record) => record.category_id === value,
    },
    {
      title: 'Montant',
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
    <AppLayout title="Gérer les Dépenses">
      <Head title="Dépenses" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-earth-900">Vos Dépenses</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setIsModalOpen(true)}
          className="bg-sage-600 shadow-md hover:bg-sage-500 border-none"
          size="large"
        >
          Ajouter une Dépense
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
        title={<span className="text-lg font-bold text-earth-900">Ajouter une Nouvelle Dépense</span>}
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
            rules={[{ required: true, message: 'Veuillez entrer une description !' }]}
          >
            <Input size="large" placeholder="Ex: Courses au supermarché" />
          </Form.Item>
          
          <div className="flex gap-4">
            <Form.Item 
              name="amount" 
              label="Montant ($)" 
              rules={[{ required: true, message: 'Veuillez entrer le montant !' }]}
              className="flex-1"
            >
              <InputNumber size="large" className="w-full" min={0.01} step={0.01} placeholder="0.00" />
            </Form.Item>

            <Form.Item 
              name="date" 
              label="Date" 
              rules={[{ required: true, message: 'Veuillez sélectionner une date !' }]}
              className="flex-1"
            >
              <DatePicker size="large" className="w-full" />
            </Form.Item>
          </div>

          <Form.Item 
            name="category_selection" 
            label="Catégorie" 
            rules={[{ required: true, message: 'Veuillez sélectionner ou taper une catégorie !' }]}
          >
            <Select 
              size="large" 
              showSearch
              mode="tags"
              maxCount={1}
              placeholder="Sélectionner ou taper une nouvelle catégorie"
              optionFilterProp="label"
            >
              {categories.map(c => (
                <Select.Option key={c.id} value={c.id} label={c.name}>{c.name}</Select.Option>
              ))}
              {/* This mode allows selecting existing or searching. 
                  To support typing new ones, we can use dropdownRender or just mode="tags" with maxCount=1 */}
            </Select>
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full bg-sage-600 hover:bg-sage-700 h-12 text-base shadow-md border-none font-bold mt-2"
            loading={processing}
          >
            Enregistrer la Dépense
          </Button>
        </Form>
      </Modal>
    </AppLayout>
  );
}
