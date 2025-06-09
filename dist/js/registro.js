document.addEventListener('DOMContentLoaded', function () {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'jefatura')) {
    alert('No tienes permiso para registrar usuarios');
    window.location.href = '../dashboard.html';
    return;
  }

  // Función para mostrar alertas
  function mostrarAlerta(mensaje, tipo = 'success') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${tipo} alert-dismissible fade show mt-3`;
    alertContainer.role = 'alert';
    alertContainer.innerHTML = `
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;

    const form = document.querySelector('form');
    form.parentNode.insertBefore(alertContainer, form.nextSibling);

    setTimeout(() => {
      alertContainer.classList.remove("show");
      alertContainer.classList.add("hide");
      alertContainer.addEventListener("transitionend", () => {
        alertContainer.remove();
      });
    }, 5000);
  }

  function registrarUsuario(email, name, password, role) {
    console.log('Intentando registrar usuario:', { email, name, role });

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(user => user.email === email);

    if (usuarioExistente) {
      mostrarAlerta('El usuario ya existe.', 'danger');
      console.log('El usuario ya existe.');
      return false;
    }

    const nuevoUsuario = { email, name, password, role };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mostrarAlerta('Usuario registrado exitosamente.', 'success');
    console.log('Usuario registrado exitosamente:', nuevoUsuario);
    return true;
  }

  const form = document.querySelector('form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rolSelect = document.getElementById('rol');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const role = rolSelect.value;

    if (password.length < 8) {
      mostrarAlerta('La contraseña debe tener al menos 8 caracteres.', 'danger');
      return;
    }

    const exito = registrarUsuario(email, name, password, role);

    if (exito) {
      form.reset(); // Limpia el formulario si fue exitoso
    }
  });
});
