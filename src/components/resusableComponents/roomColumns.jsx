export const roomColumns = (onEdit, onDelete) => [
    {
      title: "Room ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Room Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
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
  