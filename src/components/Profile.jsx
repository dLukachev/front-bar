import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import "./Profile.css";

export default function Profile() {
  // Заглушка данных пользователя
  const user = {
    name: "Арсений",
    username: "powerdist",
    level: 7,
    quails: 350,
    nextLevel: 1200,
    promo: "GGZWK"
  };
  const [darkTheme, setDarkTheme] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={"profile-page" + (darkTheme ? " dark" : "") }>
      <div className="profile-header-bg" />
      <div className="profile-header">
        <div className="profile-avatar">
          <span role="img" aria-label="avatar">👤</span>
        </div>
        <div className="profile-name">{user.name}</div>
        <div className="profile-username">@{user.username}</div>
      </div>
      {/* Промокод */}
      <div style={{margin: '0 16px 10px 16px', background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0cfc033', padding: 12, textAlign: 'center'}}>
        <div style={{fontSize: 15, color: '#b08a5a', fontWeight: 600, marginBottom: 4}}>Промокод для друга:</div>
        <div style={{display: 'inline-flex', alignItems: 'center', background: '#f3e5d8', borderRadius: 8, padding: '2px 10px', fontWeight: 700, fontSize: 18, color: '#6d4c2b', letterSpacing: 2}}>{user.promo}</div>
        <div style={{fontSize: 13, color: '#b08a5a', marginTop: 6}}>Получай 150 бонусов за каждого приглашенного</div>
      </div>
      <div className="profile-level-block">
        <span className="profile-level">{user.level} уровень</span>
        <span className="profile-quails">{user.quails}/{user.nextLevel} перепелок</span>
        <div className="profile-progress-bar">
          <div className="profile-progress" style={{width: `${(user.quails/user.nextLevel)*100}%`}} />
        </div>
      </div>
      <div className="profile-menu-list">
        <div className="profile-menu-item">
          <span className="profile-menu-icon">ℹ️</span>
          <span className="profile-menu-label">Достижения</span>
          <span className="profile-menu-arrow">›</span>
        </div>
        <div className="profile-menu-item" onClick={()=>navigate('/profile/about')} style={{cursor:'pointer'}}>
          <span className="profile-menu-icon">👤</span>
          <span className="profile-menu-label">Обо мне</span>
          <span className="profile-menu-arrow">›</span>
        </div>
        <div className="profile-menu-item" onClick={()=>navigate('/profile/payments')} style={{cursor:'pointer'}}>
          <span className="profile-menu-icon">💳</span>
          <span className="profile-menu-label">Способы оплаты</span>
          <span className="profile-menu-arrow">›</span>
        </div>
        <div className="profile-menu-item">
          <span className="profile-menu-icon">📦</span>
          <span className="profile-menu-label">История заказов</span>
          <span className="profile-menu-arrow">›</span>
        </div>
        <div className="profile-menu-item" style={{opacity:0.5, cursor:'default'}}>
          <span className="profile-menu-icon">🛟</span>
          <span className="profile-menu-label">Поддержка</span>
        </div>
      </div>
      <div className="profile-theme-toggle">
        <span className="profile-theme-label">Темная тема</span>
        <label className="switch">
          <input type="checkbox" checked={darkTheme} onChange={()=>setDarkTheme(v=>!v)} />
          <span className="slider round"></span>
        </label>
      </div>
      <BottomNav />
    </div>
  );
} 