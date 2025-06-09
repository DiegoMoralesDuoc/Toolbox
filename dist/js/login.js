document.addEventListener('DOMContentLoaded', function () {
  //Crear usuario admin si no existe
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const adminExiste = usuarios.some(user => user.email === 'diego.morales.alfaro@gmail.com');

  if (!adminExiste) {
    const adminDefault = {
      email: 'diego.morales.alfaro@gmail.com',
      name: 'Diego Morales Alfaro',
      password: 'admin',
      role: 'admin'
    };
    usuarios.push(adminDefault);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuario admin creado automáticamente');
  }

  //Login
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const rememberCheckbox = document.getElementById('flexCheckDefault');

  //Autocompletar si se eligió "Recordar"
  const savedEmail = localStorage.getItem('savedEmail');
  const remember = localStorage.getItem('remember');

  if (remember === 'true' && savedEmail) {
    emailInput.value = savedEmail;
    rememberCheckbox.checked = true;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      console.log('Usuarios cargados:', usuarios);
      console.log('Buscando email:', email, 'y password:', password);

      const usuario = usuarios.find(
        (user) => user.email === email && user.password === password
      );

      if (usuario) {
        //Guardar en sessionStorage la sesión
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(usuario));

        //Recordar correo si el checkbox está marcado
        if (rememberCheckbox.checked) {
          localStorage.setItem('savedEmail', email);
          localStorage.setItem('remember', 'true');
        } else {
          localStorage.removeItem('savedEmail');
          localStorage.removeItem('remember');
        }

        alert('Inicio de sesión exitoso');
        window.location.href = 'dashboard.html';
      } else {
        alert('Correo o contraseña incorrectos');
      }
    });
  }
});
