import fetchWithAuth from '../hooks/fetchWithAuth';
const apiAuthService = {
    async checkToken() {
        try {
            const response = await fetchWithAuth('http://localhost:8888/market_auth/auth/introspect', {
                body: JSON.stringify({
                    token: localStorage.getItem('token')
                }),
                method: 'POST'
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Failed';
                throw new Error(errorMessage);
            }
            return response
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    async refreshToken() {
        try {
            const response = await fetchWithAuth('http://localhost:8888/market_auth/auth/refresh-token', {
                method: 'POST',
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Failed';
                throw new Error(errorMessage);
            }
            return response
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    async login(values) {
        try {
            const response = await fetch('http://localhost:8888/market_auth/auth/login', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Failed';
                throw new Error(errorMessage);
            }
            return response
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    async register(values) {
        try {
            const response = await fetch('http://localhost:8888/market_auth/auth/register', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Failed';
                throw new Error(errorMessage);
            }
            return response
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    async forgotPassword(values) {
        try {
            const response = await fetch('http://localhost:8888/market_auth/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Failed';
                throw new Error(errorMessage);
            }
            return response
        } catch (error) {
            console.error('Error', error);
            throw error;
        }
    },
    async loginGoogle(sub, picture, name, email) {
        try {
            const response = await fetch('http://localhost:8888/market_auth/auth/login-google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sub, picture, name, email }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Failed';
                throw new Error(errorMessage);
            }
            return response
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
}
export default apiAuthService;