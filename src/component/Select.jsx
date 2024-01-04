
import React from "react";
import { Select } from "antd";

const { Option } = Select;

const MonthSelect = ({ value, onChange }) => {
  return (
    <Select placeholder="Выберите месяц" value={value} onChange={onChange}>
      <Option value="Январь">Январь</Option>
      <Option value="Февраль">Февраль</Option>
      <Option value="Март">Март</Option>
      <Option value="Апрель">Апрель</Option>
      <Option value="Май">Май</Option>
      <Option value="Июнь">Июнь</Option>
      <Option value="Июль">Июль</Option>
      <Option value="Август">Август</Option>
      <Option value="Сентябрь">Сентябрь</Option>
      <Option value="Октябрь">Октябрь</Option>
      <Option value="Ноябрь">Ноябрь</Option>
      <Option value="Декабрь">Декабрь</Option>
    </Select>
  );
};

export default MonthSelect;
