import React, { useState } from 'react';

const initialState = {
  name: '',
  description: '',
  display_order: 0,
  is_archived: false,
  type: '',
  restaurant_id: 0
};

export default function AdminCategoryForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Обработка изменения инпутов
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'display_order' || name === 'restaurant_id' ? Number(value) : value)
    }));
  };

  // Отправка POST-запроса
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const initData = window.Telegram?.WebApp?.initData || '';
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || ''}/api/v1/menu/categories`, {
        method: 'POST',
        headers: {
          'Telegram-Init-Data': initData,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Ошибка запроса');
      setResult('Категория успешно создана!');
      setForm(initialState);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400}}>
      <input name="name" placeholder="Название" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Описание" value={form.description} onChange={handleChange} />
      <input name="display_order" type="number" placeholder="Порядок отображения" value={form.display_order} onChange={handleChange} />
      <label style={{display:'flex',alignItems:'center',gap:8}}>
        <input name="is_archived" type="checkbox" checked={form.is_archived} onChange={handleChange} />
        Архивировать
      </label>
      <input name="type" placeholder="Тип" value={form.type} onChange={handleChange} />
      <input name="restaurant_id" type="number" placeholder="ID ресторана" value={form.restaurant_id} onChange={handleChange} />
      <button type="submit" disabled={loading} style={{marginTop:8}}>Создать категорию</button>
      {result && <div style={{color:'green'}}>{result}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
} 