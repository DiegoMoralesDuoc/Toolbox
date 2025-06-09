//JS PARA QUE LAS PÁGINAS SOLO CARGUEN SI ESTAN CON SESIÓN INICIADA
document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  if (isLoggedIn !== 'true') {
    alert('Debes iniciar sesión para acceder a esta página');
    window.location.href = 'index.html';
    return;
  }
  //Rol de admin
  if (document.body.classList.contains('admin-only') && currentUser.role !== 'admin') {
    alert('No tienes permisos para ver esta página');
    window.location.href = 'dashboard.html';
  }

  //Rol de jefatura
  if (document.body.classList.contains('jefatura-only') && currentUser.role !== 'jefatura') {
    alert('No tienes permisos para ver esta página');
    window.location.href = 'dashboard.html';
  }  

});
