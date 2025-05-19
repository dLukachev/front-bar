import React from "react";
import { NavLink } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => "nav-item" + (isActive ? " active" : "") }>
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Главная</span>
      </NavLink>
      <NavLink to="/menu" className={({ isActive }) => "nav-item" + (isActive ? " active" : "") }>
        <span className="nav-icon">🍣</span>
        <span className="nav-label">Меню</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => "nav-item center-profile" + (isActive ? " active" : "") }>
        <span className="nav-icon">👤</span>
        <span className="nav-label">Профиль</span>
      </NavLink>
      <NavLink to="/reservation" className={({ isActive }) => "nav-item" + (isActive ? " active" : "") }>
        <span className="nav-icon">📅</span>
        <span className="nav-label">Резерв</span>
      </NavLink>
    </nav>
  );
} 