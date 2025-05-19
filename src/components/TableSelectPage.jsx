import React, { useState } from "react";
import TimeSlotSlider from "./TimeSlotSlider";

const TIME_SLOTS = [9, 11, 13, 15, 17, 19, 21]; // часы начала слотов

const TableSelectPage = ({ selectedTime }) => {
  const [slotIdx, setSlotIdx] = useState(
    Math.max(0, TIME_SLOTS.findIndex(h => h === selectedTime) || 0)
  );

  return (
    <div style={{ background: "#fff", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TimeSlotSlider selected={slotIdx} onSelect={setSlotIdx} />
    </div>
  );
};

export default TableSelectPage; 