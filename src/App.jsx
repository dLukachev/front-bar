import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Profile from './components/Profile';
import PaymentMethods from './components/PaymentMethods';
import AboutMe from './components/AboutMe';
import NewAddress from './components/NewAddress';
import Reservation from './components/Reservation';
import BottomNav from './components/BottomNav';
import TableSelectPageWrapper from './components/TableSelectPageWrapper';
import Home from './components/Home';
import { RestaurantProvider } from './components/RestaurantContext';
import './components/Menu.css';
import CartPage from './components/CartPage';
import OrderPage from './components/OrderPage';

function App() {
  return (
    <RestaurantProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<CartPage onClose={() => window.history.back()} />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/payments" element={<PaymentMethods />} />
            <Route path="/profile/about" element={<AboutMe />} />
            <Route path="/new-address" element={<NewAddress />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/select-table" element={<TableSelectPageWrapper />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </RestaurantProvider>
  );
}

export default App;
