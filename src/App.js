import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RoomComponent from './components/Room';
import ServiceComponent from './components/Service';
import UtilityComponent from './components/Utility';
import CustomerComponent from './components/Customer';
import ContractComponent from './components/Contract';
import PaymentComponent from './components/Payment';
import MaintenanceComponent from './components/Maintenance';
import useAuth from './hooks/useAuth';
import About from'./components/user/About';

import LoginAdmin from './components/admin/Login';
import AdminPost from'./components/admin/Post';
import AdminCategory from'./components/admin/Category';

import LoginUser from './components/user/Login';
import UserPost from'./components/user/Post';
import PostList from'./components/user/PostList';




function App() {
  useAuth(); 

  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/post-list" element={<PostList />} />

      <Route path="/login/user" element={<LoginUser />} />
      <Route path="/post/user/hien-thi" element={<UserPost/>} />

      <Route path="/login/admin" element={<LoginAdmin />} />
      <Route path="/post/admin/hien-thi" element={<AdminPost/>} />
      <Route path="/category/admin/hien-thi" element={<AdminCategory />} />

      <Route path="/dich-vu/hien-thi" element={<ServiceComponent />} />
      <Route path="/tien-ich/hien-thi" element={<UtilityComponent />} />
      <Route path="/khach-hang/hien-thi" element={<CustomerComponent />} />
      <Route path="/hop-dong/hien-thi" element={<ContractComponent />} />
      <Route path="/thanh-toan/hien-thi" element={<PaymentComponent />} />
      <Route path="/bao-tri/hien-thi" element={<MaintenanceComponent />} />
      <Route path="*" element={<Navigate to="/login/user" />} />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
