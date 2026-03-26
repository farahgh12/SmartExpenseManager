import React, { useState } from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { 
  DashboardOutlined, 
  WalletOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  DollarOutlined,
  TagsOutlined,
  PieChartOutlined,
  HistoryOutlined,
  BellOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link, usePage } from '@inertiajs/react';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function AppLayout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false);
  const { url } = usePage();

  return (
    <Layout className="min-h-screen bg-earth-50">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="premium-shadow z-10 border-r border-earth-100">
        <div className="h-16 flex items-center gap-3 px-4 border-b border-earth-100 bg-earth-100/50">
          <div className="w-8 h-8 bg-sage-600 rounded flex items-center justify-center shadow-md shrink-0">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-earth-900 truncate tracking-tight">
              SmartExpense
            </span>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[url]}
          className="border-r-0 mt-4 bg-transparent"
          items={[
            {
              key: '/',
              icon: <HomeOutlined className="text-earth-800" />,
              label: <Link href="/" className="font-medium text-earth-800">Accueil</Link>,
            },
            {
              key: '/dashboard',
              icon: <DashboardOutlined className="text-earth-800" />,
              label: <Link href="/dashboard" className="font-medium text-earth-800">Dashboard</Link>,
            },
            {
              key: '/expenses',
              icon: <WalletOutlined className="text-earth-800" />,
              label: <Link href="/expenses" className="font-medium text-earth-800">Dépenses</Link>,
            },
            {
              key: '/incomes',
              icon: <DollarOutlined className="text-earth-800" />,
              label: <Link href="/incomes" className="font-medium text-earth-800">Revenus</Link>,
            },
            {
              key: '/categories',
              icon: <TagsOutlined className="text-earth-800" />,
              label: <Link href="/categories" className="font-medium text-earth-800">Catégories</Link>,
            },
            {
              key: '/budgets',
              icon: <PieChartOutlined className="text-earth-800" />,
              label: <Link href="/budgets" className="font-medium text-earth-800">Budgets</Link>,
            },
            {
              key: '/history',
              icon: <HistoryOutlined className="text-earth-800" />,
              label: <Link href="/history" className="font-medium text-earth-800">Historique</Link>,
            },
            {
              key: '/notifications',
              icon: <BellOutlined className="text-earth-800" />,
              label: <Link href="/notifications" className="font-medium text-earth-800">Notifications</Link>,
            },
            {
              key: '/settings',
              icon: <SettingOutlined className="text-earth-800" />,
              label: <Link href="/settings" className="font-medium text-earth-800">Paramètres</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="bg-transparent">
        <Header className="bg-white/80 backdrop-blur-md p-0 px-6 premium-shadow flex justify-between items-center z-0 border-b border-earth-100">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg w-10 h-10 mr-4 text-earth-800 hover:bg-earth-100/50"
            />
            <Title level={4} className="m-0 pt-2 text-earth-900">{title}</Title>
          </div>
          <div className="flex items-center">
            <Button type="text" icon={<LogoutOutlined />} className="text-gray-500 hover:text-red-500">
              Logout
            </Button>
          </div>
        </Header>
        <Content className="m-6 p-6 premium-card min-h-[280px]">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
