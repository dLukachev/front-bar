import React, { useState } from "react";
import BottomNav from "./BottomNav";
import "./AboutMe.css";
import 'leaflet/dist/leaflet.css';
import { useNavigate } from "react-router-dom";

const addresses = [
  {
    id: 1,
    title: "Маршала Чуйкова, 11к7",
    desc: "подъезд 1, этаж 13, кв. 143"
  },
  {
    id: 2,
    title: "Жулебинский бульвар, 9",
    desc: "подъезд 2, этаж 3, кв. 24"
  },
  {
    id: 3,
    title: "Хлебозаводской тупик, 15",
    desc: "подъезд 4, этаж 5, кв. 64"
  }
];

export default function AboutMe() {
  const [form, setForm] = useState({
    name: "Арсений",
    phone: "+7 925 281 28 87",
    email: "zalivars@mail.ru",
    birth: "16.07.2004"
  });
  const [activeAddr, setActiveAddr] = useState(1);
  const navigate = useNavigate();

  return (
    <>
      <div className="about-container">
        <div className="about-content">
          <div className="about-title">Обо мне</div>
          <div className="about-form">
            <label>Имя
              <input className="about-input" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
            </label>
            <label>Телефон
              <input className="about-input" value={form.phone} onChange={e=>setForm(f=>({...f, phone:e.target.value}))} />
            </label>
            <label>Почта
              <input className="about-input" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} />
            </label>
            <label>Дата рождения
              <input className="about-input" value={form.birth} onChange={e=>setForm(f=>({...f, birth:e.target.value}))} />
            </label>
          </div>
          <div className="about-addresses-title-row">
            <div className="about-addresses-title">Мои адреса</div>
            <div className="about-addresses-add" onClick={() => navigate("/new-address")}>+</div>
          </div>
          <div className="about-addresses-list">
            {addresses.map(addr => (
              <div
                key={addr.id}
                className={"about-address-card" + (activeAddr === addr.id ? " active" : "")}
                onClick={()=>setActiveAddr(addr.id)}
              >
                <span className="about-address-icon">🏷️</span>
                <div>
                  <div className="about-address-title-txt">{addr.title}</div>
                  <div className="about-address-desc">{addr.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
} 