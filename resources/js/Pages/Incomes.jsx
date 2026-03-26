import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { Table, Button, Modal, Form, Input, DatePicker, Select, InputNumber, Tag, Space, notification } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function Incomes({ incomes, categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  
  const { post, processing } = useForm();

  const handleAddIncome = (values) => {
    const payload = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };
    
    router.post('/incomes', payload, {
      onSuccess: () => {
        setIsModalOpen(false);
        form.resetFields();
        notification.success({ message: 'Revenu ajouté avec succès!' });
      },
      onError: () => {
        notification.error({ message: 'Erreur lors de l\'ajout du revenu.' });
      }
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Voulez-vous vraiment supprimer ce revenu ?',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk: () => {
        router.delete(`/incomes/${id}`, {
          onSuccess: () => notification.success({ message: 'Revenu supprimé!' })
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
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Catégorie',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="green" className="border-earth-200 text-earth-800 bg-earth-100">{category?.name || 'Général'}</Tag>
      ),
    },
    {
      title: 'Montant',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="text-sage-600 font-semibold">+${Number(amount).toLocaleString()}</span>
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
    <AppLayout title="Gestion des Revenus">
      <Head title="Revenus" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-earth-900">Vos Revenus</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setIsModalOpen(true)}
          className="bg-sage-600 shadow-md hover:bg-sage-500 border-none"
          size="large"
        >
          Ajouter un Revenu
        </Button>
      </div>

      <Table 
        dataSource={incomes} 
        columns={columns} 
        rowKey="id" 
        className="premium-shadow border border-earth-100 rounded-xl overflow-hidden"
        pagination={{ pageSize: 10 }}
      />

      <Modal 
        title={<span className="text-lg font-bold text-earth-900">Nouveau Revenu</span>}
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddIncome}
          className="mt-4"
        >
          <Form.Item 
            name="source" 
            label="Source" 
            rules={[{ required: true, message: 'Veuillez entrer une source!' }]}
          >
            <Input size="large" placeholder="Ex: Salaire, Freelance..." />
          </Form.Item>
          
          <div className="flex gap-4">
            <Form.Item 
              name="amount" 
              label="Montant ($)" 
              rules={[{ required: true, message: 'Veuillez entrer le montant!' }]}
              className="flex-1"
            >
              <InputNumber size="large" className="w-full" min={0.01} step={0.01} placeholder="0.00" />
            </Form.Item>

            <Form.Item 
              name="date" 
              label="Date" 
              rules={[{ required: true, message: 'Veuillez sélectionner une date!' }]}
              className="flex-1"
            >
              <DatePicker size="large" className="w-full" />
            </Form.Item>
          </div>

          <Form.Item 
            name="category_id" 
            label="Catégorie (Optionnel)"
          >
            <Select size="large" placeholder="Choisir une catégorie">
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
            Enregistrer le Revenu
          </Button>
        </Form>
      </Modal>
    </AppLayout>
  );
}
