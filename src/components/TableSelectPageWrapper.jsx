import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableSelectPage from "./TableSelectPage";

const TableSelectPageWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantId, selectedDate, selectedTime } = location.state || {};

  if (!restaurantId || !selectedDate || !selectedTime) {
    return <div>Недостаточно данных для выбора стола</div>;
  }

  return (
    <TableSelectPage
      restaurantId={restaurantId}
      selectedDate={selectedDate}
      selectedTime={selectedTime}
      onTableSelect={(tableId) => {
        alert(`Выбран стол: ${tableId}`);
        // Здесь можно сделать переход к финальному бронированию
        // navigate("/confirm", { state: { ... } });
      }}
    />
  );
};

export default TableSelectPageWrapper; 