import { Button, Card, Space } from 'antd';
import { 
  UserAddOutlined, 
  DollarOutlined, 
  NotificationOutlined, 
  ToolOutlined 
} from '@ant-design/icons';

const QuickActions = () => {
  return (
    <Card title="Quick Actions" style={{ borderRadius: 8 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button 
          type="primary" 
          icon={<UserAddOutlined />} 
          block
          style={{ textAlign: 'left' }}
        >
          Add New Tenant
        </Button>
        <Button 
          icon={<DollarOutlined />} 
          block
          style={{ textAlign: 'left' }}
        >
          Collect Payment
        </Button>
        <Button 
          icon={<NotificationOutlined />} 
          block
          style={{ textAlign: 'left' }}
        >
          Create Notice
        </Button>
        <Button 
          icon={<ToolOutlined />} 
          block
          style={{ textAlign: 'left' }}
        >
          Register Complaint
        </Button>
      </Space>
    </Card>
  );
};

export default QuickActions;