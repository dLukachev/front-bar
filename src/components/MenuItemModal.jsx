import React from "react";

export default function MenuItemModal({ open, onClose, item, count, onAdd, onRemove, onAddToCart }) {
  if (!open || !item) return null;
  return (
    <div className="menu-item-modal-overlay" onClick={onClose}>
      <div className="menu-item-modal" onClick={e => e.stopPropagation()}>
        <img 
          src={item.name === 'Московский бургер' ? '/MenuImage/mosburgir.jpg' : 
               item.name === 'Лагман по-крымски' ? '/MenuImage/lagman.jpg' : 
               item.name === 'Вареники с картофелем и грибами' ? '/MenuImage/varenikikartgrib.jpg' : 
               item.name === 'Строганов из говядины' ? '/MenuImage/stroganoffgov.jpg' : 
               item.name === 'Пельмени с щукой и судаком' ? '/MenuImage/pelmenisudak.jpg' : 
               item.name === 'Пельмени с бараниной и аджикой' ? '/MenuImage/pelmenibaran.jpg' : 
               (item.image_url || "/no-image.png")} 
          alt={item.name} 
          className="modal-img" 
        />
        <div className="modal-content">
          <div className="modal-title-container">
            <div className="modal-title">{item.name}</div>
          </div>
          <div className="modal-price">{Math.round(item.price)} ₽</div>
          <div className="modal-desc-title">Описание:</div>
          <div className="modal-desc">{item.description || 'Описание отсутствует.'}</div>
        </div>
        <div className="modal-actions">
          <div className="cart-count-btn-wrapper">
            <div className="cart-count-btn-border"></div>
            <div className="cart-count-btn">
              <button className="count-btn" onClick={onRemove}>
                <svg width="6" height="2" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.53276 0.166548V2.46591H0.47168V0.166548H8.53276Z" fill="white"/>
                </svg>
              </button>
              <span className="count-value">{count}</span>
              <button className="count-btn" onClick={onAdd}>
                <svg width="8" height="8" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.30371 12.8459V0.843039H7.69185V12.8459H5.30371ZM0.500799 8.03409V5.64595H12.5036V8.03409H0.500799Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
          <button className="modal-add-btn" onClick={onAddToCart}>В корзину</button>
        </div>
        <button className="modal-close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
} 