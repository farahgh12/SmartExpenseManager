import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, message } from 'antd';
import { router } from '@inertiajs/react';

const SmartExpenseForm = ({ categories }) => {
  const [form] = Form.useForm();
  
  // Fonction "Smart" bach t-qleb 3la l-category bohdha
  const handleDescriptionChange = (e) => {
    const text = e.target.value.toLowerCase();
    
    // Logique simple dyal l-IA (Classification)
    if (text.includes('marjane') || text.includes('bim') || text.includes('food')) {
      form.setFieldsValue({ category_id: 1 }); // 1 = Alimentation
    } else if (text.includes('uber') || text.includes('gasoil') || text.includes('tram')) {
      form.setFieldsValue({ category_id: 2 }); // 2 = Transport
    }
  };

  const onFinish = (values) => {
    router.post('/expenses', values, {
      onSuccess: () => {
        message.success('Dépense ajoutée avec succès !');
        form.resetFields();
      },
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="description" label="Description (Tapez 'Marjane' pour tester l'IA)" rules={[{ required: true }]}>
            <Input onChange={handleDescriptionChange} placeholder="Ex: Courses Marjane" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="amount" label="Montant (DH)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="category_id" label="Catégorie" rules={[{ required: true }]}>
            <Select placeholder="Sélectionner">
              {categories.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit" block>Ajouter</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SmartExpenseForm;