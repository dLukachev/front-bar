import React, { useEffect, useState } from "react";
import "./RestaurantSelectModal.css";

export default function RestaurantSelectModal({ open, onClose, onSelect }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("https://backend-bar.onrender.com/api/v1/restaurants?user_id=123456789")
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [open]);

  // Анимация закрытия
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // длительность анимации
  };

  const filtered = restaurants.filter(r =>
    r.address.toLowerCase().includes(search.toLowerCase())
  );

  if (!open && !isClosing) return null;

  return (
    <div className={"modal-backdrop" + (isClosing ? " closing" : "") } onClick={handleClose}>
      <div className={"modal-window" + (isClosing ? " closing" : "") } onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Выберите предприятие</span>
          <button className="modal-close" onClick={handleClose}>×</button>
        </div>
        <div className="modal-search-wrap">
          <input
            className="modal-search"
            placeholder="Поиск"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="modal-list">
          {loading ? (
            <div className="modal-loading">Загрузка...</div>
          ) : filtered.length === 0 ? (
            <div className="modal-empty">Ничего не найдено</div>
          ) : (
            filtered.map(r => (
              <div
                key={r.id}
                className="modal-list-item"
                onClick={() => { onSelect(r); handleClose(); }}
              >
                {r.address}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 