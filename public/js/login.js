export const login = async (email, password) => {
  const preloader = document.querySelector('#preloader');
  try {
    const response = await fetch('https://intense-ravine-84337-b26da14fff11.herokuapp.com/admins/login', {
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
