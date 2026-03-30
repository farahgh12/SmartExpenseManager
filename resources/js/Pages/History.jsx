import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { Table, Tag, Input, Select, Card, Row, Col, Statistic, Space, Empty, Button, message } from 'antd';
import { 
    SearchOutlined, 
    FilterOutlined, 
    ArrowUpOutlined, 
    ArrowDownOutlined, 
    HistoryOutlined,
    FileExcelOutlined,
    PrinterOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

export default function History({ transactions, categories }) {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredData = transactions.filter(item => {
    const matchesSearch = (item.description?.toLowerCase().includes(searchText.toLowerCase())) || 
                         (item.category?.name?.toLowerCase().includes(searchText.toLowerCase()));
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesCategory = filterCategory === 'all' || item.category_id === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const totalIn = filteredData.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalOut = filteredData.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => dayjs(date).format('DD MMM YYYY'),
      width: 150,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'income' ? 'success' : 'error'} className="rounded-full px-3 font-bold uppercase text-[10px]">
          {type === 'income' ? 'Revenu' : 'Dépense'}
        </Tag>
      ),
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span className="font-medium text-earth-800">{text}</span>,
    },
    {
      title: 'Catégorie',
      dataIndex: ['category', 'name'],
      key: 'category',
      render: (name, record) => (
        <Space>
           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: record.category?.color || '#ccc' }} />
           <span className="text-earth-600">{name || 'Non classé'}</span>
        </Space>
      ),
    },
    {
      title: 'Montant',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount, record) => (
        <span className={`font-bold text-lg ${record.type === 'income' ? 'text-sage-600' : 'text-clay-600'}`}>
          {record.type === 'income' ? '+' : '-'}${Number(amount).toLocaleString()}
        </span>
      ),
      width: 150,
    },
  ];

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Description', 'Catégorie', 'Montant'];
    const rows = filteredData.map(t => [
      dayjs(t.date).format('YYYY-MM-DD'),
      t.type === 'income' ? 'Revenu' : 'Dépense',
      t.description,
      t.category?.name || 'Non classé',
      t.amount
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `transactions_${dayjs().format('YYYY-MM-DD')}.csv`);
    document.body.appendChild(link);
    link.click();
    message.success('Export CSV réussi !');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AppLayout title="Historique des Transactions">
      <Head title="Historique" />

      <div className="flex flex-col gap-6 print:m-0">
        <div className="flex justify-between items-center no-print">
            <h2 className="text-2xl font-bold text-earth-900 m-0">Historique Complet</h2>
            <Space>
                <Button 
                    icon={<FileExcelOutlined />} 
                    onClick={exportToCSV}
                    className="border-sage-500 text-sage-600 hover:text-sage-700"
                >
                    Exporter CSV
                </Button>
                <Button 
                    type="primary" 
                    icon={<PrinterOutlined />} 
                    onClick={handlePrint}
                    className="bg-earth-800 border-none"
                >
                    Imprimer PDF
                </Button>
            </Space>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card className="premium-shadow border-none bg-sage-50/30">
               <Statistic 
                title={<span className="text-earth-500 uppercase tracking-widest text-[10px] font-black">Total Entrées</span>}
                value={totalIn}
                prefix={<ArrowUpOutlined />}
                precision={2}
                valueStyle={{ color: '#8A9A5B', fontWeight: 900 }}
               />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card className="premium-shadow border-none bg-clay-50/30">
               <Statistic 
                title={<span className="text-earth-500 uppercase tracking-widest text-[10px] font-black">Total Sorties</span>}
                value={totalOut}
                prefix={<ArrowDownOutlined />}
                precision={2}
                valueStyle={{ color: '#E2725B', fontWeight: 900 }}
               />
            </Card>
          </Col>
        </Row>

        <Card className="premium-shadow border-none">
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <div className="relative">
                <Input 
                   placeholder="Rechercher une transaction..." 
                   prefix={<SearchOutlined className="text-earth-300" />}
                   className="max-w-xs rounded-lg border-earth-100"
                   size="large"
                   onChange={e => setSearchText(e.target.value)}
                />
            </div>
            <Select 
              defaultValue="all" 
              size="large"
              className="w-40"
              onChange={value => setFilterType(value)}
            >
              <Select.Option value="all">Tous les types</Select.Option>
              <Select.Option value="income">Revenus</Select.Option>
              <Select.Option value="expense">Dépenses</Select.Option>
            </Select>
            <Select 
              defaultValue="all" 
              size="large"
              className="w-48"
              onChange={value => setFilterCategory(value)}
              placeholder="Filtrer par catégorie"
            >
              <Select.Option value="all">Toutes les catégories</Select.Option>
              {categories.map(c => (
                <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
              ))}
            </Select>
          </div>

          <Table 
            dataSource={filteredData} 
            columns={columns} 
            rowKey={(record) => `${record.type}-${record.id}`}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            locale={{ emptyText: <Empty description="Aucune transaction trouvée" /> }}
            className="rounded-xl overflow-hidden"
          />
        </Card>
      </div>
    </AppLayout>
  );
}
