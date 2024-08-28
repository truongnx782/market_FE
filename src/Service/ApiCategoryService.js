import fetchWithAuth from '../hooks/fetchWithAuth';

const ApiCategoryService = {
  async getAll() {
    try {
      const response = await fetch('http://localhost:8888/market_trade/category/getAll', {
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
  async search(page, size, search, status) {
    try {
      const response = await fetchWithAuth('http://localhost:8888/market_trade/category/admin/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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


  async getById(id) {
    try {
      const response = await fetchWithAuth(`http://localhost:8888/market_trade/category/admin/${id}`, {
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

  async update(id, formData) {
    try {
      const response = await fetch(`http://localhost:8888/market_trade/category/admin/update/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'uid': localStorage.getItem('uid'),
        },
        body: formData,
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

  async create(formData) {
    try {
      const response = await fetch('http://localhost:8888/market_trade/category/admin/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'uid': localStorage.getItem('uid'),
        },
        body: formData,
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
      const response = await fetchWithAuth(`http://localhost:8888/market_trade/category/admin/delete/${id}`, {
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
      const response = await fetchWithAuth(`http://localhost:8888/market_trade/category/admin/restore/${id}`, {
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

  async upload(formData) {
    try {
      const response = await fetch('http://localhost:8888/market_trade/category/admin/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'uid': localStorage.getItem('uid'),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Failed';
        throw new Error(errorMessage);
      }
      return response.json();
    }
    catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async downloadTemplate() {
    try {
      const response = await fetchWithAuth('http://localhost:8888/market_trade/category/admin/template', {
        method: 'GET',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(` ${errorText}`);
      }
      return response.blob();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async exportData(page, size, search, status) {
    try {
      const response = await fetchWithAuth('http://localhost:8888/market_trade/category/admin/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page, size, search, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Failed';
        throw new Error(errorMessage);
      }
      return response.blob();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

}

export default ApiCategoryService;