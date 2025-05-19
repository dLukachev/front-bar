import React from "react";
import { useRestaurant } from "./RestaurantContext";
import { useNavigate } from "react-router-dom";

export default function CartPage({ onClose }) {
  const { cart, setCart } = useRestaurant();
  const navigate = useNavigate();

  const handleClearCart = () => setCart([]);
  const handleOrder = () => navigate('/order');

  return (
    <div className="cart-app">
      <div className="cart-title">Моя корзина</div>
      <button className="cart-close-btn" onClick={onClose}>×</button>
      <div className="cart-items-list">
        {cart.length === 0 ? (
          <div className="cart-empty">Корзина пуста</div>
        ) : (
          cart.map(item => (
            <div className="cart-item-block" key={item.id}>
              <img src={
                item.name === 'Московский бургер' ? '/MenuImage/mosburgir.jpg' :
                item.name === 'Лагман по-крымски' ? '/MenuImage/lagman.jpg' :
                item.name === 'Вареники с картофелем и грибами' ? '/MenuImage/varenikikartgrib.jpg' :
                item.name === 'Строганов из говядины' ? '/MenuImage/stroganoffgov.jpg' :
                (item.image_url || "/no-image.png")
              } alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <div className="cart-item-title">{item.name}</div>
                <div className="cart-item-price">{Math.round(item.price)} ₽</div>
                <div className="cart-item-count">x{item.count}</div>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-actions-row">
          <button className="cart-action-btn" onClick={handleClearCart}>Удалить все</button>
          <button className="cart-action-btn" onClick={handleOrder}>Заказать</button>
        </div>
      )}
    </div>
  );
} 