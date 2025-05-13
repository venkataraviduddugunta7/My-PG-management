export const bedColumns = (onEdit, onDelete) => [
    {
      title: "Bed ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Bed Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Occupied" ? "red" : "green" }}>
          {status}
        </span>
      ),
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
  