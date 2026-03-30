import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { Card, Form, Input, Button, Row, Col, Typography, Divider, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, SaveOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Settings({ user }) {
  const profileForm = useForm({
    name: user.name,
    email: user.email,
  });

  const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleProfileSubmit = () => {
    profileForm.post('/settings/profile', {
      preserveScroll: true,
      onSuccess: () => message.success('Profil mis à jour avec succès !'),
    });
  };

  const handlePasswordSubmit = () => {
    passwordForm.post('/settings/password', {
      preserveScroll: true,
      onSuccess: () => {
        message.success('Mot de passe changé avec succès !');
        passwordForm.reset();
      },
    });
  };

  return (
    <AppLayout title="Paramètres du compte">
      <Head title="Paramètres" />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 pl-1">
            <h2 className="text-2xl font-bold text-earth-900 m-0 tracking-tight">Paramètres du Compte</h2>
            <p className="text-earth-500">Gérez vos informations personnelles et la sécurité de votre compte.</p>
        </div>

        <Tabs 
            defaultActiveKey="1" 
            className="premium-tabs"
            items={[
                {
                    key: '1',
                    label: <span className="flex items-center gap-2 px-2 py-1"><UserOutlined /> Profil</span>,
                    children: (
                        <Card className="premium-shadow border-none rounded-2xl p-4 md:p-8">
                            <Title level={4} className="text-earth-800 mb-8 font-black uppercase tracking-widest text-xs">Informations Personnelles</Title>
                            <Form layout="vertical" onFinish={handleProfileSubmit}>
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <Form.Item label={<span className="font-bold text-earth-600">Nom Complet</span>} required>
                                            <Input 
                                                size="large" 
                                                prefix={<UserOutlined className="text-earth-300" />} 
                                                value={profileForm.data.name}
                                                onChange={e => profileForm.setData('name', e.target.value)}
                                                className="rounded-xl h-14 border-earth-100 bg-earth-50/30"
                                            />
                                            {profileForm.errors.name && <Text type="danger" className="text-xs mt-1 block">{profileForm.errors.name}</Text>}
                                        </Form.Item>
                                    </Col>
                                    <Col span={24} className="mt-4">
                                        <Form.Item label={<span className="font-bold text-earth-600">Adresse Email</span>} required>
                                            <Input 
                                                size="large" 
                                                prefix={<MailOutlined className="text-earth-300" />} 
                                                value={profileForm.data.email}
                                                onChange={e => profileForm.setData('email', e.target.value)}
                                                className="rounded-xl h-14 border-earth-100 bg-earth-50/30"
                                            />
                                            {profileForm.errors.email && <Text type="danger" className="text-xs mt-1 block">{profileForm.errors.email}</Text>}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div className="mt-10">
                                    <Button 
                                        type="primary" 
                                        htmlType="submit" 
                                        icon={<SaveOutlined />} 
                                        loading={profileForm.processing}
                                        className="bg-sage-600 border-none h-14 px-10 rounded-2xl font-bold shadow-lg shadow-sage-200 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto"
                                    >
                                        Enregistrer les modifications
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    )
                },
                {
                    key: '2',
                    label: <span className="flex items-center gap-2 px-2 py-1"><LockOutlined /> Sécurité</span>,
                    children: (
                        <Card className="premium-shadow border-none rounded-2xl p-4 md:p-8">
                            <Title level={4} className="text-earth-800 mb-8 font-black uppercase tracking-widest text-xs">Sécurité du Compte</Title>
                            <Form layout="vertical" onFinish={handlePasswordSubmit}>
                                <Form.Item label={<span className="font-bold text-earth-600">Mot de passe actuel</span>} required>
                                    <Input.Password 
                                        size="large" 
                                        prefix={<LockOutlined className="text-earth-300" />} 
                                        value={passwordForm.data.current_password}
                                        onChange={e => passwordForm.setData('current_password', e.target.value)}
                                        className="rounded-xl h-14 border-earth-100 bg-earth-50/30"
                                    />
                                    {passwordForm.errors.current_password && <Text type="danger" className="text-xs mt-1 block">{passwordForm.errors.current_password}</Text>}
                                </Form.Item>
                                <Divider className="my-10 border-earth-50" />
                                <Form.Item label={<span className="font-bold text-earth-600">Nouveau mot de passe</span>} required>
                                    <Input.Password 
                                        size="large" 
                                        prefix={<LockOutlined className="text-earth-300" />} 
                                        value={passwordForm.data.password}
                                        onChange={e => passwordForm.setData('password', e.target.value)}
                                        className="rounded-xl h-14 border-earth-100 bg-earth-50/30"
                                    />
                                    {passwordForm.errors.password && <Text type="danger" className="text-xs mt-1 block">{passwordForm.errors.password}</Text>}
                                </Form.Item>
                                <Form.Item label={<span className="font-bold text-earth-600">Confirmer le nouveau mot de passe</span>} required className="mt-6">
                                    <Input.Password 
                                        size="large" 
                                        prefix={<LockOutlined className="text-earth-300" />} 
                                        value={passwordForm.data.password_confirmation}
                                        onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                        className="rounded-xl h-14 border-earth-100 bg-earth-50/30"
                                    />
                                </Form.Item>
                                <div className="mt-10">
                                    <Button 
                                        type="primary" 
                                        htmlType="submit" 
                                        loading={passwordForm.processing}
                                        className="bg-clay-600 border-none h-14 px-10 rounded-2xl font-bold shadow-lg shadow-clay-200 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto"
                                    >
                                        Mettre à jour le mot de passe
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    )
                }
            ]}
        />
      </div>
    </AppLayout>
  );
}
