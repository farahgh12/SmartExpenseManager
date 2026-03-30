import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { Table, Tag, Button, Modal, Form, Input, Select, Space, notification } from 'antd';
import { 
  PlusOutlined, 
  HomeOutlined, 
  WalletOutlined, 
  ShoppingCartOutlined, 
  CarOutlined, 
  RestOutlined, 
  MedicineBoxOutlined, 
  GiftOutlined,
  HeartOutlined,
  CoffeeOutlined,
  ThunderboltOutlined,
  SmileOutlined
} from '@ant-design/icons';

const ICON_LIST = [
  { label: 'Accueil', value: 'HomeOutlined', icon: <HomeOutlined /> },
  { label: 'Portefeuille', value: 'WalletOutlined', icon: <WalletOutlined /> },
  { label: 'Courses', value: 'ShoppingCartOutlined', icon: <ShoppingCartOutlined /> },
  { label: 'Transport', value: 'CarOutlined', icon: <CarOutlined /> },
  { label: 'Restaurant', value: 'RestOutlined', icon: <RestOutlined /> },
  { label: 'Santé', value: 'MedicineBoxOutlined', icon: <MedicineBoxOutlined /> },
  { label: 'Cadeau', value: 'GiftOutlined', icon: <GiftOutlined /> },
  { label: 'Loisirs', value: 'HeartOutlined', icon: <HeartOutlined /> },
  { label: 'Café', value: 'CoffeeOutlined', icon: <CoffeeOutlined /> },
  { label: 'Autre', value: 'SmileOutlined', icon: <SmileOutlined /> },
];

const COLOR_LIST = [
  { label: 'Sage', value: '#8A9A5B' },
  { label: 'Clay', value: '#E2725B' },
  { label: 'Sand', value: '#D2B48C' },
  { label: 'Ocean', value: '#5B8A9A' },
  { label: 'Berry', value: '#9A5B8A' },
  { label: 'Forest', value: '#58663a' },
  { label: 'Sunset', value: '#c15b47' },
];

const IconRenderer = ({ name }) => {
  const icons = {
    HomeOutlined: <HomeOutlined />,
    WalletOutlined: <WalletOutlined />,
    ShoppingCartOutlined: <ShoppingCartOutlined />,
    CarOutlined: <CarOutlined />,
    RestOutlined: <RestOutlined />,
    MedicineBoxOutlined: <MedicineBoxOutlined />,
    GiftOutlined: <GiftOutlined />,
    HeartOutlined: <HeartOutlined />,
    CoffeeOutlined: <CoffeeOutlined />,
    ThunderboltOutlined: <ThunderboltOutlined />,
    SmileOutlined: <SmileOutlined />,
  };
  return icons[name] || <SmileOutlined />;
};

export default function Categories({ categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddCategory = (values) => {
    router.post('/categories', values, {
      onSuccess: () => {
        setIsModalOpen(false);
        form.resetFields();
        notification.success({ message: 'Catégorie ajoutée avec succès !' });
      }
    });
  };

  const columns = [
    { 
      title: 'Icon', 
      dataIndex: 'icon', 
      key: 'icon',
      width: 80,
      align: 'center',
      render: (icon, record) => (
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-sm"
          style={{ backgroundColor: `${record.color}15`, color: record.color }}
        >
          <IconRenderer name={icon} />
        </div>
      )
    },
    { 
      title: 'Nom', 
      dataIndex: 'name', 
      key: 'name',
      render: (name) => <span className="font-bold text-earth-900 text-base">{name}</span>
    },
    { 
      title: 'Couleur', 
      dataIndex: 'color', 
      key: 'color',
      render: (color) => (
        <Space>
          <div className="w-4 h-4 rounded-full shadow-inner border border-white/20" style={{ backgroundColor: color }} />
          <Tag bordered={false} className="font-mono text-[11px] px-2 py-0" style={{ backgroundColor: `${color}10`, color: color }}>
            {color.toUpperCase()}
          </Tag>
        </Space>
      )
    },
  ];

  return (
    <AppLayout title="Catégories">
      <Head title="Catégories" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-earth-900">Vos Catégories</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={() => setIsModalOpen(true)}
          className="bg-sage-600 hover:bg-sage-500 border-none shadow-md"
        >
          Ajouter une Catégorie
        </Button>
      </div>
      <Table 
        dataSource={categories} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 8 }}
        className="premium-shadow border border-earth-100 rounded-xl overflow-hidden" 
      />

      <Modal
        title={<span className="text-lg font-bold text-earth-900">Nouvelle Catégorie</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCategory} className="mt-4">
          <Form.Item name="name" label="Nom de la Catégorie" rules={[{ required: true, message: 'Entrez un nom !' }]}>
            <Input size="large" placeholder="Ex: Alimentation, Transport..." />
          </Form.Item>
          
          <div className="flex gap-4">
            <Form.Item name="icon" label="Icône" rules={[{ required: true }]} className="flex-1">
              <Select size="large" placeholder="Choisir">
                {ICON_LIST.map(item => (
                  <Select.Option key={item.value} value={item.value}>
                    <Space>{item.icon} {item.label}</Space>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="color" label="Couleur" rules={[{ required: true }]} className="flex-1">
              <Select size="large" placeholder="Choisir">
                {COLOR_LIST.map(color => (
                  <Select.Option key={color.value} value={color.value}>
                    <Space>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color.value }} />
                      {color.label}
                    </Space>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          
          <Button type="primary" htmlType="submit" className="w-full bg-sage-600 hover:bg-sage-700 h-12 text-base font-bold shadow-md border-none mt-2">
            Créer la Catégorie
          </Button>
        </Form>
      </Modal>
    </AppLayout>
  );
}
