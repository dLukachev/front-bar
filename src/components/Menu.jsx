import React, { useEffect, useState } from "react";
import "./Menu.css";
import BottomNav from "./BottomNav";
import RestaurantSelectModal from "./RestaurantSelectModal";
import { useRestaurant } from "./RestaurantContext";
import MenuItemModal from "./MenuItemModal";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backend-bar.onrender.com/api/v1"; // твой бэкенд

const RESTAURANT_ID = 1; // если у тебя один ресторан, можно захардкодить

const Menu = () => {
  const { selectedRestaurant, setSelectedRestaurant, cart, setCart } = useRestaurant();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deliveryType, setDeliveryType] = useState("delivery"); // "delivery" или "pickup"
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedRestaurant) return;
    // Загрузка категорий и меню по restaurantId
    fetch(`${API_URL}/menu/categories?restaurant_id=${selectedRestaurant.id}&user_id=123456789`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0].id);
      })
      .catch(e => {
        console.error("Ошибка загрузки категорий", e);
        setCategories([]); // Устанавливаем пустой массив при ошибке
      });
    fetch(`${API_URL}/menu/items?restaurant_id=${selectedRestaurant.id}&user_id=123456789`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(e => {
        console.error("Ошибка загрузки позиций", e);
        setItems([]); // Устанавливаем пустой массив при ошибке
        setLoading(false);
      });
  }, [selectedRestaurant]);

  console.log("categories", categories);
  console.log("activeCategory", activeCategory);
  console.log("items", items);

  // Функции для работы с корзиной
  const getItemCount = (itemId) => {
    const found = cart.find((el) => el.id === itemId);
    return found ? found.count : 0;
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((el) => el.id === item.id);
      if (found) {
        return prev.map((el) => el.id === item.id ? { ...el, count: el.count + 1 } : el);
      }
      return [...prev, { ...item, count: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => {
      const found = prev.find((el) => el.id === itemId);
      if (!found) return prev;
      if (found.count === 1) {
        return prev.filter((el) => el.id !== itemId);
      }
      return prev.map((el) => el.id === itemId ? { ...el, count: el.count - 1 } : el);
    });
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  // Автоматически устанавливаем ресторан, если он не выбран
  useEffect(() => {
    if (!selectedRestaurant) {
      setSelectedRestaurant({ id: 1, address: "Основной ресторан" });
    }
  }, [selectedRestaurant, setSelectedRestaurant]);

  return (
    <div className="menu-app">
      {/* Верхняя панель */}
      <div className="top-panel">
        <div className="menu-toggle-wrapper">
          <button
            className={`menu-toggle-btn${deliveryType === "delivery" ? " active" : ""}`}
            onClick={() => setDeliveryType("delivery")}
          >
            Меню
          </button>
          <button
            className={`menu-toggle-btn${deliveryType === "pickup" ? " active" : ""}`}
            onClick={() => setDeliveryType("pickup")}
          >
            Барная карта
          </button>
        </div>
        <div className="address-select" onClick={() => setModalOpen(true)}>
          {selectedRestaurant ? selectedRestaurant.address : "Выбрать адрес ресторана"} <span className="arrow">→</span>
        </div>
      </div>
      <div style={{ height: "1px" }}></div>

      {/* Модальное окно выбора ресторана временно отключено
      <RestaurantSelectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={setSelectedRestaurant}
      /> */}

      {/* Табы категорий */}
      <div className="categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={cat.id === activeCategory ? "active" : ""}
            onClick={() => {
              setActiveCategory(cat.id);
              const element = document.getElementById(`category-${cat.id}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Карточки позиций */}
      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <div className="menu-categories-list">
          {categories.map(category => {
            const categoryItems = items.filter(item => item.category_id === category.id);
            if (categoryItems.length === 0) return null;
            return (
              <div key={category.id} id={`category-${category.id}`} className="menu-category-block">
                <div className="menu-category-title">{category.name}</div>
                <div className="menu-items">
                  {categoryItems.map(item => (
                    <div key={item.id} className="menu-card" onClick={() => handleCardClick(item)} style={{ cursor: 'pointer' }}>
                      <img
                        src={item.name === 'Московский бургер' ? '/MenuImage/mosburgir.jpg' : 
                            item.name === 'Лагман по-крымски' ? '/MenuImage/lagman.jpg' : 
                            item.name === 'Вареники с картофелем и грибами' ? '/MenuImage/varenikikartgrib.jpg' : 
                            item.name === 'Строганов из говядины' ? '/MenuImage/stroganoffgov.jpg' : 
                            item.name === 'Пельмени с щукой и судаком' ? '/MenuImage/pelmenisudak.jpg' : 
                            item.name === 'Пельмени с бараниной и аджикой' ? '/MenuImage/pelmenibaran.jpg' : 
                            (item.image_url || "/no-image.png")}
                        alt={item.name}
                        className="menu-card-img"
                        width={150}
                        height={100}
                      />
                      <div className="menu-card-header">
                        <div className="menu-card-title">{item.name}</div>
                        <div className="menu-card-info">
                          <span className="menu-card-price">{Math.round(item.price)} <svg width="16" height="15" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:'middle',marginLeft:2}}><path d="M6.68259 25.5439V5.087C6.68259 3.82162 6.11945 2.92531 4.99317 2.39807C4.17406 2.08172 3.25256 1.87083 2.12628 1.87083C1.51195 1.87083 1.20478 1.65993 1.20478 1.18541C1.20478 0.76362 1.51195 0.5 2.12628 0.5H18.7645C22.3993 0.5 25.4198 1.34359 27.7747 3.03076C29.9249 4.61248 31 6.45782 31 8.56679C31 10.6757 29.8737 12.4156 27.6724 13.7865C25.215 15.3682 21.7338 16.1591 17.3311 16.1591L15.1809 16.0009L12.8771 15.8427V25.1749C12.8771 26.8093 13.3379 27.9692 14.3618 28.6019C14.9761 29.0237 15.8976 29.2346 17.1263 29.2346L17.9966 29.1292C18.3038 29.1292 18.5085 29.2346 18.7133 29.3401L18.9181 29.8146C18.9181 30.2891 18.6109 30.5 17.9966 30.5H2.12628C1.40956 30.5 1 30.2891 1 29.8146C1.10239 29.6037 1.25597 29.4982 1.35836 29.3928C1.46075 29.2873 1.71672 29.2346 2.12628 29.1292C3.61092 29.1292 4.7372 28.8656 5.50512 28.3383C6.27304 27.8111 6.68259 26.862 6.68259 25.5439ZM12.8771 14.8937H17.9966L18.2014 14.9464C19.942 14.9464 21.3242 14.3137 22.3993 12.9956C23.4744 11.6775 24.0375 10.1485 24.0375 8.35589C24.0375 6.61599 23.5256 5.13972 22.6041 3.92707C21.4778 2.55624 19.942 1.87083 17.9966 1.87083C16.256 1.87083 14.9761 2.08172 14.157 2.45079C13.2867 2.81986 12.8771 3.71617 12.8771 5.13972V14.8937Z" fill="#410C00"/><path d="M29.6732 18.65C28.9494 18.65 28.2257 18.75 27.2607 18.95C26.1751 19.15 25.4514 19.25 24.9689 19.25C24.4864 19.3 23.7627 19.3 22.7977 19.3H22.7977C21.8327 19.3 20.7471 19.3 19.7821 19.2C18.6965 19.15 17.3697 19.05 15.6809 18.85C13.9922 18.7 12.9066 18.6 12.3035 18.55C11.5798 18.55 10.7354 18.5 9.52918 18.5C8.08171 18.6 6.75486 18.7 5.42802 18.9C3.98054 19.1 2.77432 19.35 1.68872 19.75C0.48249 20.1 0 20.5 0 20.9L0.241246 21.05L0.844357 21.15L3.49805 20.8C4.34241 20.6 5.18677 20.5 5.9105 20.5C6.63424 20.5 7.96109 20.6 9.64981 20.8L14.2335 21.35L17.7315 21.5C20.3852 21.5 22.9183 21.3 25.4514 20.8C27.8638 20.3 29.4319 19.85 30.1556 19.4C30.3969 19.4 30.7588 19.25 31 19.05L30.7588 18.9C30.5175 18.85 30.1556 18.75 29.6732 18.65Z" fill="#410C00"/></svg></span>
                          {item.old_price && (
                            <span className="menu-card-oldprice">{item.old_price} ₽</span>
                          )}
                        </div>
                      </div>
                      {getItemCount(item.id) === 0 ? (
                        <button className="add-to-cart-btn" onClick={(e) => {e.stopPropagation(); addToCart(item)}}>В корзину</button>
                      ) : (
                        <div
                          className="cart-count-btn-wrapper"
                          onClick={e => e.stopPropagation()}
                        >
                          <div className="cart-count-btn-border"></div>
                          <div className="cart-count-btn">
                                                        <button className="count-btn minus" onClick={(e) => {e.stopPropagation(); removeFromCart(item.id)}}>
                                <svg width="6" height="2" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.53276 0.166548V2.46591H0.47168V0.166548H8.53276Z" fill="white"/>
                                </svg>
                              </button>
                              <span className="count-value">{getItemCount(item.id)}</span>
                              <button className="count-btn plus" onClick={(e) => {e.stopPropagation(); addToCart(item)}}>
                                <svg width="8" height="8" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.30371 12.8459V0.843039H7.69185V12.8459H5.30371ZM0.500799 8.03409V5.64595H12.5036V8.03409H0.500799Z" fill="white"/>
                                </svg>
                              </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Нижнее меню */}
      <BottomNav />

      {/* Статичная кнопка корзины */}
      {cart.length > 0 && (
        <button
          className="floating-cart-btn"
          style={{
            position: 'fixed',
            width: 91,
            height: 42,
            right: 11,
            bottom: 76,
            background: '#FFFBF7',
            border: '1.5px solid #410C00',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 0
          }}
          onClick={() => navigate('/cart')}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            fontWeight: 'bold',
            fontSize: 22,
            color: '#410C00',
            fontFamily: 'serif'
          }}>
            <span>{cart.reduce((sum, el) => sum + el.count, 0)}</span>
            <span style={{
              display: 'inline-block',
              width: 1,
              height: 24,
              background: '#410C00',
              margin: '0 10px'
            }} />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C6.44772 18 6 18.4477 6 19C6 19.5523 6.44772 20 7 20C7.55228 20 8 19.5523 8 19C8 18.4477 7.55228 18 7 18Z" fill="#410C00"/>
              <path d="M17 18C16.4477 18 16 18.4477 16 19C16 19.5523 16.4477 20 17 20C17.5523 20 18 19.5523 18 19C18 18.4477 17.5523 18 17 18Z" fill="#410C00"/>
              <path d="M7.16 16H17.24C17.904 16 18.464 15.59 18.68 14.97L21.24 8.09C21.432 7.59 21.048 7 20.5 7H6.21L5.27 4.59C5.11 4.21 4.73 4 4.32 4H2V6H3.38L6.6 13.59L5.25 16.03C4.96 16.57 5.36 17.25 5.97 17.25H19V15.25H7.16L7.16 16Z" fill="#410C00"/>
            </svg>
          </div>
        </button>
      )}

      <MenuItemModal
        open={showModal}
        onClose={handleModalClose}
        item={selectedItem}
        count={selectedItem ? getItemCount(selectedItem.id) || 0 : 0}
        onAdd={() => selectedItem && addToCart(selectedItem)}
        onRemove={() => selectedItem && removeFromCart(selectedItem.id)}
        onAddToCart={() => selectedItem && addToCart(selectedItem)}
      />
    </div>
  );
};

export default Menu;
