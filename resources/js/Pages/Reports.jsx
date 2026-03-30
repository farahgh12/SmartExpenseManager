import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { Card, Row, Col, Statistic, Progress, List, Typography, Space, Alert } from 'antd';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { 
  RiseOutlined, 
  FallOutlined, 
  ThunderboltOutlined, 
  SafetyOutlined,
  BulbOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Reports({ stats, categoryStats }) {
  const chartData = [
    { name: 'Mois Dernier', amount: stats.last_expenses },
    { name: 'Ce Mois', amount: stats.current_expenses },
  ];

  const COLORS = categoryStats.map(c => c.color);

  return (
    <AppLayout title="Rapport Mensuel">
      <Head title="Analyses Financiaires" />

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold text-earth-900 m-0 tracking-tight">Rapport d'Analyse Financière</h2>
          <p className="text-earth-500">Comparez vos performances et découvrez vos habitudes de consommation.</p>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Card className="premium-shadow border-none rounded-2xl h-full">
              <Title level={4} className="text-earth-800 mb-8">Comparaison Mensuelle des Dépenses</Title>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: '#F9FAFB' }}
                    />
                    <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={60}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#D1D5DB' : '#8A9A5B'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <div className="flex flex-col gap-4 h-full">
              <Card className="premium-shadow border-none bg-sage-50 text-sage-800 flex-1 flex flex-col justify-center">
                <Statistic 
                  title={<span className="text-sage-700 font-bold">Variation des Dépenses</span>}
                  value={Math.abs(stats.growth)}
                  precision={1}
                  prefix={stats.growth > 0 ? <RiseOutlined /> : <FallOutlined />}
                  suffix="%"
                  valueStyle={{ color: stats.growth > 0 ? '#E2725B' : '#8A9A5B', fontWeight: 900 }}
                />
                <Text className="text-sage-600/60 text-xs mt-2">
                  {stats.growth > 0 ? "Vos dépenses ont augmenté" : "Félicitations ! Vous dépensez moins."}
                </Text>
              </Card>
              <Card className="premium-shadow border-none bg-earth-900 text-white flex-1 flex flex-col justify-center">
                <Statistic 
                    title={<span className="text-earth-400 font-medium">Taux d'Épargne</span>}
                    value={stats.current_incomes > 0 ? ((stats.current_incomes - stats.current_expenses) / stats.current_incomes) * 100 : 0}
                    precision={1}
                    suffix="%"
                    valueStyle={{ color: '#fff', fontWeight: 900 }}
                />
                <Progress 
                    percent={Math.max(0, (stats.current_incomes > 0 ? ((stats.current_incomes - stats.current_expenses) / stats.current_incomes) * 100 : 0))} 
                    showInfo={false} 
                    strokeColor="#8A9A5B" 
                    className="mt-4"
                />
              </Card>
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card className="premium-shadow border-none rounded-2xl scroll-m-2" title={<span className="font-bold text-earth-800">Répartition par Catégorie</span>}>
              <List
                dataSource={categoryStats}
                renderItem={(item) => (
                  <List.Item className="px-0 py-4 border-earth-50">
                    <div className="flex justify-between items-center w-full">
                      <Space>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium text-earth-700">{item.name}</span>
                      </Space>
                      <span className="font-black text-earth-900">${item.amount.toLocaleString()}</span>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card className="premium-shadow border-none rounded-2xl bg-earth-50" title={<span><BulbOutlined className="text-amber-500 mr-2" /> <span className="font-bold text-earth-800">Conseils du Coach</span></span>}>
              <div className="space-y-6">
                {stats.growth > 10 && (
                   <Alert
                    message="Attention aux Dépenses"
                    description="Vos dépenses ont augmenté de plus de 10%. Vérifiez vos catégories 'Plaisir' et 'Shopping'."
                    type="warning"
                    showIcon
                    className="rounded-xl border-amber-100 bg-amber-50/50"
                  />
                )}
                <div className="p-4 bg-white rounded-xl shadow-sm border border-earth-100">
                    <h4 className="text-earth-900 font-bold mb-2">Objectif de le semaine</h4>
                    <p className="text-earth-500 text-sm italic">"Réduisez vos frais de 'Restaurants' de 20% pour atteindre votre objectif d'épargne."</p>
                </div>
                <div className="p-4 bg-sage-50 rounded-xl border border-sage-100">
                    <h4 className="text-sage-700 font-bold mb-2">Santé Financière</h4>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-full"><SafetyOutlined className="text-sage-600 text-xl" /></div>
                        <span className="text-sage-700 font-medium">Votre score est de 85/100. Excellent travail !</span>
                    </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
}
