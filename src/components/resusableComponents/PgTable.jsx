import React, { useMemo } from "react";
import { Table } from "antd";
import "./AntTable.scss";

const PgTable = React.memo(({
  columns = [],
  dataSource = [],
  bordered = false,
  pagination = {
    defaultPageSize: 10,
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ['10', '20', '50', '100']
  },
  loading = false,
  rowKey = "key",
  className = "",
  style = {},
  wrapperClass = "",
  scroll = { y: 'calc(100vh - 300px)' },
  locale = { emptyText: "No Data" },
}) => {
  // Memoize columns to prevent unnecessary re-renders
  const memoizedColumns = useMemo(() => columns, [columns]);
  
  // Memoize dataSource to prevent unnecessary re-renders
  const memoizedDataSource = useMemo(() => dataSource, [dataSource]);

  return (
    <div
      className={`custom-ant-table-wrapper ${wrapperClass}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <div
        className={`custom-ant-table ${className}`}
        style={{
          flex: 1,
          overflow: 'hidden',
          ...style
        }}
      >
        <Table
          columns={memoizedColumns}
          dataSource={memoizedDataSource}
          bordered={bordered}
          pagination={pagination}
          loading={loading}
          rowKey={rowKey}
          className={`custom-ant-table ${className}`}
          scroll={scroll}
          locale={locale}
          size="middle"
        />
      </div>
    </div>
  );
});

PgTable.displayName = 'PgTable';

export default PgTable;
