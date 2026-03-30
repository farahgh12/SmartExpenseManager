import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { 
  Card, 
  Button, 
  Modal, 
  Form, 
  Select, 
  InputNumber, 
  Progress, 
  Space, 
  Row, 
  Col, 
  Statistic, 
  notification,
  Empty
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  DashboardOutlined, 
  AimOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import { 
  HomeOutlined, 
  WalletOutlined, 
  ShoppingCartOutlined, 
  CarOutlined, 
  RestOutlined, 
  MedicineBoxOutlined, 
  GiftOutlined,
  HeartOutlined,
  CoffeeOutlined,
  SmileOutlined
} from '@ant-design/icons';

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
    SmileOutlined: <SmileOutlined />,
  };
  return icons[name] || <SmileOutlined />;
};

export default function Budgets({ budgets, categories, spending, currentMonth }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSaveBudget = (values) => {
    router.post('/budgets', values, {
      onSuccess: () => {
        setIsModalOpen(false);
        form.resetFields();
        notification.success({ message: 'Budget enregistré !' });
      }
    });
  };

  const handleDeleteBudget = (id) => {
    Modal.confirm({
      title: 'Supprimer ce budget ?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Oui, supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk: () => {
        router.delete(`/budgets/${id}`, {
          onSuccess: () => notification.success({ message: 'Budget supprimé' })
        });
      }
    });
  };

  const totalBudget = budgets.reduce((acc, b) => acc + Number(b.amount), 0);
  const totalSpent = Object.values(spending).reduce((acc, s) => acc + Number(s), 0);
  const overallPercentage = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0;

  return (
    <AppLayout title="Gestion du Budget">
      <Head title="Budgets" />
      
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-earth-900 m-0">Votre Budget</h2>
            <span className="text-earth-500 font-medium">{currentMonth}</span>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            size="large"
            onClick={() => setIsModalOpen(true)}
            className="bg-sage-600 hover:bg-sage-500 border-none shadow-md"
          >
            Définir un Budget
          </Button>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card className="premium-shadow border-none bg-sage-50/50">
              <Statistic 
                title={<span className="text-earth-500 uppercase tracking-wider text-xs font-bold">Budget Total</span>}
                value={totalBudget}
                prefix="$"
                valueStyle={{ color: '#58663a', fontWeight: 900 }}
              />
              <div className="mt-4">
                <div className="flex justify-between text-[10px] font-bold text-earth-400 uppercase mb-1">
                  <span>Utilisation Globale</span>
                  <span>{overallPercentage}%</span>
                </div>
                <Progress percent={overallPercentage} showInfo={false} strokeColor="#8A9A5B" trailColor="#e5e7eb" />
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="premium-shadow border-none">
              <Statistic 
                title={<span className="text-earth-500 uppercase tracking-wider text-xs font-bold">Total Dépensé</span>}
                value={totalSpent}
                prefix="$"
                valueStyle={{ color: '#c15b47', fontWeight: 900 }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="premium-shadow border-none">
              <Statistic 
                title={<span className="text-earth-500 uppercase tracking-wider text-xs font-bold">Restant Principal</span>}
                value={Math.max(0, totalBudget - totalSpent)}
                prefix="$"
                valueStyle={{ color: '#5b8a9a', fontWeight: 900 }}
              />
            </Card>
          </Col>
        </Row>

        <h3 className="text-lg font-bold text-earth-800 mt-4 mb-2 flex items-center gap-2">
          <AimOutlined /> Par Catégorie
        </h3>

        {budgets.length === 0 ? (
          <Empty 
            description={<span className="text-earth-400">Aucun budget défini pour ce mois.</span>}
            className="bg-white/50 p-12 rounded-2xl border border-dashed border-earth-100"
          >
            <Button type="primary" onClick={() => setIsModalOpen(true)} className="bg-sage-600 border-none">
              Commencer maintenant
            </Button>
          </Empty>
        ) : (
          <Row gutter={[16, 16]}>
            {budgets.map(budget => {
              const spent = Number(spending[budget.category_id] || 0);
              const percent = Math.min(100, Math.round((spent / budget.amount) * 100));
              const isOver = spent > budget.amount;

              return (
                <Col xs={24} sm={12} lg={8} key={budget.id}>
                  <Card className="premium-shadow hover:translate-y-[-4px] transition-all duration-300 border-earth-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                          style={{ backgroundColor: `${budget.category.color}15`, color: budget.category.color }}
                        >
                          <IconRenderer name={budget.category.icon} />
                        </div>
                        <div>
                          <div className="font-bold text-earth-900 leading-none mb-1">{budget.category.name}</div>
                          <div className="text-[11px] text-earth-400 font-medium">Budget: ${Number(budget.amount).toLocaleString()}</div>
                        </div>
                      </div>
                      <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDeleteBudget(budget.id)} 
                        className="hover:bg-red-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className={isOver ? 'text-red-500' : 'text-earth-700'}>
                          ${spent.toLocaleString()} dépensés
                        </span>
                        <span className="text-earth-400">{percent}%</span>
                      </div>
                      <Progress 
                        percent={percent} 
                        showInfo={false} 
                        strokeColor={isOver ? '#c15b47' : budget.category.color} 
                        status={isOver ? 'exception' : 'active'}
                      />
                      <div className="text-[10px] text-earth-400 font-medium flex justify-between mt-1">
                        <span>{isOver ? 'Budget dépassé !' : 'Restant:'}</span>
                        <span className={isOver ? 'text-red-500 font-bold' : ''}>
                          ${Math.max(0, budget.amount - spent).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </div>

      <Modal
        title={<span className="text-lg font-bold text-earth-900">Définir un Budget Mensuel</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveBudget} className="mt-4">
          <Form.Item 
            name="category_id" 
            label="Catégorie" 
            rules={[{ required: true, message: 'Veuillez choisir une catégorie !' }]}
          >
            <Select size="large" placeholder="Choisir une catégorie">
              {categories.map(c => (
                <Select.Option key={c.id} value={c.id}>
                  <Space>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </Space>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item 
            name="amount" 
            label="Limite Mensuelle ($)" 
            rules={[{ required: true, message: 'Veuillez entrer le montant !' }]}
          >
            <InputNumber 
              size="large" 
              className="w-full" 
              prefix="$" 
              min={0} 
              placeholder="0.00"
            />
          </Form.Item>
          
          <div className="bg-earth-50 p-4 rounded-xl border border-earth-100 mb-6 italic text-earth-500 text-xs text-center">
            Note: Le budget sera appliqué au mois en cours ({currentMonth}).
          </div>

          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full bg-sage-600 hover:bg-sage-700 h-12 text-base font-bold shadow-md border-none"
          >
            Enregistrer le Budget
          </Button>
        </Form>
      </Modal>
    </AppLayout>
  );
}
