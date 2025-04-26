import { Column } from '@ant-design/charts';

const RevenueExpenseChart = () => {
  const data = [
    { month: 'Jan', revenue: 210000, expenses: 120000 },
    { month: 'Feb', revenue: 220000, expenses: 115000 },
    { month: 'Mar', revenue: 205000, expenses: 125000 },
    { month: 'Apr', revenue: 230000, expenses: 110000 },
    { month: 'May', revenue: 225000, expenses: 130000 },
    { month: 'Jun', revenue: 240000, expenses: 135000 },
  ];

  const config = {
    data,
    xField: 'month',
    yField: ['revenue', 'expenses'],
    isGroup: true,
    seriesField: 'type',
    color: ['#52c41a', '#f5222d'],
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div className="chart-container" style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
      <h3 style={{ marginBottom: 16 }}>Revenue vs Expenses</h3>
      <Column {...config} />
    </div>
  );
};

export default RevenueExpenseChart;