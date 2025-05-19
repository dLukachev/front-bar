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
                          <span className="menu-card-price">{Math.round(item.price)} ₽</span>
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
