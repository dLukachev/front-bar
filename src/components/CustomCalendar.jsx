import React, { useState } from 'react';
import './CustomCalendar.css';

const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

function getMonthMatrix(year, month) {
  // month: 0-based
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevMonthLastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const daysInPrevMonth = prevMonthLastDay.getDate();
  const startDay = (firstDay.getDay() + 6) % 7; // 0=пн, 6=вс

  let matrix = [];
  let day = 1;
  let nextMonthDay = 1;
  for (let row = 0; row < 6; row++) {
    let week = [];
    for (let col = 0; col < 7; col++) {
      let cell = {};
      if (row === 0 && col < startDay) {
        // Предыдущий месяц
        cell = {
          day: daysInPrevMonth - startDay + col + 1,
          outside: true,
          date: new Date(year, month - 1, daysInPrevMonth - startDay + col + 1),
        };
      } else if (day > daysInMonth) {
        // Следующий месяц
        cell = {
          day: nextMonthDay++,
          outside: true,
          date: new Date(year, month + 1, nextMonthDay - 1),
        };
      } else {
        // Текущий месяц
        cell = {
          day,
          outside: false,
          date: new Date(year, month, day),
        };
        day++;
      }
      week.push(cell);
    }
    matrix.push(week);
  }
  return matrix;
}

const CustomCalendar = ({ onDateSelect, selectedDate }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const matrix = getMonthMatrix(currentYear, currentMonth);

  const handleDayClick = (cell) => {
    if (!cell.outside) {
      onDateSelect(cell.date);
    }
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString('ru', { month: 'long' });

  return (
    <div className="calendar-outer">
      <div className="calendar-inner">
        <div className="calendar-month-bar">{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</div>
        <div className="calendar-grid">
          <div className="calendar-row">
            {weekDays.map((d, i) => (
              <div key={d} className={`calendar-cell calendar-weekday${i === 5 ? ' calendar-saturday' : ''}${i === 6 ? ' calendar-sunday' : ''}`}>{d}</div>
            ))}
          </div>
          {matrix.map((week, i) => (
            <div className="calendar-row" key={i}>
              {week.map((cell, j) => {
                const isSelected = selectedDate && cell.date.toDateString() === selectedDate.toDateString();
                return (
                  <div
                    key={j}
                    className={`calendar-cell${cell.outside ? ' calendar-outside' : ''}${cell.date.getDay() === 0 ? ' calendar-sunday' : ''}${cell.date.getDay() === 6 ? ' calendar-saturday' : ''}${isSelected ? ' calendar-selected' : ''}`}
                    onClick={() => handleDayClick(cell)}
                  >
                    {cell.day}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar; 