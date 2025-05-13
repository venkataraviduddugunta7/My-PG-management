import React from "react";
import { Table } from "antd";
import "./AntTable.scss";

const PgTable = ({
  columns = [],
  dataSource = [],
  bordered = false,
  pagination = false,
  loading = false,
  rowKey = "key",
  className = "",
  style = {},
  wrapperClass = "",
  scroll = null,
  locale = { emptyText: "No Data" },
}) => {
  return (
    <div
      className={`custom-ant-table ${className}`}
      style={{ overflowX: "auto" }}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered={bordered}
        pagination={pagination}
        loading={loading}
        rowKey={rowKey}
        className={`custom-ant-table ${className}`}
        style={style}
        scroll={scroll}
        locale={locale}
      />
    </div>
  );
};

export default PgTable;
