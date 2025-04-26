import { Pie } from '@ant-design/charts';

const OccupancyChart = () => {
  const data = [
    { type: 'Occupied', value: 42 },
    { type: 'Vacant', value: 8 },
  ];

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      content: '{percentage}',
    },
    colors: ['#1890ff', '#f5222d'],
    legend: {
      position: 'bottom',
    },
    statistic: {
      title: {
        content: 'Rooms',
      },
    },
  };

  return (
    <div className="chart-container" style={{ background: '#fff', padding: 16, borderRadius: 8 }}>
      <h3 style={{ marginBottom: 16 }}>Room Occupancy</h3>
      <Pie {...config} />
    </div>
  );
};

export default OccupancyChart;