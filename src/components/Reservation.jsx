import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservation.css';
import './Menu.css';
import CustomCalendar from './CustomCalendar';
import RestaurantSelectModal from './RestaurantSelectModal';

const Reservation = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleReserve = () => {
    if (!selectedRestaurant || !selectedDate) {
      alert('Выберите ресторан и дату');
      return;
    }
    // По умолчанию время 12:00, можно доработать выбор времени позже
    navigate('/select-table', {
      state: {
        restaurantId: selectedRestaurant.id,
        selectedDate,
        selectedTime: 12
      }
    });
  };

  return (
    <div className="reservation-container">
      <div
        className="address-select"
        onClick={() => setModalOpen(true)}
        style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}
      >
        {selectedRestaurant ? selectedRestaurant.address : "Выбрать адрес ресторана"} <span className="arrow">→</span>
      </div>
      <RestaurantSelectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={setSelectedRestaurant}
      />
      <h2 className="date-title">Выбери дату</h2>
      <CustomCalendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
      <button className="reserve-button" onClick={handleReserve}>
        Забронировать
      </button>
    </div>
  );
};

export default Reservation; 