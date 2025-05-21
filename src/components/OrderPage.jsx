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
      <button className="order-pay-btn">Оплатить {total.toFixed(2)} <svg width="16" height="15" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:'middle',marginLeft:2}}><path d="M6.68259 25.5439V5.087C6.68259 3.82162 6.11945 2.92531 4.99317 2.39807C4.17406 2.08172 3.25256 1.87083 2.12628 1.87083C1.51195 1.87083 1.20478 1.65993 1.20478 1.18541C1.20478 0.76362 1.51195 0.5 2.12628 0.5H18.7645C22.3993 0.5 25.4198 1.34359 27.7747 3.03076C29.9249 4.61248 31 6.45782 31 8.56679C31 10.6757 29.8737 12.4156 27.6724 13.7865C25.215 15.3682 21.7338 16.1591 17.3311 16.1591L15.1809 16.0009L12.8771 15.8427V25.1749C12.8771 26.8093 13.3379 27.9692 14.3618 28.6019C14.9761 29.0237 15.8976 29.2346 17.1263 29.2346L17.9966 29.1292C18.3038 29.1292 18.5085 29.2346 18.7133 29.3401L18.9181 29.8146C18.9181 30.2891 18.6109 30.5 17.9966 30.5H2.12628C1.40956 30.5 1 30.2891 1 29.8146C1.10239 29.6037 1.25597 29.4982 1.35836 29.3928C1.46075 29.2873 1.71672 29.2346 2.12628 29.1292C3.61092 29.1292 4.7372 28.8656 5.50512 28.3383C6.27304 27.8111 6.68259 26.862 6.68259 25.5439ZM12.8771 14.8937H17.9966L18.2014 14.9464C19.942 14.9464 21.3242 14.3137 22.3993 12.9956C23.4744 11.6775 24.0375 10.1485 24.0375 8.35589C24.0375 6.61599 23.5256 5.13972 22.6041 3.92707C21.4778 2.55624 19.942 1.87083 17.9966 1.87083C16.256 1.87083 14.9761 2.08172 14.157 2.45079C13.2867 2.81986 12.8771 3.71617 12.8771 5.13972V14.8937Z" fill="#410C00"/><path d="M29.6732 18.65C28.9494 18.65 28.2257 18.75 27.2607 18.95C26.1751 19.15 25.4514 19.25 24.9689 19.25C24.4864 19.3 23.7627 19.3 22.7977 19.3H22.7977C21.8327 19.3 20.7471 19.3 19.7821 19.2C18.6965 19.15 17.3697 19.05 15.6809 18.85C13.9922 18.7 12.9066 18.6 12.3035 18.55C11.5798 18.55 10.7354 18.5 9.52918 18.5C8.08171 18.6 6.75486 18.7 5.42802 18.9C3.98054 19.1 2.77432 19.35 1.68872 19.75C0.48249 20.1 0 20.5 0 20.9L0.241246 21.05L0.844357 21.15L3.49805 20.8C4.34241 20.6 5.18677 20.5 5.9105 20.5C6.63424 20.5 7.96109 20.6 9.64981 20.8L14.2335 21.35L17.7315 21.5C20.3852 21.5 22.9183 21.3 25.4514 20.8C27.8638 20.3 29.4319 19.85 30.1556 19.4C30.3969 19.4 30.7588 19.25 31 19.05L30.7588 18.9C30.5175 18.85 30.1556 18.75 29.6732 18.65Z" fill="#410C00"/></svg></button>
    </div>
  );
} 