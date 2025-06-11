import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Button, 
  Input, 
  Dropdown, 
  Tooltip,
  Space 
} from 'antd';
import {
  DragOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SearchOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { flexRender } from '@tanstack/react-table';

const DraggableColumnHeader = ({
  header,
  enableReorder = true,
  enableResize = true,
  enableSort = true,
  enableFilter = true,
  table,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState(
    header.column.getFilterValue() || ''
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: header.id,
    disabled: !enableReorder,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSort = () => {
    if (!enableSort || !header.column.getCanSort()) return;
    header.column.getToggleSortingHandler()?.();
  };

  const handleFilter = (value) => {
    setFilterValue(value);
    header.column.setFilterValue(value);
  };

  const clearFilter = () => {
    setFilterValue('');
    header.column.setFilterValue('');
    setShowFilter(false);
  };

  const sortDirection = header.column.getIsSorted();
  const canSort = header.column.getCanSort();
  const canFilter = header.column.getCanFilter();
  const hasFilter = header.column.getFilterValue();

  const filterDropdown = (
    <div className="column-filter-dropdown">
      <Input
        placeholder={`Filter ${header.column.columnDef.header}...`}
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        onPressEnter={() => handleFilter(filterValue)}
        suffix={
          <Space>
            <Button
              type="text"
              size="small"
              icon={<SearchOutlined />}
              onClick={() => handleFilter(filterValue)}
            />
            <Button
              type="text"
              size="small"
              icon={<ClearOutlined />}
              onClick={clearFilter}
            />
          </Space>
        }
      />
    </div>
  );

  return (
    <th
      ref={setNodeRef}
      style={{
        ...style,
        width: header.getSize(),
        position: 'relative',
      }}
      className={`
        sortable-header 
        ${isDragging ? 'dragging' : ''}
        ${canSort ? 'sortable' : ''}
        ${hasFilter ? 'filtered' : ''}
      `}
    >
      <div className="header-content">
        {/* Drag Handle */}
        {enableReorder && (
          <div
            className="drag-handle"
            {...attributes}
            {...listeners}
          >
            <DragOutlined />
          </div>
        )}

        {/* Header Text & Sort */}
        <div
          className={`header-text ${canSort ? 'clickable' : ''}`}
          onClick={handleSort}
        >
          <div className="header-title">
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
          
          {canSort && (
            <div className="sort-indicator">
              {sortDirection === 'asc' && <SortAscendingOutlined />}
              {sortDirection === 'desc' && <SortDescendingOutlined />}
              {!sortDirection && <div className="sort-placeholder" />}
            </div>
          )}
        </div>

        {/* Filter Button */}
        {enableFilter && canFilter && (
          <Dropdown
            overlay={filterDropdown}
            trigger={['click']}
            open={showFilter}
            onOpenChange={setShowFilter}
            placement="bottomRight"
          >
            <Button
              type="text"
              size="small"
              icon={<FilterOutlined />}
              className={`filter-button ${hasFilter ? 'active' : ''}`}
            />
          </Dropdown>
        )}
      </div>

      {/* Resize Handle */}
      {enableResize && (
        <div
          className="resize-handle"
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
        />
      )}
    </th>
  );
};

export default DraggableColumnHeader; 