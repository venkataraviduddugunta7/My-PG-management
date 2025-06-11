# Advanced Table Components

A comprehensive table system built with TanStack Table v8, featuring drag & drop, column resizing, filtering, sorting, and advanced PG management functionality.

## Components Overview

### 1. AdvancedTable (`AdvancedTable.jsx`)
The core table component with all advanced features.

### 2. DraggableColumnHeader (`DraggableColumnHeader.jsx`)
Handles column drag & drop, sorting, and filtering controls.

### 3. ColumnTogglePanel (`ColumnTogglePanel.jsx`)
Provides column visibility management.

### 4. PGTable (`../PGTable/PGTable.jsx`)
Pre-configured table for PG management with specific data types.

## Features

✅ **Drag & Drop Column Reordering** - Reorder columns by dragging headers  
✅ **Column Resizing** - Resize columns with drag handles  
✅ **Column Visibility Toggle** - Show/hide columns with toggle panel  
✅ **Global Search** - Search across all table data  
✅ **Column-specific Filtering** - Individual column filters  
✅ **Multi-column Sorting** - Sort by multiple columns  
✅ **Row Selection** - Single and bulk row selection  
✅ **Pagination** - Configurable page sizes  
✅ **Export to CSV** - Export filtered/sorted data  
✅ **Custom Cell Types** - Avatar, status, currency, date, action cells  
✅ **Loading & Empty States** - Professional loading and empty state UI  
✅ **Responsive Design** - Mobile-friendly responsive layout  

## Basic Usage

```jsx
import AdvancedTable from './components/AdvancedTable/AdvancedTable';

const MyComponent = () => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    // ... more data
  ];

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ getValue }) => <div>{getValue()}</div>
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => (
        <span className={`status-${getValue().toLowerCase()}`}>
          {getValue()}
        </span>
      )
    }
  ];

  return (
    <AdvancedTable
      data={data}
      columns={columns}
      enableColumnOrdering={true}
      enableResizing={true}
      enableSorting={true}
      enableFiltering={true}
      enableRowSelection={true}
      showSearch={true}
      showColumnToggle={true}
      showExport={true}
      pageSize={10}
    />
  );
};
```

## PG-Specific Usage

```jsx
import PGTable from './components/PGTable/PGTable';

const TenantsPage = () => {
  const tenantData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
      room: 'A101',
      phone: '+91 9876543210',
      rent: 12000,
      joinDate: new Date('2024-01-15'),
      status: 'Active',
      paymentStatus: 'Paid'
    },
    // ... more tenant data
  ];

  return (
    <PGTable
      data={tenantData}
      type="tenants"
      showSearch={true}
      showColumnToggle={true}
      showExport={true}
      enableRowSelection={true}
      enableSorting={true}
      enableFiltering={true}
      enableResizing={true}
      enableColumnOrdering={true}
      pageSize={10}
    />
  );
};
```

## Props Reference

### AdvancedTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | `[]` | Table data array |
| `columns` | `Array` | `[]` | Column definitions |
| `enableColumnOrdering` | `boolean` | `false` | Enable drag & drop column reordering |
| `enableResizing` | `boolean` | `false` | Enable column resizing |
| `enableSorting` | `boolean` | `false` | Enable column sorting |
| `enableFiltering` | `boolean` | `false` | Enable column filtering |
| `enableRowSelection` | `boolean` | `false` | Enable row selection |
| `showSearch` | `boolean` | `false` | Show global search input |
| `showColumnToggle` | `boolean` | `false` | Show column visibility toggle |
| `showExport` | `boolean` | `false` | Show export to CSV button |
| `pageSize` | `number` | `10` | Number of rows per page |
| `loading` | `boolean` | `false` | Show loading state |
| `onRowClick` | `function` | - | Callback when row is clicked |
| `onRowSelect` | `function` | - | Callback when rows are selected |
| `onExport` | `function` | - | Custom export handler |

### PGTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | `[]` | PG management data |
| `type` | `string` | `'tenants'` | Data type: 'tenants', 'payments', 'rooms', 'complaints' |
| All AdvancedTable props | - | - | Inherits all AdvancedTable props |

## Data Types

### Tenants Data Structure
```javascript
{
  id: number,
  name: string,
  avatar: string, // URL or base64
  room: string,
  phone: string,
  rent: number,
  joinDate: Date,
  status: 'Active' | 'Inactive' | 'Pending',
  paymentStatus: 'Paid' | 'Pending' | 'Overdue',
  email: string,
  deposit: number,
  emergencyContact: string
}
```

### Payments Data Structure
```javascript
{
  id: string,
  tenant: string,
  room: string,
  amount: number,
  dueDate: Date,
  paidDate: Date | null,
  method: 'Cash' | 'UPI' | 'Bank Transfer' | 'Card',
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded',
  late_fee: number
}
```

### Rooms Data Structure
```javascript
{
  id: number,
  number: string,
  type: 'Single' | 'Double' | 'Triple' | 'Quad',
  capacity: number,
  occupied: number,
  rent_per_bed: number,
  facilities: string[],
  floor: number,
  availability: 'Available' | 'Full'
}
```

### Complaints Data Structure
```javascript
{
  id: string,
  tenant: string,
  room: string,
  category: 'Maintenance' | 'Cleaning' | 'Noise' | 'Facilities' | 'Other',
  priority: 'Low' | 'Medium' | 'High' | 'Critical',
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed',
  description: string,
  created_date: Date,
  resolved_date: Date | null
}
```

## Custom Column Types

### Avatar Cell
```jsx
{
  accessorKey: 'avatar',
  header: 'Avatar',
  cell: ({ row }) => (
    <div className="cell-avatar">
      <img src={row.original.avatar} alt={row.original.name} />
      <span>{row.original.name}</span>
    </div>
  )
}
```

### Status Cell
```jsx
{
  accessorKey: 'status',
  header: 'Status',
  cell: ({ getValue }) => (
    <span className={`status-tag status-${getValue().toLowerCase()}`}>
      {getValue()}
    </span>
  )
}
```

### Currency Cell
```jsx
{
  accessorKey: 'amount',
  header: 'Amount',
  cell: ({ getValue }) => (
    <span className="cell-currency">
      ₹{getValue().toLocaleString()}
    </span>
  )
}
```

### Date Cell
```jsx
{
  accessorKey: 'date',
  header: 'Date',
  cell: ({ getValue }) => (
    <span className="cell-date">
      {getValue()?.toLocaleDateString()}
    </span>
  )
}
```

### Actions Cell
```jsx
{
  id: 'actions',
  header: 'Actions',
  cell: ({ row }) => (
    <div className="cell-actions">
      <button onClick={() => handleView(row.original)}>View</button>
      <button onClick={() => handleEdit(row.original)}>Edit</button>
      <button onClick={() => handleDelete(row.original)}>Delete</button>
    </div>
  )
}
```

## Styling & Customization

The table uses SCSS modules for styling. Key CSS classes:

- `.advanced-table` - Main table container
- `.advanced-table__header` - Table header with controls
- `.advanced-table__search` - Search input area
- `.advanced-table__table` - Main table element
- `.advanced-table__pagination` - Pagination controls
- `.column-header` - Individual column headers
- `.cell-*` - Various cell type styles

### Custom Theme Colors

The table uses these CSS custom properties from your design system:

```scss
:root {
  --primary-color: #586FCC;
  --primary-dark: #273156;
  --text-primary: #1D2540;
  --text-secondary: #6B7280;
  --background-light: #F7F8FA;
  --border-color: #E5E7EB;
}
```

## Demo

Visit `/table-demo` in your application to see a comprehensive demo with sample data for all PG management data types.

## Dependencies

- `@tanstack/react-table` - Core table functionality
- `@dnd-kit/core` - Drag and drop functionality
- `@dnd-kit/sortable` - Sortable drag and drop
- `@dnd-kit/utilities` - DnD utilities
- `antd` - UI components (buttons, inputs, etc.)
- `@ant-design/icons` - Icon components

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance Notes

- Virtualization is built-in for large datasets (1000+ rows)
- Column resizing is debounced for smooth performance
- Search is debounced with 300ms delay
- Row selection is optimized for bulk operations

## Troubleshooting

### Common Issues

1. **Columns not draggable**: Check that `enableColumnOrdering={true}` is set
2. **Resize handles not visible**: Ensure `enableResizing={true}` and check CSS
3. **Search not working**: Verify data structure matches column accessorKeys
4. **Export not working**: Check that data contains serializable values

### Debug Mode

Enable debug mode to see table state:

```jsx
<AdvancedTable
  data={data}
  columns={columns}
  debugTable={true}
/>
```

This will log table state to console for debugging.

## Contributing

When adding new features:

1. Follow existing code patterns
2. Add proper TypeScript types
3. Update this README
4. Add tests for new functionality
5. Ensure responsive design works
6. Test with large datasets 