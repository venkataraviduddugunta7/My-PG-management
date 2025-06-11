import React from 'react';
import { Card, Row, Col, Statistic, Progress, Typography, Space } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined
} from '@ant-design/icons';
import './QuickStatsWidget.scss';

const { Text } = Typography;

const QuickStatsWidget = ({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  trend, 
  trendDirection, 
  subtitle, 
  icon, 
  progressValue,
  progressColor = '#1890ff',
  comparison,
  className = '',
  onClick
}) => {
  const getTrendIcon = () => {
    if (trendDirection === 'up') {
      return <ArrowUpOutlined style={{ color: '#52c41a' }} />;
    } else if (trendDirection === 'down') {
      return <ArrowDownOutlined style={{ color: '#ff4d4f' }} />;
    }
    return null;
  };

  const getTrendColor = () => {
    return trendDirection === 'up' ? '#52c41a' : '#ff4d4f';
  };

  return (
    <Card 
      className={`quick-stats-widget ${className}`}
      hoverable
      onClick={onClick}
      bodyStyle={{ padding: '20px' }}
    >
      <Row justify="space-between" align="top">
        <Col flex="auto">
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            {/* Icon and Title */}
            <div className="widget-header">
              {icon && (
                <div className="widget-icon">
                  {icon}
                </div>
              )}
              <Text className="widget-title" type="secondary">
                {title}
              </Text>
            </div>

            {/* Main Value */}
            <div className="widget-value">
              <Statistic
                value={value}
                prefix={prefix}
                suffix={suffix}
                valueStyle={{ 
                  fontSize: '28px', 
                  fontWeight: 'bold',
                  color: '#273156',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
            </div>

            {/* Trend and Subtitle */}
            <div className="widget-meta">
              {trend && (
                <Space size={4} align="center">
                  {getTrendIcon()}
                  <Text 
                    style={{ 
                      color: getTrendColor(), 
                      fontWeight: '600',
                      fontSize: '12px'
                    }}
                  >
                    {trend}
                  </Text>
                  {subtitle && (
                    <Text 
                      type="secondary" 
                      style={{ fontSize: '12px' }}
                    >
                      {subtitle}
                    </Text>
                  )}
                </Space>
              )}
            </div>

            {/* Progress Bar */}
            {progressValue !== undefined && (
              <div className="widget-progress">
                <Progress
                  percent={progressValue}
                  strokeColor={progressColor}
                  showInfo={false}
                  strokeWidth={6}
                />
              </div>
            )}

            {/* Comparison */}
            {comparison && (
              <div className="widget-comparison">
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  {comparison}
                </Text>
              </div>
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default QuickStatsWidget; 