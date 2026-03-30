import React, { useState } from 'react';
import { Layout, Menu, Typography, Button, Input, Tooltip, Badge } from 'antd';
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
  BarChartOutlined,
  HistoryOutlined,
  BellOutlined,
  SettingOutlined,
  SearchOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { Link, usePage, router } from '@inertiajs/react';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function AppLayout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false);
  const { url, props } = usePage();
  const { auth } = props;

  return (
    <Layout className="min-h-screen bg-earth-50">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="premium-shadow z-10 border-r border-earth-100 flex flex-col h-screen sticky top-0">
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
          className="border-r-0 mt-4 bg-transparent flex-grow overflow-y-auto overflow-x-hidden"
          items={[
            {
              key: '/',
              icon: <HomeOutlined className="text-earth-800" />,
              label: <Link href="/" className="font-medium text-earth-800">Accueil</Link>,
            },
            {
              key: '/dashboard',
              icon: <DashboardOutlined className="text-earth-800" />,
              label: <Link href="/dashboard" className="font-medium text-earth-800">Tableau de Bord</Link>,
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
              key: '/reports',
              icon: <BarChartOutlined className="text-earth-800" />,
              label: <Link href="/reports" className="font-medium text-earth-800">Rapports</Link>,
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
            // Admin only section
            auth.user?.role?.toLowerCase() === 'admin' ? {
              key: '/admin/dashboard',
              icon: <SafetyCertificateOutlined className="text-amber-600" />,
              label: <Link href="/admin/dashboard" className="font-bold text-amber-700">Administration</Link>,
            } : null,
          ].filter(Boolean)}
        />

        <div className="mt-auto px-4 pb-6 space-y-4 border-t border-earth-100 pt-6">
          {!collapsed && (
            <div className="bg-sage-100/50 p-4 rounded-xl border border-earth-100 shadow-inner">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-earth-500 font-bold uppercase tracking-widest">Solde Actuel</span>
                <PieChartOutlined className="text-sage-600" />
              </div>
              <div className="text-xl font-black text-sage-700 tracking-tight">$4,250.00</div>
              <div className="text-[10px] text-earth-400 font-medium">Mis à jour il y a 5 min</div>
            </div>
          )}

          <div className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${collapsed ? 'justify-center' : 'bg-earth-100/30'}`}>
            <div className="relative group">
              <div className="w-10 h-10 bg-sage-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white cursor-pointer hover:scale-110 transition-transform">
                F
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white ring-1 ring-green-100 animate-pulse" />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-earth-900 truncate tracking-tight">Farah GH</span>
                <span className="text-[11px] text-earth-500 truncate lowercase">@farahgh</span>
              </div>
            )}
          </div>
        </div>
      </Sider>
      <Layout className="bg-transparent">
        <Header style={{ backgroundColor: '#8a9a5b', borderBottom: '1px solid #708249' }} className="p-0 px-6 shadow-md flex justify-between items-center z-20">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg w-10 h-10 text-white hover:bg-white/10"
            />
            <Title level={4} className="m-0 pt-2 text-white font-bold">{title}</Title>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Tooltip title="Votre session est active et sécurisée">
              <div className="hidden sm:flex items-center bg-white/10 px-3 py-1 rounded-full border border-white/20 cursor-help">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span className="text-xs text-white uppercase tracking-wider font-semibold">Connecté</span>
              </div>
            </Tooltip>

            <div className="flex items-center gap-2">
              <Link href="/notifications">
                <Badge count={auth.user?.unreadNotificationsCount} size="small" offset={[-2, 2]}>
                  <Button 
                    type="text" 
                    icon={<BellOutlined />} 
                    className="text-white hover:bg-white/10 w-10 h-10 flex items-center justify-center text-lg rounded-full"
                  />
                </Badge>
              </Link>

              <div className="hidden lg:block">
                <Input.Search 
                  placeholder="Chercher..." 
                  variant="borderless"
                  onSearch={value => console.log('Searching for:', value)}
                  className="header-search bg-white/10 hover:bg-white/20 focus-within:bg-white/20 text-white rounded-full px-1 w-48 xl:w-64 transition-all"
                  style={{ color: 'white' }}
                />
              </div>
            </div>
            
            <Button 
              type="text" 
              icon={<LogoutOutlined />} 
              onClick={() => router.post('/logout')}
              className="text-white/90 hover:text-white hover:bg-red-500/20 transition-all flex items-center gap-2 font-medium"
            >
              <span className="hidden sm:inline">Déconnexion</span>
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
