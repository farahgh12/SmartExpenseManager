import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { Card, Col, Row, Statistic, Table, Tag, Progress, Button, Modal, Form, InputNumber, Select, message } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DollarOutlined, SettingOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import dayjs from 'dayjs';

const COLORS = ['#8A9A5B', '#E2725B', '#D2B48C', '#58663a', '#c15b47', '#4a4435'];

export default function Dashboard({ totalExpenses, totalIncomes, recentTransactions, expensesByCategory, monthlyTrends, budgets, categories }) {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [form] = Form.useForm();
  
  const handleSetBudget = (values) => {
    router.post('/budgets', values, {
      onSuccess: () => {
        setIsBudgetModalOpen(false);
        form.resetFields();
        message.success('Budget updated successfully!');
      }
    });
  };
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => dayjs(text).format('MMM DD, YYYY'),
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
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="text-clay-600 font-semibold">-${Number(amount).toFixed(2)}</span>
      ),
    },
  ];

  return (
    <AppLayout title="Dashboard">
      <Head title="Dashboard" />

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-earth-900 mb-6">Financial Overview</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card className="premium-card">
              <Statistic
                title={<span className="text-earth-800/60 font-medium">Total Income</span>}
                value={totalIncomes || 0}
                precision={2}
                valueStyle={{ color: '#8A9A5B' }}
                prefix={<ArrowUpOutlined />}
                suffix="$"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="premium-card">
              <Statistic
                title={<span className="text-earth-800/60 font-medium">Total Expenses</span>}
                value={totalExpenses || 0}
                precision={2}
                valueStyle={{ color: '#E2725B' }}
                prefix={<ArrowDownOutlined />}
                suffix="$"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="premium-card bg-sage-50/50">
              <Statistic
                title={<span className="text-sage-700 font-semibold">Balance</span>}
                value={(totalIncomes || 0) - (totalExpenses || 0)}
                precision={2}
                valueStyle={{ color: '#58663a', fontWeight: 'bold' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mb-8">
        <Row gutter={16}>
          <Col span={12}>
            <Card title={<span className="text-earth-900 font-bold">Expenses by Category</span>} className="premium-card">
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={expensesByCategory || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {(expensesByCategory || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={<span className="text-earth-900 font-bold">Monthly Trend</span>} className="premium-card">
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={monthlyTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1ebd7" />
                    <XAxis dataKey="month" stroke="#4a4435" />
                    <YAxis stroke="#4a4435" />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#8A9A5B" strokeWidth={3} dot={{ fill: '#8A9A5B', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-earth-900">Budget Progress</h2>
          <Button 
            icon={<SettingOutlined />} 
            onClick={() => setIsBudgetModalOpen(true)}
            className="border-sage-500 text-sage-600 hover:text-sage-700"
          >
            Manage Budgets
          </Button>
        </div>
        <Row gutter={[16, 16]}>
          {(expensesByCategory || []).filter(c => c.budget > 0).map((cat, idx) => {
            const percent = Math.min(100, Math.round((cat.value / cat.budget) * 100));
            const status = percent > 90 ? 'exception' : 'normal';
            const strokeColor = percent > 90 ? '#E2725B' : '#8A9A5B';
            
            return (
              <Col span={8} key={idx}>
                <Card className="premium-card p-2">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-earth-900">{cat.name}</span>
                    <span className="text-earth-800/60">${cat.value} / ${cat.budget}</span>
                  </div>
                  <Progress 
                    percent={percent} 
                    status={status} 
                    strokeColor={strokeColor}
                    strokeWidth={10}
                    trailColor="#f1ebd7"
                  />
                  {percent >= 100 && (
                    <div className="text-clay-600 text-xs mt-1 font-bold">⚠️ Budget Exceeded!</div>
                  )}
                </Card>
              </Col>
            );
          })}
          {(expensesByCategory || []).filter(c => c.budget > 0).length === 0 && (
            <Col span={24}>
              <div className="p-8 text-center bg-earth-100/30 rounded-xl border border-dashed border-earth-200 text-earth-800/40">
                No budgets set for this month. Click "Manage Budgets" to start tracking.
              </div>
            </Col>
          )}
        </Row>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-earth-900">Recent Transactions</h2>
          <Link href="/expenses" className="text-sage-600 hover:text-sage-700 font-semibold flex items-center gap-1">
            View All <span className="text-lg">→</span>
          </Link>
        </div>
        <Table 
          dataSource={recentTransactions} 
          columns={columns} 
          rowKey="id" 
          pagination={false}
          className="premium-shadow border border-earth-100 rounded-xl overflow-hidden"
        />
      </div>
      <Modal 
        title={<span className="text-earth-900 font-bold">Set Category Budget</span>}
        open={isBudgetModalOpen}
        onCancel={() => setIsBudgetModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSetBudget}>
          <Form.Item name="category_id" label="Category" rules={[{ required: true }]}>
            <Select placeholder="Select category" size="large">
              {(categories || []).map(c => (
                <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Monthly Budget Amount ($)" rules={[{ required: true }]}>
            <InputNumber className="w-full" size="large" min={1} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-sage-600 border-none h-12 text-base font-bold">
            Save Budget
          </Button>
        </Form>
      </Modal>
    </AppLayout>
  );
}