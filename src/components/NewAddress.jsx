import React from "react";
import BottomNav from "./BottomNav";
import "./NewAddress.css";

export default function NewAddress() {
  return (
    <>
      <div className="new-address-content">
        <div className="new-address-title">Новый адрес</div>
        <input className="new-address-search" placeholder="Поиск" />
        <form className="new-address-form">
          <label>
            <span className="new-address-label">Улица</span>
            <input className="new-address-input" placeholder="Маршала Чуйкова, 11к7" />
          </label>
          <div className="new-address-row">
            <label>
              <span className="new-address-label">Кв/офис</span>
              <input className="new-address-input" placeholder="143" />
            </label>
            <label>
              <span className="new-address-label">Подъезд</span>
              <input className="new-address-input" placeholder="1" />
            </label>
            <label>
              <span className="new-address-label">Этаж</span>
              <input className="new-address-input" placeholder="13" />
            </label>
          </div>
          <label>
            <span className="new-address-label">Комментарий для курьера</span>
            <input className="new-address-input" placeholder="Домофон 143*10" />
          </label>
          <div className="new-address-buttons">
            <button type="button" className="new-address-cancel">Отменить</button>
            <button type="submit" className="new-address-save">Сохранить</button>
          </div>
        </form>
      </div>
      <BottomNav />
    </>
  );
} 