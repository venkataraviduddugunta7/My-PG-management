import React, { useState, useCallback, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  Button, 
  Checkbox, 
  Dropdown, 
  Input, 
  Tag, 
  Tooltip, 
  Space,
  Popover,
  Badge
} from 'antd';
import {
  FilterOutlined,
  SettingOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  DragOutlined,
  SearchOutlined,
  ExportOutlined,
  ReloadOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import DraggableColumnHeader from './DraggableColumnHeader';
import ColumnTogglePanel from './ColumnTogglePanel';
import './AdvancedTable.scss';

const AdvancedTable = ({
  data = [],
  columns: initialColumns = [],
  title = "Advanced Data Table",
  enableSearch = true,
  enableColumnToggle = true,
  enableColumnResize = true,
  enableColumnReorder = true,
  enableRowSelection = true,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableExport = true,
  pageSize = 10,
  loading = false,
  onRowSelect,
  onRefresh,
  onExport,
  className = "",
  height = "600px",
  striped = true,
  bordered = true,
  sticky = true,
  globalFilter: externalGlobalFilter = "", // Accept external global filter
}) => {
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState(
    initialColumns.map((col) => col.id || col.accessorKey)
  );
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  
  // Use external global filter if provided, otherwise use internal state
  const globalFilter = externalGlobalFilter ? externalGlobalFilter : internalGlobalFilter;
  const [columnSizing, setColumnSizing] = useState({});
  const [showColumnPanel, setShowColumnPanel] = useState(false);

  // Enhanced columns with custom features
  const enhancedColumns = useMemo(() => {
    const baseColumns = initialColumns.map((col) => ({
      ...col,
      enableResizing: enableColumnResize,
      enableSorting: enableSorting && (col.enableSorting !== false),
      cell: ({ getValue, row, column }) => {
        const value = getValue();
        const cellProps = {
          value,
          row,
          column,
          original: row.original,
        };

        // Custom cell renderers based on column type
        if (col.cellType === 'status') {
          return <StatusCell {...cellProps} />;
        }
        if (col.cellType === 'tags') {
          return <TagsCell {...cellProps} />;
        }
        if (col.cellType === 'actions') {
          return <ActionsCell {...cellProps} actions={col.actions || []} />;
        }
        if (col.cellType === 'checkbox') {
          return <Checkbox />;
        }
        if (col.cellType === 'avatar') {
          return <AvatarCell {...cellProps} />;
        }
        if (col.cellType === 'currency') {
          return <CurrencyCell {...cellProps} />;
        }
        if (col.cellType === 'date') {
          return <DateCell {...cellProps} />;
        }

        // Default text cell with ellipsis
        return <TextCell {...cellProps} maxWidth={col.maxWidth} />;
      },
    }));

      // Add row selection column if enabled
  if (enableRowSelection) {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
        enableColumnFilter: false,
        enableResizing: false,
        size: 50,
        sticky: 'left', // Make checkbox column sticky
      },
      ...baseColumns,
    ];
  }

    return baseColumns;
  }, [initialColumns, enableRowSelection, enableColumnResize, enableSorting]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      columnVisibility,
      columnOrder,
      columnSizing,
    },
    enableRowSelection,
    enableColumnResizing: enableColumnResize,
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setInternalGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  // DND Sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id);
      const newIndex = columnOrder.indexOf(over.id);
      const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
      
      setColumnOrder(newOrder);
      table.setColumnOrder(newOrder);
    }
  }, [columnOrder, table]);

  const selectedRowsCount = Object.keys(rowSelection).length;

  return (
    <div className={`advanced-table-container ${className}`} style={{ height, display: 'flex', flexDirection: 'column' }}>
      {/* Table Header */}
      <div className="table-header">
        <div className="table-title">
          <h3>{title}</h3>
          {selectedRowsCount > 0 && (
            <Badge count={selectedRowsCount} className="selection-badge">
              <span>Selected</span>
            </Badge>
          )}
        </div>
        
        <div className="table-actions">
          {enableSearch && !externalGlobalFilter && (
            <Input
              placeholder="Search all columns..."
              prefix={<SearchOutlined />}
              value={globalFilter}
              onChange={(e) => setInternalGlobalFilter(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
          )}
          
          <Space>
            {onRefresh && (
              <Button icon={<ReloadOutlined />} onClick={onRefresh}>
                Refresh
              </Button>
            )}
            
            {enableExport && onExport && (
              <Button icon={<ExportOutlined />} onClick={onExport}>
                Export
              </Button>
            )}
            
            {enableColumnToggle && (
              <Popover
                content={
                  <ColumnTogglePanel
                    columns={enhancedColumns}
                    columnVisibility={columnVisibility}
                    onColumnVisibilityChange={setColumnVisibility}
                  />
                }
                title="Toggle Columns"
                trigger="click"
                open={showColumnPanel}
                onOpenChange={setShowColumnPanel}
                placement="bottomRight"
              >
                <Button icon={<SettingOutlined />}>
                  Columns
                </Button>
              </Popover>
            )}
          </Space>
        </div>
      </div>

      {/* Table Container */}
      <div 
        className={`table-wrapper ${striped ? 'striped' : ''} ${bordered ? 'bordered' : ''}`}
        style={{ flex: 1, minHeight: 0, overflow: 'auto' }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="advanced-table">
            <thead className={sticky ? 'sticky-header' : ''}>
              {table.getHeaderGroups().map((headerGroup) => (
                <SortableContext
                  key={headerGroup.id}
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  <tr>
                    {headerGroup.headers.map((header, headerIndex) => {
                      const isSticky = header.column.columnDef.sticky;
                      const stickyStyle = {};
                      
                      if (isSticky === 'left') {
                        let leftOffset = 0;
                        // Calculate left offset for sticky columns
                        for (let i = 0; i < headerIndex; i++) {
                          const prevHeader = headerGroup.headers[i];
                          if (prevHeader.column.columnDef.sticky === 'left') {
                            leftOffset += prevHeader.getSize();
                          }
                        }
                        stickyStyle.left = `${leftOffset}px`;
                        stickyStyle.zIndex = 11;
                        stickyStyle.backgroundColor = '#f9fafb';
                        stickyStyle.borderRight = '1px solid #e5e7eb';
                      } else if (isSticky === 'right') {
                        let rightOffset = 0;
                        // Calculate right offset for sticky columns
                        for (let i = headerIndex + 1; i < headerGroup.headers.length; i++) {
                          const nextHeader = headerGroup.headers[i];
                          if (nextHeader.column.columnDef.sticky === 'right') {
                            rightOffset += nextHeader.getSize();
                          }
                        }
                        stickyStyle.right = `${rightOffset}px`;
                        stickyStyle.zIndex = 11;
                        stickyStyle.backgroundColor = '#f9fafb';
                        stickyStyle.borderLeft = '1px solid #e5e7eb';
                      }

                      return (
                        <DraggableColumnHeader
                          key={header.id}
                          header={header}
                          enableReorder={enableColumnReorder && !isSticky}
                          enableResize={enableColumnResize}
                          enableSort={enableSorting}
                          enableFilter={enableFiltering}
                          table={table}
                          stickyStyle={stickyStyle}
                        />
                      );
                    })}
                  </tr>
                </SortableContext>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr 
                  key={row.id}
                  className={`
                    ${row.getIsSelected() ? 'selected' : ''}
                    ${index % 2 === 0 ? 'even' : 'odd'}
                  `}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    const isSticky = cell.column.columnDef.sticky;
                    const stickyStyle = {};
                    
                    if (isSticky === 'left') {
                      let leftOffset = 0;
                      // Calculate left offset for sticky columns
                      for (let i = 0; i < cellIndex; i++) {
                        const prevCell = row.getVisibleCells()[i];
                        if (prevCell.column.columnDef.sticky === 'left') {
                          leftOffset += prevCell.column.getSize();
                        }
                      }
                      stickyStyle.position = 'sticky';
                      stickyStyle.left = `${leftOffset}px`;
                      stickyStyle.zIndex = 10;
                      stickyStyle.backgroundColor = 'white';
                      stickyStyle.borderRight = '1px solid #e5e7eb';
                    } else if (isSticky === 'right') {
                      let rightOffset = 0;
                      // Calculate right offset for sticky columns
                      const visibleCells = row.getVisibleCells();
                      for (let i = cellIndex + 1; i < visibleCells.length; i++) {
                        const nextCell = visibleCells[i];
                        if (nextCell.column.columnDef.sticky === 'right') {
                          rightOffset += nextCell.column.getSize();
                        }
                      }
                      stickyStyle.position = 'sticky';
                      stickyStyle.right = `${rightOffset}px`;
                      stickyStyle.zIndex = 10;
                      stickyStyle.backgroundColor = 'white';
                      stickyStyle.borderLeft = '1px solid #e5e7eb';
                    }

                    return (
                      <td
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          minWidth: cell.column.columnDef.minSize,
                          maxWidth: cell.column.columnDef.maxSize,
                          ...stickyStyle,
                        }}
                        className={isSticky ? `sticky-${isSticky}` : ''}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </DndContext>

        {/* Empty State */}
        {data.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-content">
              <h4>No Data</h4>
              <p>No records found to display</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="loading-content">
              <div className="loading-spinner" />
              <p>Loading data...</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {enablePagination && data.length > 0 && (
        <div className="table-pagination">
          <div className="pagination-info">
            <span>
              Showing {table.getRowModel().rows.length} of {data.length} entries
              {selectedRowsCount > 0 && ` (${selectedRowsCount} selected)`}
            </span>
          </div>
          
          <div className="pagination-controls">
            <Space>
              <Button
                size="small"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.setPageIndex(0)}
              >
                First
              </Button>
              <Button
                size="small"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                Previous
              </Button>
              <span className="page-info">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
              <Button
                size="small"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                Next
              </Button>
              <Button
                size="small"
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                Last
              </Button>
            </Space>
          </div>
        </div>
      )}
    </div>
  );
};

// Cell Components
const TextCell = ({ value, maxWidth = 200 }) => (
  <Tooltip title={value} placement="topLeft">
    <div 
      className="text-cell"
      style={{
        maxWidth,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      {value}
    </div>
  </Tooltip>
);

const StatusCell = ({ value }) => {
  const getStatusColor = (status) => {
    const colorMap = {
      'active': 'green',
      'inactive': 'red',
      'pending': 'orange',
      'completed': 'blue',
      'overdue': 'volcano',
      'paid': 'green',
      'unpaid': 'red',
    };
    return colorMap[status && status.toLowerCase()] || 'default';
  };

  return <Tag color={getStatusColor(value)}>{value}</Tag>;
};

const TagsCell = ({ value }) => (
  <div className="tags-cell">
    {Array.isArray(value) ? value.map((tag, index) => (
      <Tag key={index} size="small">{tag}</Tag>
    )) : <Tag size="small">{value}</Tag>}
  </div>
);

const ActionsCell = ({ row, actions = [] }) => (
  <div className="actions-cell">
    <Space size={4}>
      {actions.map((action, index) => (
        <Tooltip key={index} title={action.tooltip}>
          <Button
            type="text"
            size="small"
            icon={action.icon}
            onClick={() => action.onClick && action.onClick(row.original)}
            disabled={action.disabled && action.disabled(row.original)}
          />
        </Tooltip>
      ))}
      {actions.length > 3 && (
        <Dropdown
          menu={{
            items: actions.slice(3).map((action, index) => ({
              key: index,
              label: action.label,
              icon: action.icon,
              onClick: () => action.onClick && action.onClick(row.original),
            })),
          }}
          trigger={['click']}
        >
          <Button type="text" size="small" icon={<MoreOutlined />} />
        </Dropdown>
      )}
    </Space>
  </div>
);

const AvatarCell = ({ value, row }) => (
  <div className="avatar-cell">
    <div className="avatar-container">
      <div className="avatar-image">
        {(value && value.charAt(0) && value.charAt(0).toUpperCase()) || (row.original.name && row.original.name.charAt(0) && row.original.name.charAt(0).toUpperCase()) || 'U'}
      </div>
      <div className="avatar-text">
        <div className="avatar-name">{row.original.name || value}</div>
        <div className="avatar-subtitle">{row.original.email || row.original.phone}</div>
      </div>
    </div>
  </div>
);

const CurrencyCell = ({ value, currency = '₹' }) => (
  <div className="currency-cell">
    {currency}{typeof value === 'number' ? value.toLocaleString() : value}
  </div>
);

const DateCell = ({ value }) => {
  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return <div className="date-cell">{formatDate(value)}</div>;
};

export default AdvancedTable; 