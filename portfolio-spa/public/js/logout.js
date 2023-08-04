export const logout = async () => {
  const preloader = document.querySelector('#preloader');
  preloader.style.display = 'block';

  try {
    sessionStorage.removeItem('jwt');
    const adminPage = document.querySelector('#log-out');
    adminPage.style.display = 'none';

    const usersPage = document.querySelector('#admin-login-page');
    usersPage.style.display = 'block';
  } finally {
    preloader.style.display = 'none';
  }
}
