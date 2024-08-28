const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'uid': localStorage.getItem('uid'),
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  return response;
};

export default fetchWithAuth;


