import React from 'react';
import './Admin.css';
import AdminCategoryForm from './AdminCategoryForm';

export default function Admin() {
  const handlePostCategory = () => {
    // Здесь будет логика добавления категории
    console.log('Post category clicked');
  };

  return (
    <div className="admin-container">
      <h1>Админ панель</h1>
      <button 
        className="post-category-btn"
        onClick={handlePostCategory}
      >
        Post category
      </button>
      <AdminCategoryForm />
    </div>
  );
} 