document.addEventListener('DOMContentLoaded', function () {
  const user = JSON.parse(sessionStorage.getItem('currentUser'));

  // Mostrar datos en el cuadro de perfil
  if (user) {
    document.getElementById('perfil-nombre').textContent = user.name;
    document.getElementById('perfil-email').textContent = user.email;
    document.getElementById('perfil-rol').textContent = user.rol;
  }

  // Manejar formulario de actualización
  const formActualizar = document.getElementById('form-actualizar');
  if (formActualizar) {
    formActualizar.addEventListener('submit', function (e) {
      e.preventDefault();

      const nuevoCorreo = document.getElementById('nuevoCorreo').value.trim();
      const nuevaPassword = document.getElementById('nuevaPassword').value;

      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      const index = usuarios.findIndex(u => u.email === user.email);

      if (index !== -1) {
        if (nuevoCorreo) usuarios[index].email = nuevoCorreo;
        if (nuevaPassword) usuarios[index].password = nuevaPassword;

        // Actualizar sessionStorage y localStorage
        sessionStorage.setItem('currentUser', JSON.stringify(usuarios[index]));
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Datos actualizados correctamente.');
        location.reload();
      } else {
        alert('Error: Usuario no encontrado.');
      }
    });
  }
});
