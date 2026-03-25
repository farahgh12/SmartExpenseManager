import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { Card, Col, Row, Statistic, Table, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DollarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function Dashboard({ totalExpenses, totalIncomes, recentTransactions }) {
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
    </AppLayout>
  );
}