import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode }from 'jwt-decode';
const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // navigate('/login/user');
          return;
        }

        const decodedToken = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        const exp = decodedToken.exp; 

        if (exp - now < 300) {
          const refreshResponse = await fetch('http://localhost:8888/market_auth/auth/refresh-token', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (refreshResponse.ok) {
            const uid = refreshResponse.headers.get('uid') || 'uid not found';
            const newToken = refreshResponse.headers.get('token') || 'Token not found';

            localStorage.setItem('uid', uid);
            localStorage.setItem('token', newToken);
          } else {
            console.error('Refresh token failed:', await refreshResponse.text());
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
            navigate('/login/user');
            return;
          }
        }

      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        navigate('/login/user');
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  return isLoading;
};

export default useAuth;
