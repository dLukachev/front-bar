import React, { useState } from "react";
import { useRestaurant } from "./RestaurantContext";
import { useNavigate } from "react-router-dom";

function MirLogo() {
  return <span style={{fontWeight:700, color:'#3c8c3c', fontSize:22, marginRight:8}}>МИР</span>;
}
function McLogo() {
  return <span style={{fontWeight:700, color:'#e74c3c', fontSize:22, marginRight:8}}>●●</span>;
}

export default function OrderPage() {
  const navigate = useNavigate();
  const { selectedRestaurant, cart } = useRestaurant();
  // Пример карт, в реальном проекте брать из профиля пользователя
  const cards = [
    { id: 1, type: "mir", last4: "9924" },
    { id: 2, type: "mc", last4: "2961" },
  ];
  const [selectedCard, setSelectedCard] = useState(cards[0]?.id || null);
  const [comment, setComment] = useState("");
  const [persons, setPersons] = useState(1);
  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="order-app">
      <button className="order-close-btn" onClick={() => navigate(-1)}>×</button>
      <div className="order-title">Оформление заказа</div>
      <div className="order-section">
        <div className="order-label">Адрес ресторана</div>
        <div className="order-address">{selectedRestaurant?.address || "—"}</div>
      </div>
      <div className="order-section">
        <div className="order-label-row">
          <div className="order-label">Метод оплаты</div>
          <button className="order-add-card-btn">+</button>
        </div>
        <div className="pay-cards-list">
          {cards.map(card => (
            <div
              key={card.id}
              className={"pay-card" + (selectedCard === card.id ? " active" : "")}
              onClick={() => setSelectedCard(card.id)}
            >
              {card.type === "mir" && <MirLogo />}
              {card.type === "mc" && <McLogo />}
              <span className="pay-card-dots">.... {card.last4}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="order-section">
        <div className="order-label">Детали заказа</div>
        <textarea
          className="order-comment"
          placeholder="Комментарий к заказу"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <div className="order-section order-persons-row">
        <div className="order-label">Количество персон:</div>
        <div className="order-count-btn-block">
          <button className="count-btn" onClick={() => setPersons(p => Math.max(1, p - 1))}>-</button>
          <span className="order-persons-value">{persons}</span>
          <button className="count-btn" onClick={() => setPersons(p => p + 1)}>+</button>
        </div>
      </div>
      <button className="order-pay-btn">Оплатить {total.toFixed(2)}₽</button>
    </div>
  );
} 