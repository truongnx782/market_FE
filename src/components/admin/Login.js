import React, { useEffect } from 'react';
import {Input, Button, Form, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import ApiService from './../../Service/ApiAuthService'

const { Title } = Typography;

const App = () => {
  const [loginForm] = Form.useForm();  
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await ApiService.checkToken();

        if (!response.ok) {
          const refreshResponse = await ApiService.refreshToken();
          if (refreshResponse.ok) {
            const uid = response.headers.get('uid') || 'uid not found';
            const token = response.headers.get('token') || 'Token not found';

            localStorage.setItem('uid', uid);
            localStorage.setItem('token', token);
             navigate('/post/admin/hien-thi');
          } else {
            console.error('Refresh token failed:', await refreshResponse.text());
            navigate('/login/admin');
          }
        } else {
          const data = await response.json();
          if (data) {
            navigate('/post/admin/hien-thi');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        // message.error(`Lỗi: ${error.message}`);
      }
    };

    checkToken();
  }, [navigate]);

  const handleLogin = async () => {
    const values = loginForm.getFieldsValue();

    try {
      const response = await ApiService.login(values)
      if (response.ok) {
        const uid = response.headers.get('uid') || 'uid not found';
        const token = response.headers.get('token') || 'Token not found';

        localStorage.setItem('uid', uid);
        localStorage.setItem('token', token);

        message.success('Đăng nhập thành công!');
        navigate('/post/admin/hien-thi');
      } else {
        const errorData = await response.json();
        message.error('Đăng nhập thất bại!');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error(`Lỗi: ${error.message}`);
    }
  };


  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <Title level={2} style={{ textAlign: 'center' }}>Chào mừng Admin</Title>

          <Form form={loginForm} onFinish={handleLogin}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
      
    </div>
  );
};

export default App;
