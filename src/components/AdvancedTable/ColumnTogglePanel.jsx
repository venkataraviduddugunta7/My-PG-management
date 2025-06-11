import React from 'react';
import { 
  Checkbox, 
  Space, 
  Button, 
  Divider,
  Typography 
} from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const ColumnTogglePanel = ({
  columns = [],
  columnVisibility = {},
  onColumnVisibilityChange,
}) => {
  const visibleColumns = columns.filter(col => 
    col.id !== 'select' && col.enableHiding !== false
  );

  const handleToggleColumn = (columnId) => {
    const newVisibility = {
      ...columnVisibility,
      [columnId]: !columnVisibility[columnId],
    };
    onColumnVisibilityChange(newVisibility);
  };

  const handleShowAll = () => {
    const newVisibility = {};
    visibleColumns.forEach(col => {
      newVisibility[col.id] = true;
    });
    onColumnVisibilityChange(newVisibility);
  };

  const handleHideAll = () => {
    const newVisibility = {};
    visibleColumns.forEach(col => {
      newVisibility[col.id] = false;
    });
    onColumnVisibilityChange(newVisibility);
  };

  const handleReset = () => {
    onColumnVisibilityChange({});
  };

  const visibleCount = visibleColumns.filter(col => 
    columnVisibility[col.id] !== false
  ).length;

  return (
    <div className="column-toggle-panel">
      <div className="panel-header">
        <Text strong>Column Visibility</Text>
        <Text type="secondary">
          {visibleCount} of {visibleColumns.length} visible
        </Text>
      </div>

      <div className="panel-actions">
        <Space size="small">
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={handleShowAll}
          >
            Show All
          </Button>
          <Button
            size="small"
            icon={<EyeInvisibleOutlined />}
            onClick={handleHideAll}
          >
            Hide All
          </Button>
          <Button
            size="small"
            icon={<ReloadOutlined />}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Space>
      </div>

      <Divider style={{ margin: '8px 0' }} />

      <div className="column-list">
        {visibleColumns.map((column) => {
          const columnId = column.id || column.accessorKey;
          const isVisible = columnVisibility[columnId] !== false;
          const headerText = typeof column.header === 'string' 
            ? column.header 
            : columnId;

          return (
            <div key={columnId} className="column-item">
              <Checkbox
                checked={isVisible}
                onChange={() => handleToggleColumn(columnId)}
              >
                <span className="column-name">
                  {headerText}
                </span>
              </Checkbox>
            </div>
          );
        })}
      </div>

      {visibleColumns.length === 0 && (
        <div className="empty-columns">
          <Text type="secondary">No columns available</Text>
        </div>
      )}
    </div>
  );
};

export default ColumnTogglePanel; 