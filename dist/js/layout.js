document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  // Verificar si estamos en una página protegida
  const isProtectedPage = window.location.pathname.includes("dashboard") || 
                          window.location.pathname.includes("/user/");

  // Redirigir si el usuario no está logueado
  if (isProtectedPage && !user) {
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "index.html"; // Ajusta ruta si es necesario
    return;
  }

  const loadFragment = (id, filePath, callback) => {
    const container = document.getElementById(id);
    if (!container) {
      console.warn(`No se encontró el elemento con id="${id}"`);
      return;
    }

    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.text();
      })
      .then(data => {
        container.innerHTML = data;
        if (typeof callback === "function") callback();
      })
      .catch(error => {
        console.error(`Error al cargar ${filePath}:`, error);
      });
  };

  const currentPath = window.location.pathname;
  const base = currentPath.includes("/user/") ? "../" : "";

  // Cargar Header y asignar eventos una vez que esté en el DOM
  loadFragment("Header", base + "Header.html", () => {
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
        if (confirmar) {
          sessionStorage.clear();
          window.location.href = base + "index.html";
        }
      });
    }

    const nombreBtn = document.getElementById("nombreUsuario");
    if (user && nombreBtn) {
      nombreBtn.textContent = user.name;
    }
  });

  // Cargar Sidebar y mostrar sección de administración si corresponde
  loadFragment("Sidebar", base + "Sidebar.html", () => {
    if (user && (user.role === "admin" || user.role === "jefatura")) {
      const adminSection = document.getElementById("admin-section");
      if (adminSection) {
        adminSection.classList.remove("hidden");
      } else {
        console.warn("No se encontró #admin-section en Sidebar.html");
      }
    }
  });

  loadFragment("Footer", base + "Footer.html");
});

function mostrarAlerta(mensaje, tipo = "info") {
  alert(`${tipo.toUpperCase()}: ${mensaje}`);
}
