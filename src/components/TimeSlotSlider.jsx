import React, { useRef } from "react";
import './TimeSlotSlider.css';

// Формируем массив двухчасовых слотов
const SLOT_STARTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const TIME_SLOTS = SLOT_STARTS.map((start, idx) => {
  // Получаем конец слота (через 2 часа)
  const [h, m] = start.split(":").map(Number);
  const endH = h + 2;
  const end = (endH < 10 ? "0" : "") + endH + ":" + (m < 10 ? "0" : "") + m;
  return `${start}–${end}`;
});

const TimeSlotSlider = ({ selected, onSelect }) => {
  // Показываем только 3 элемента: prev, selected, next
  const prevIdx = selected > 0 ? selected - 1 : null;
  const nextIdx = selected < TIME_SLOTS.length - 1 ? selected + 1 : null;

  // Свайпы
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const dx = touchEndX.current - touchStartX.current;
    if (Math.abs(dx) > 30) {
      if (dx < 0 && nextIdx !== null) {
        onSelect(nextIdx);
      } else if (dx > 0 && prevIdx !== null) {
        onSelect(prevIdx);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Для десктопа: клик по боковым слотам
  const handleSideClick = (idx) => {
    if (idx !== null) onSelect(idx);
  };

  return (
    <div
      className="ios-time-slot-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="ios-time-slot-list">
        <div
          className="ios-time-slot-item ios-time-slot-side"
          onClick={() => handleSideClick(prevIdx)}
          style={{ cursor: prevIdx !== null ? 'pointer' : 'default' }}
        >
          {prevIdx !== null ? TIME_SLOTS[prevIdx] : ""}
        </div>
        <div className="ios-time-slot-item ios-time-slot-center">
          {TIME_SLOTS[selected]}
          <div className="ios-time-slot-indicator" />
        </div>
        <div
          className="ios-time-slot-item ios-time-slot-side"
          onClick={() => handleSideClick(nextIdx)}
          style={{ cursor: nextIdx !== null ? 'pointer' : 'default' }}
        >
          {nextIdx !== null ? TIME_SLOTS[nextIdx] : ""}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSlider; 