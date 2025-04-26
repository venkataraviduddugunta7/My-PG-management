import { Card, List, Tag } from 'antd';

const RecentActivity = () => {
  const activities = [
    { id: 1, action: 'Payment', description: 'Rent collected from Tenant T1042', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'New Tenant', description: 'T1045 registered', time: '1 day ago', status: 'info' },
    { id: 3, action: 'Maintenance', description: 'AC repair requested in Room 12', time: '2 days ago', status: 'warning' },
    { id: 4, action: 'Notice', description: 'Monthly maintenance notice posted', time: '3 days ago', status: 'default' },
  ];

  const statusColors = {
    success: 'green',
    info: 'blue',
    warning: 'orange',
    default: 'gray',
  };

  return (
    <Card title="Recent Activity" style={{ borderRadius: 8 }}>
      <List
        itemLayout="horizontal"
        dataSource={activities}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.action}</span>
                  <Tag color={statusColors[item.status]}>{item.time}</Tag>
                </div>
              }
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecentActivity;