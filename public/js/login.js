export const login = async (email, password) => {
  const preloader = document.querySelector('#preloader');
  try {
    const response = await fetch('http://127.0.0.1:3000/admins/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      sessionStorage.setItem('jwt', token);
      
      const adminLoginPage = document.querySelector('.admin-login');
      adminLoginPage.style.display = 'none';
      
      const adminPage = document.querySelector('#admin-only');
      adminPage.style.display = 'block';

    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    } 
  } catch (error) {
    console.error(`Login failed: ${error.message}`);
    alert(`Login failed: ${error.message}`);
  } finally {
    preloader.style.display = 'none';
  }
};
