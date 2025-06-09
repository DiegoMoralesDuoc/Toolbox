document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla-usuarios");
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const renderTabla = () => {
    tabla.innerHTML = ""; // Limpiar tabla antes de volver a renderizar

    usuarios.forEach((usuario, index) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${usuario.name}</td>
        <td>${usuario.email}</td>
        <td>${usuario.role}</td>
        <td>
          ${
            usuario.email !== currentUser.email
              ? `<button class="btn btn-sm btn-danger" data-index="${index}">Eliminar</button>`
              : `<span class="text-muted">No disponible</span>`
          }
        </td>
      `;

      tabla.appendChild(fila);
    });

    // Agregar eventos a botones de eliminar
    document.querySelectorAll("button.btn-danger").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const usuarioAEliminar = usuarios[index];
        const confirmar = confirm(`¿Seguro que deseas eliminar a ${usuarioAEliminar.name}?`);

        if (confirmar) {
          usuarios.splice(index, 1);
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          renderTabla(); // Volver a renderizar la tabla
        }
      });
    });
  };

  renderTabla();
});
