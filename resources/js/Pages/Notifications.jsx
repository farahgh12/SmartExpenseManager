import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../Components/Layout';
import { List, Card, Button, Badge, Space, Tag, Empty, notification as antdNotification } from 'antd';
import { 
  BellOutlined, 
  CheckCircleOutlined, 
  ExclamationCircleOutlined, 
  InfoCircleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Notifications({ notifications, unreadCount }) {
  const handleMarkAllRead = () => {
    router.post('/notifications/read-all', {}, {
      onSuccess: () => antdNotification.success({ message: 'Toutes les notifications sont lues' })
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning': return <ExclamationCircleOutlined className="text-amber-500 text-xl" />;
      case 'success': return <CheckCircleOutlined className="text-emerald-500 text-xl" />;
      default: return <InfoCircleOutlined className="text-blue-500 text-xl" />;
    }
  };

  return (
    <AppLayout title="Notifications">
      <Head title="Notifications" />

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-earth-900 m-0">Centre de Notifications</h2>
                <span className="text-earth-400">Vous avez {unreadCount} nouvelles alertes</span>
            </div>
            <Button 
                type="primary" 
                icon={<EyeOutlined />} 
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
                className="bg-sage-600 border-none rounded-lg"
            >
                Tout marquer comme lu
            </Button>
        </div>

        <Card className="premium-shadow border-none rounded-2xl overflow-hidden p-0" bodyStyle={{ padding: 0 }}>
            {notifications.length === 0 ? (
                <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description="Aucune notification pour le moment." 
                    className="p-20"
                />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item 
                            className={`p-6 transition-colors border-b border-earth-50 last:border-0 ${!item.read_at ? 'bg-sage-50/20' : 'bg-white'}`}
                        >
                            <List.Item.Meta
                                avatar={
                                    <div className={`p-3 rounded-xl ${!item.read_at ? 'bg-white shadow-sm' : 'bg-earth-50'}`}>
                                        {getIcon(item.data.type)}
                                    </div>
                                }
                                title={
                                    <div className="flex justify-between items-center">
                                        <span className={`text-base ${!item.read_at ? 'font-bold text-earth-900' : 'text-earth-600'}`}>
                                            {!item.read_at && <Badge status="processing" color="#8A9A5B" className="mr-2" />}
                                            {item.data.message}
                                        </span>
                                        <span className="text-xs text-earth-400 font-medium">{dayjs(item.created_at).fromNow()}</span>
                                    </div>
                                }
                                description={
                                    <div className="mt-1">
                                        <p className="text-earth-500 mb-2">{item.data.details}</p>
                                        <Tag color="default" className="text-[10px] font-bold uppercase rounded border-earth-100">
                                            {dayjs(item.created_at).format('DD MMM YYYY [à] HH:mm')}
                                        </Tag>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </Card>
      </div>
    </AppLayout>
  );
}
