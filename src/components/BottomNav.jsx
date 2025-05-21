import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.66667V22H22V8.66667L12 2L2 8.66667Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            <mask id="path-2-outside-1_36_4416" maskUnits="userSpaceOnUse" x="8" y="12" width="8" height="11" fill="black">
              <rect fill="white" x="8" y="12" width="8" height="11"/>
              <path d="M10 14H14V21H10V14Z"/>
            </mask>
            <path d="M10 14V12.3C9.06112 12.3 8.3 13.0611 8.3 14H10ZM14 14H15.7C15.7 13.0611 14.9389 12.3 14 12.3V14ZM14 21V22.7H15.7V21H14ZM10 21H8.3V22.7H10V21ZM10 14V15.7H14V14V12.3H10V14ZM14 14H12.3V21H14H15.7V14H14ZM14 21V19.3H10V21V22.7H14V21ZM10 21H11.7V14H10H8.3V21H10Z" fill="currentColor" mask="url(#path-2-outside-1_36_4416)"/>
          </svg>
        </div>
      </Link>
      <Link to="/menu" className={`nav-item ${location.pathname === '/menu' ? 'active' : ''}`}>
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.77778 2H2V9.77778H9.77778V2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
            <path d="M9.77778 14.2223H2V22.0001H9.77778V14.2223Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
            <path d="M22 14.2222H14.2222V22H22V14.2222Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
            <path d="M22 2H14.2222V9.77778H22V2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
      <Link to="/reserve" className={`nav-item ${location.pathname === '/reserve' ? 'active' : ''}`}>
        <div className="nav-icon">
          <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10.4448H22L22 22.8521C22 23.4861 21.5287 24 20.9473 24H3.05263C2.47128 24 2 23.4861 2 22.8521V10.4448Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
            <path d="M2 5.30001C2 4.6925 2.47128 4.20001 3.05263 4.20001H20.9473C21.5287 4.20001 22 4.6925 22 5.30001V10.4449H2L2 5.30001Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
            <path d="M7.09805 2V6.58333" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.9019 2V6.58333" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.04898 14.6041H17.6372" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.04898 18.9583H17.6372" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
      <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10.8889C14.4546 10.8889 16.4444 8.89905 16.4444 6.44444C16.4444 3.98985 14.4546 2 12 2C9.54538 2 7.55554 3.98985 7.55554 6.44444C7.55554 8.89905 9.54538 10.8889 12 10.8889Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 21.3333V22H22V21.3333C22 18.8442 22 17.5997 21.5156 16.649C21.0895 15.8127 20.4096 15.1327 19.5733 14.7066C18.6226 14.2222 17.378 14.2222 14.8889 14.2222H9.11111C6.622 14.2222 5.37744 14.2222 4.42672 14.7066C3.59043 15.1327 2.91052 15.8127 2.48442 16.649C2 17.5997 2 18.8442 2 21.3333Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
    </nav>
  );
};

export default BottomNav; 