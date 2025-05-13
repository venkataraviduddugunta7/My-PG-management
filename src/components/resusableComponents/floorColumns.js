export const floorColumns = (onEdit, onDelete) => [
    {
      title: "Floor ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Floor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <a onClick={() => onEdit(record)}>Edit</a>
          <span style={{ margin: "0 8px" }}>|</span>
          <a onClick={() => onDelete(record.id)}>Delete</a>
        </>
      ),
    },
  ];
  