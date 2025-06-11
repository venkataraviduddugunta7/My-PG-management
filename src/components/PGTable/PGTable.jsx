import React, { useState, useMemo } from 'react';
import { 
  Tag, 
  Button, 
  Avatar, 
  Space,
  notification 
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DollarCircleOutlined,
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
} from '@ant-design/icons';
import AdvancedTable from '../AdvancedTable/AdvancedTable';
// import './PGTable.scss';

const PGTable = ({
  data = [],
  loading = false,
  onRefresh,
  onExport,
  onEdit,
  onDelete,
  onView,
  onRowAction, // New prop to handle row actions
  title = "PG Management Table",
  type = "tenants", // tenants, payments, rooms, complaints
  globalFilter = "", // New prop for external filtering
  ...tableProps
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  // Column definitions based on table type
  const columns = useMemo(() => {
    const baseActions = [
      {
        icon: <EyeOutlined />,
        tooltip: 'View Details',
        onClick: (record) => {
          if (onRowAction) {
            onRowAction('view', record);
          } else {
            onView?.(record);
          }
        },
      },
      {
        icon: <EditOutlined />,
        tooltip: 'Edit',
        onClick: (record) => {
          if (onRowAction) {
            onRowAction('edit', record);
          } else {
            onEdit?.(record);
          }
        },
      },
      {
        icon: <DeleteOutlined />,
        tooltip: 'Delete',
        onClick: (record) => {
          if (onRowAction) {
            onRowAction('delete', record);
          } else {
            onDelete?.(record);
          }
        },
        disabled: (record) => record.status === 'active',
      },
    ];

    switch (type) {
      case 'tenants':
        return [
          // Sticky columns - Tenant ID (first after checkbox)
          {
            id: 'tenantId',
            accessorKey: 'id',
            header: 'ID',
            size: 80,
            enableSorting: true,
            sticky: 'left',
            cell: ({ getValue }) => (
              <div className="tenant-id-cell">
                <strong>#{String(getValue()).padStart(3, '0')}</strong>
              </div>
            ),
          },
          // Scrollable columns
          {
            id: 'avatar',
            accessorKey: 'name',
            header: 'Tenant Name',
            cellType: 'avatar',
            size: 220,
            enableSorting: true,
          },
          {
            id: 'room',
            accessorKey: 'room',
            header: 'Room',
            size: 100,
            cell: ({ getValue }) => (
              <div className="room-cell">
                <HomeOutlined style={{ marginRight: 4, color: '#586fcc' }} />
                {getValue()}
              </div>
            ),
          },
          {
            id: 'phone',
            accessorKey: 'phone',
            header: 'Phone',
            size: 150,
            cell: ({ getValue }) => (
              <div className="phone-cell">
                <PhoneOutlined style={{ marginRight: 4, color: '#52c41a' }} />
                {getValue()}
              </div>
            ),
          },
          {
            id: 'email',
            accessorKey: 'email',
            header: 'Email',
            size: 200,
            cell: ({ getValue }) => (
              <div className="email-cell">
                <MailOutlined style={{ marginRight: 4, color: '#1890ff' }} />
                {getValue()}
              </div>
            ),
          },
          {
            id: 'profession',
            accessorKey: 'profession',
            header: 'Profession',
            size: 150,
            enableSorting: true,
          },
          {
            id: 'rent',
            accessorKey: 'rent',
            header: 'Monthly Rent',
            cellType: 'currency',
            size: 130,
            enableSorting: true,
          },
          {
            id: 'deposit',
            accessorKey: 'deposit',
            header: 'Deposit',
            cellType: 'currency',
            size: 120,
            enableSorting: true,
          },
          {
            id: 'joinDate',
            accessorKey: 'joinDate',
            header: 'Join Date',
            cellType: 'date',
            size: 120,
            enableSorting: true,
          },
          {
            id: 'status',
            accessorKey: 'status',
            header: 'Status',
            cellType: 'status',
            size: 100,
            enableSorting: true,
          },
          {
            id: 'paymentStatus',
            accessorKey: 'paymentStatus',
            header: 'Payment',
            size: 110,
            cell: ({ getValue }) => {
              const status = getValue();
              const getColor = () => {
                switch(status?.toLowerCase()) {
                  case 'paid': return 'green';
                  case 'pending': return 'orange';
                  case 'overdue': return 'red';
                  default: return 'default';
                }
              };
              return <Tag color={getColor()}>{status}</Tag>;
            },
          },
          // Sticky actions column (last)
          {
            id: 'actions',
            header: 'Actions',
            cellType: 'actions',
            actions: baseActions,
            size: 120,
            enableSorting: false,
            enableColumnFilter: false,
            sticky: 'right',
          },
        ];

      case 'payments':
        return [
          {
            id: 'tenant',
            accessorKey: 'tenant',
            header: 'Tenant',
            size: 200,
            cell: ({ getValue, row }) => (
              <div className="tenant-info">
                <Avatar size="small" icon={<UserOutlined />} />
                <div style={{ marginLeft: 8 }}>
                  <div>{getValue()}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Room {row.original.room}
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: 'amount',
            accessorKey: 'amount',
            header: 'Amount',
            cellType: 'currency',
            size: 120,
            enableSorting: true,
          },
          {
            id: 'dueDate',
            accessorKey: 'dueDate',
            header: 'Due Date',
            cellType: 'date',
            size: 120,
            enableSorting: true,
          },
          {
            id: 'paidDate',
            accessorKey: 'paidDate',
            header: 'Paid Date',
            cellType: 'date',
            size: 120,
          },
          {
            id: 'status',
            accessorKey: 'status',
            header: 'Status',
            cellType: 'status',
            size: 120,
          },
          {
            id: 'method',
            accessorKey: 'method',
            header: 'Method',
            size: 100,
            cell: ({ getValue }) => {
              const method = getValue();
              return (
                <Tag icon={<DollarCircleOutlined />} color="blue">
                  {method}
                </Tag>
              );
            },
          },
          {
            id: 'actions',
            header: 'Actions',
            cellType: 'actions',
            actions: baseActions,
            size: 120,
            enableSorting: false,
          },
        ];

      case 'rooms':
        return [
          {
            id: 'roomNumber',
            accessorKey: 'roomNumber',
            header: 'Room No',
            size: 100,
            cell: ({ getValue }) => (
              <div className="room-number">
                <HomeOutlined style={{ marginRight: 4 }} />
                {getValue()}
              </div>
            ),
          },
          {
            id: 'type',
            accessorKey: 'type',
            header: 'Type',
            size: 120,
            cellType: 'tags',
          },
          {
            id: 'capacity',
            accessorKey: 'capacity',
            header: 'Capacity',
            size: 100,
            cell: ({ getValue }) => `${getValue()} beds`,
          },
          {
            id: 'occupied',
            accessorKey: 'occupied',
            header: 'Occupied',
            size: 100,
            cell: ({ getValue, row }) => {
              const occupied = getValue();
              const capacity = row.original.capacity;
              const isFullyOccupied = occupied >= capacity;
              
              return (
                <div className="occupancy-info">
                  <Tag color={isFullyOccupied ? 'red' : 'green'}>
                    {occupied}/{capacity}
                  </Tag>
                </div>
              );
            },
          },
          {
            id: 'rent',
            accessorKey: 'rent',
            header: 'Rent/Bed',
            cellType: 'currency',
            size: 120,
          },
          {
            id: 'facilities',
            accessorKey: 'facilities',
            header: 'Facilities',
            cellType: 'tags',
            size: 200,
          },
          {
            id: 'status',
            accessorKey: 'status',
            header: 'Status',
            cellType: 'status',
            size: 120,
          },
          {
            id: 'actions',
            header: 'Actions',
            cellType: 'actions',
            actions: baseActions,
            size: 120,
            enableSorting: false,
          },
        ];

      case 'complaints':
        return [
          {
            id: 'id',
            accessorKey: 'id',
            header: 'ID',
            size: 80,
          },
          {
            id: 'tenant',
            accessorKey: 'tenant',
            header: 'Tenant',
            size: 150,
            cell: ({ getValue, row }) => (
              <div className="tenant-info">
                <div>{getValue()}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Room {row.original.room}
                </div>
              </div>
            ),
          },
          {
            id: 'subject',
            accessorKey: 'subject',
            header: 'Subject',
            size: 200,
            maxWidth: 200,
          },
          {
            id: 'category',
            accessorKey: 'category',
            header: 'Category',
            cellType: 'tags',
            size: 120,
          },
          {
            id: 'priority',
            accessorKey: 'priority',
            header: 'Priority',
            size: 100,
            cell: ({ getValue }) => {
              const priority = getValue();
              const getColor = () => {
                switch(priority) {
                  case 'high': return 'red';
                  case 'medium': return 'orange';
                  case 'low': return 'green';
                  default: return 'default';
                }
              };
              return <Tag color={getColor()}>{priority}</Tag>;
            },
          },
          {
            id: 'status',
            accessorKey: 'status',
            header: 'Status',
            cellType: 'status',
            size: 120,
          },
          {
            id: 'createdDate',
            accessorKey: 'createdDate',
            header: 'Created',
            cellType: 'date',
            size: 120,
          },
          {
            id: 'actions',
            header: 'Actions',
            cellType: 'actions',
            actions: baseActions,
            size: 120,
            enableSorting: false,
          },
        ];

      default:
        return [];
    }
  }, [type, onView, onEdit, onDelete]);

  const handleExport = () => {
    if (onExport) {
      onExport(selectedRows);
    } else {
      // Default export functionality
      const csvContent = generateCSV(data, columns);
      downloadCSV(csvContent, `${type}-${new Date().toISOString().split('T')[0]}.csv`);
      notification.success({
        message: 'Export Successful',
        description: `${type} data exported successfully`,
      });
    }
  };

  const handleRowSelection = (selection) => {
    setSelectedRows(selection);
  };

  return (
    <div className="pg-table-container">
      <AdvancedTable
        data={data}
        columns={columns}
        title={title}
        loading={loading}
        onRefresh={onRefresh}
        onExport={handleExport}
        onRowSelect={handleRowSelection}
        className="pg-table"
        height="70vh"
        enableSearch={true}
        enableColumnToggle={true}
        enableColumnResize={true}
        enableColumnReorder={true}
        enableRowSelection={true}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        enableExport={true}
        pageSize={15}
        striped={true}
        bordered={true}
        sticky={true}
        globalFilter={globalFilter} // Pass external filter
        {...tableProps}
      />
    </div>
  );
};

// Helper functions
const generateCSV = (data, columns) => {
  const headers = columns
    .filter(col => col.id !== 'actions' && col.id !== 'select')
    .map(col => col.header)
    .join(',');
  
  const rows = data.map(row => 
    columns
      .filter(col => col.id !== 'actions' && col.id !== 'select')
      .map(col => {
        const value = row[col.accessorKey] || '';
        return `"${value}"`;
      })
      .join(',')
  );
  
  return [headers, ...rows].join('\n');
};

const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default PGTable; 