import React, { useState } from "react";
import { Table, Select, Input, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MonthSelect from "./Select";
const { Option } = Select;

const MonthlyTable = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [totalAmount, setTotalAmount] = useState("");
  const [autoSelectMonth, setAutoSelectMonth] = useState(false);
  const [amountAdded, setAmountAdded] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Месяц",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Действие",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEditRow(record)}>
            {" "}
            <EditOutlined />
          </a>
          <a onClick={() => handleDeleteRow(record.key)}>
            <DeleteOutlined style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];

  const handleAddRow = () => {
    if (editingKey !== "") {
      // Завершить редактирование существующей строки
      setEditingKey("");
      return;
    }

    if (name && (totalAmount || amountAdded)) {
      const monthToAdd = autoSelectMonth
        ? getNextMonth(data[data.length - 1]?.month || "Январь")
        : selectedMonth;
      setData([
        ...data,
        {
          key: data.length + 1,
          index: data.length + 1, // добавьте индекс
          name,
          month: monthToAdd,
          amount: totalAmount,
        },
      ]);
      setName("");
      if (!amountAdded) {
        setAmountAdded(true);
      }
      if (!autoSelectMonth) {
        setAutoSelectMonth(true);
      }
    }
  };

  const handleEditRow = (record) => {
    setEditingKey(record.key);
    setName(record.name);
    setSelectedMonth(record.month);
    setTotalAmount(record.amount);
  };

  const handleDeleteRow = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    setEditingKey("");
  };

  const getNextMonth = (currentMonth) => {
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    const currentIndex = months.indexOf(currentMonth);
    const nextIndex = (currentIndex + 1) % months.length;
    return months[nextIndex];
  };

  return (
    <div>
      <Space>
        <Input
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {autoSelectMonth ? (
          <span>
            {data.length > 0
              ? getNextMonth(data[data.length - 1]?.month || "Январь")
              : "Январь"}
          </span>
        ) : (
          <MonthSelect
            value={selectedMonth}
            onChange={(value) => setSelectedMonth(value)}
          />
        )}
        {!amountAdded && (
          <Input
            placeholder="Сумма"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
          />
        )}
        <Button type="primary" onClick={handleAddRow}>
          {editingKey !== "" ? "Завершить редактирование" : "Добавить"}
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record) =>
          record.key === editingKey ? "editing-row" : ""
        }
      />
    </div>
  );
};

export default MonthlyTable;
