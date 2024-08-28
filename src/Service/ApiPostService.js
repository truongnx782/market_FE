import fetchWithAuth from '../hooks/fetchWithAuth';
const ApiPostService={
    async searchByUid(page, size, search, status) {
        try {
          const response = await fetchWithAuth('http://localhost:8888/market_trade/post/search-by-uid', {
            method: 'POST',
            body: JSON.stringify({ page, size, search, status }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed';
            throw new Error(errorMessage);
          }
          return response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },

      async searchPostList(page, size, search) {
        try {
          const response = await fetchWithAuth('http://localhost:8888/market_trade/post/search', {
            method: 'POST',
            body: JSON.stringify({ page, size, search }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed';
            throw new Error(errorMessage);
          }
          return response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },

      async search(page, size, search, statusPost) {
        try {
          const response = await fetchWithAuth('http://localhost:8888/market_trade/post/admin/search', {
            method: 'POST',
            body: JSON.stringify({ page, size, search, statusPost }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed';
            throw new Error(errorMessage);
          }
          return response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },

      async getAll() {
        try {
          const response = await fetch('http://localhost:8888/market_trade/post/getAll', {
            method: 'GET',
            });
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed';
            throw new Error(errorMessage);
          }
          return response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },

      async getById(id) {
        try {
          const response = await fetchWithAuth(`http://localhost:8888/market_trade/post/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed';
            throw new Error(errorMessage);
          }
          return response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },

      async create(values) {
        try {
          const response = await fetchWithAuth(`http://localhost:8888/market_trade/post/create`, {
            method: 'POST',
            body: JSON.stringify(values),
          });
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed';
            throw new Error(errorMessage);
          }
          return response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },

      async update(id, values) {
        try {
          const response = await fetchWithAuth(`http://localhost:8888/market_trade/post/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed';
            throw new Error(errorMessage);
          }
          return response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },

      async delete(id) {
        try {
          const response = await fetchWithAuth(`http://localhost:8888/market_trade/post/delete/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed';
            throw new Error(errorMessage);
          }
          return response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },
      
      async restore(id) {
        try {
          const response = await fetchWithAuth(`http://localhost:8888/market_trade/post/restore/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed';
            throw new Error(errorMessage);
          }
          return response.json();
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      },

      async updatePostStatus(id, checked) {
        try {
            const response = await fetchWithAuth(`http://localhost:8888/market_trade/post/admin/change-status-post`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, checked }),
            });
            if (!response.ok) {
              const errorData = await response.json();
              const errorMessage = errorData.message || 'Failed';
              throw new Error(errorMessage);
          }
            return response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

export default ApiPostService;
