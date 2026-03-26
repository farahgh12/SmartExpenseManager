import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { Table, Tag } from 'antd';

export default function Categories({ categories }) {
  const columns = [
    { title: 'Nom', dataIndex: 'name', key: 'name' },
    { title: 'Icône', dataIndex: 'icon', key: 'icon' },
    { 
      title: 'Couleur', 
      dataIndex: 'color', 
      key: 'color',
      render: (color) => <Tag color={color}>{color}</Tag>
    },
  ];

  return (
    <AppLayout title="Catégories">
      <Head title="Catégories" />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-earth-900">Vos Catégories</h2>
      </div>
      <Table dataSource={categories} columns={columns} rowKey="id" className="premium-shadow border border-earth-100 rounded-xl overflow-hidden" />
    </AppLayout>
  );
}
