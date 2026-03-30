import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '../../Components/Layout';
import { Card, Table, Tag, Space, Button, Row, Col, Statistic, message, Popconfirm, Tooltip, Input } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  BarChartOutlined, 
  DeleteOutlined, 
  SafetyCertificateOutlined,
  SwapOutlined,
  LockOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

export default function AdminDashboard({ users, stats }) {
  const { auth } = usePage().props;
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pin, setPin] = useState('');

  const handleVerifyPin = () => {
    if (pin === '1234') {
      setIsAuthorized(true);
      message.success('Accès autorisé !');
    } else {
      message.error('Code PIN incorrect');
      setPin('');
    }
  };

  const handleToggleRole = (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    router.patch(`/admin/users/${user.id}/role`, { role: newRole }, {
      onSuccess: () => message.success('Rôle mis à jour avec succès')
    });
  };

  const handleDeleteUser = (id) => {
    router.delete(`/admin/users/${id}`, {
      onSuccess: () => message.success('Utilisateur supprimé')
    });
  };

  // Lock Screen View
  if (!isAuthorized) {
    return (
      <AppLayout title="Sécurité Admin">
        <Head title="Accès Sécurisé" />
        <div className="h-[70vh] flex items-center justify-center px-4">
          <Card className="w-full max-w-md premium-shadow border-none rounded-3xl p-8 text-center bg-white/80 backdrop-blur-md">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <LockOutlined className="text-4xl text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-earth-900 mb-2">Espace Sécurisé</h2>
            <p className="text-earth-500 mb-8">Veuillez entrer le code secret pour accéder au panneau d'administration.</p>
            
            <Input.Password 
              size="large" 
              placeholder="••••" 
              autoFocus
              className="rounded-2xl h-16 mb-6 text-center text-3xl tracking-[1em] border-earth-100 bg-earth-50/50"
              value={pin}
              onChange={e => setPin(e.target.value)}
              onPressEnter={handleVerifyPin}
            />
            
            <Button 
              type="primary" 
              size="large" 
              onClick={handleVerifyPin}
              className="w-full h-14 bg-earth-900 hover:bg-earth-800 border-none rounded-2xl font-bold shadow-xl shadow-earth-200 transition-all active:scale-95"
            >
              Déverrouiller le Panneau
            </Button>

            <div className="mt-8 pt-6 border-t border-earth-50">
              <p className="text-xs text-earth-300 uppercase tracking-widest font-bold">SmartExpenseManager Security Layer</p>
            </div>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // Full Admin Dashboard View
  const columns = [
    {
      title: 'Utilisateur',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <div className="w-8 h-8 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center font-bold">
            {text.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-earth-900">{text}</div>
            <div className="text-xs text-earth-400">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const isAdm = role?.toLowerCase() === 'admin';
        return (
          <Tag color={isAdm ? 'gold' : 'default'} className={`rounded-full px-4 border-none font-bold ${isAdm ? 'bg-amber-100 text-amber-700' : 'bg-earth-50 text-earth-500'}`}>
            {role?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Membre depuis',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title={`Changer vers ${record.role?.toLowerCase() === 'admin' ? 'User' : 'Admin'}`}>
            <Button 
                type="text" 
                icon={<SwapOutlined />} 
                onClick={() => handleToggleRole(record)}
                className="text-sage-600 hover:bg-sage-50"
            />
          </Tooltip>
          <Popconfirm
            title="Supprimer l'utilisateur ?"
            description="Cette action est irréversible et supprimera toutes ses données."
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Oui, Supprimer"
            cancelText="Non"
            okButtonProps={{ danger: true }}
          >
            <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />} 
                disabled={record.id === auth.user.id}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <AppLayout title="Administration">
      <Head title="Admin Dashboard" />

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold text-earth-900 m-0 tracking-tight">Panneau d'Administration</h2>
          <p className="text-earth-500">Gérez les utilisateurs et surveillez la santé du système.</p>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card className="premium-shadow border-none bg-white rounded-2xl">
              <Statistic 
                title={<span className="text-earth-400 uppercase tracking-widest text-[10px] font-black">Utilisateurs Totaux</span>}
                value={stats.total_users}
                prefix={<TeamOutlined className="text-sage-500 mr-2" />}
                valueStyle={{ color: '#4a4435', fontWeight: 900 }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="premium-shadow border-none bg-white rounded-2xl">
              <Statistic 
                title={<span className="text-earth-400 uppercase tracking-widest text-[10px] font-black">Volume Dépenses (Plateforme)</span>}
                value={stats.total_expenses}
                precision={2}
                prefix={<BarChartOutlined className="text-clay-500 mr-2" />}
                valueStyle={{ color: '#E2725B', fontWeight: 900 }}
                suffix="$"
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="premium-shadow border-none bg-white rounded-2xl">
              <Statistic 
                title={<span className="text-earth-400 uppercase tracking-widest text-[10px] font-black">Volume Revenus (Plateforme)</span>}
                value={stats.total_incomes}
                precision={2}
                prefix={<SafetyCertificateOutlined className="text-sage-600 mr-2" />}
                valueStyle={{ color: '#8A9A5B', fontWeight: 900 }}
                suffix="$"
              />
            </Card>
          </Col>
        </Row>

        <Card className="premium-shadow border-none rounded-3xl overflow-hidden shadow-xl" title={<span className="font-extrabold text-earth-800 uppercase tracking-widest text-xs">Gestion des Comptes</span>}>
          <Table 
            dataSource={users} 
            columns={columns} 
            rowKey="id"
            className="rounded-xl overflow-hidden"
            pagination={{ pageSize: 8 }}
          />
        </Card>
      </div>
    </AppLayout>
  );
}
