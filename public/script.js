document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const userJSON = localStorage.getItem('user');

  if (!token || !userJSON) {
    window.location.href = 'index.html';
    return;
  }

  const user = JSON.parse(userJSON);

  renderDashboard(user);
});

function renderDashboard(user) {
  const app = document.getElementById('app');

  // Obtenemos historial de localStorage o creamos uno vacío
  let historial = JSON.parse(localStorage.getItem('historial')) || [];

  app.innerHTML = `
    <header>
      <h1>Bienvenido, ${user.name}</h1>
      <nav>
        <ul>
          <li><a href="#" id="logout">Cerrar Sesión</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section class="dashboard">
        <div class="panel-buttons" style="margin-top: 20px; display: flex; gap: 15px;"></div>

        <!-- Historial de acciones -->
        <div style="margin-top: 30px;">
          <h3>Últimas acciones</h3>
          <ul id="historial-list" style="list-style: none; padding-left: 0;"></ul>
        </div>
      </section>
    </main>
    <footer>
      <p>&copy; 2025 Keny Joyeria. Todos los derechos reservados.</p>
    </footer>
  `;

  // Logout
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });

  // Crear botones según rol
  let botonesHTML = `
    <button id="procesar-venta" style="background-color: #28a745; color: #fff; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: bold;">
      Procesar Venta
    </button>
    <button id="ver-historial" style="background-color: #007bff; color: #fff; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: bold;">
      Ver Historial
    </button>
    <button id="editar-productos" style="background-color: rgb(255, 174, 0); color: #fff; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: bold;">
      Editar Productos
    </button>
  `;

  if (user.rol === 'admin') {
    botonesHTML += `
      <button id="gestionar-usuarios" style="background-color: #6f42c1; color: #fff; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: bold;">
        Gestionar Usuarios
      </button>
    `;
  }

  document.querySelector('.panel-buttons').innerHTML = botonesHTML;

  // Función para actualizar historial en pantalla
  function actualizarHistorial() {
    const lista = document.getElementById('historial-list');
    lista.innerHTML = '';
    historial.slice(-10).reverse().forEach((accion) => {
      const li = document.createElement('li');
      li.textContent = accion;
      li.style.padding = '5px 0';
      lista.appendChild(li);
    });
  }

  // Eventos botones
  document.getElementById('procesar-venta').addEventListener('click', () => {
    alert('Redirigiendo a Procesar Venta...');
    historial.push(`${new Date().toLocaleString()} - Procesó una venta`);
    if (historial.length > 10) historial = historial.slice(-10);
    localStorage.setItem('historial', JSON.stringify(historial));
    actualizarHistorial();
  });

  document.getElementById('ver-historial').addEventListener('click', () => {
    alert('Redirigiendo a Historial...');
    historial.push(`${new Date().toLocaleString()} - Vio historial`);
    if (historial.length > 10) historial = historial.slice(-10);
    localStorage.setItem('historial', JSON.stringify(historial));
    actualizarHistorial();
  });

  document.getElementById('editar-productos').addEventListener('click', () => {
    alert('Redirigiendo a Editar Productos...');
    historial.push(`${new Date().toLocaleString()} - Editó productos`);
    if (historial.length > 10) historial = historial.slice(-10);
    localStorage.setItem('historial', JSON.stringify(historial));
    actualizarHistorial();
  });

  if (user.rol === 'admin') {
    document.getElementById('gestionar-usuarios').addEventListener('click', () => {
      alert('Redirigiendo a Gestionar Usuarios...');
      historial.push(`${new Date().toLocaleString()} - Gestionó usuarios`);
      if (historial.length > 10) historial = historial.slice(-10);
      localStorage.setItem('historial', JSON.stringify(historial));
      actualizarHistorial();
    });
  }

  // Mostrar historial al cargar
  actualizarHistorial();
}
