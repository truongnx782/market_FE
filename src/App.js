import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import About from'./components/user/About';

import LoginAdmin from './components/admin/Login';
import AdminPost from'./components/admin/Post';
import AdminCategory from'./components/admin/Category';

import LoginUser from './components/user/Login';
import UserPost from'./components/user/Post';
import PostList from'./components/user/PostList';

import Chat from './components/user/Chat'


function App() {
  useAuth(); 

  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/post-list" element={<PostList />} />
      <Route path="/post-list/:categoryId" element={<PostList />} />

      <Route path="/login/user" element={<LoginUser />} />
      <Route path="/post/user/hien-thi" element={<UserPost/>} />
      <Route path="/chat" element={<Chat/>} />

      <Route path="/login/admin" element={<LoginAdmin />} />
      <Route path="/post/admin/hien-thi" element={<AdminPost/>} />
      <Route path="/category/admin/hien-thi" element={<AdminCategory />} />

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
