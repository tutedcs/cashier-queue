# Sistema de Gestión de Cajas

<h1 align="center">
  <br>
  <img src="https://avatars.githubusercontent.com/u/186534649?v=4" alt="Logo de tu empresa" width="200">
  <br>
  Sistema de Gestión de Cajas
  <br>
</h1>

<h4 align="center">Aplicación web para la gestión y visualización de cajas disponibles para atención al cliente en tiempo real.</h4>

<p align="center">
  <a href="#características">Características</a> •
  <a href="#estructura-del-proyecto">Estructura</a> •
  <a href="#instalación">Instalación</a> •
  <a href="#uso">Uso</a> •
  <a href="#configuración">Configuración</a> •
  <a href="#solución-de-problemas">Solución de Problemas</a>
</p>

## Características

* **Gestión de cajas en tiempo real**
  - Panel de control para que los cajeros indiquen su disponibilidad
  - Pantalla para clientes que muestra la caja disponible
  - Actualización instantánea cuando un cajero cambia su estado
  - Interfaz intuitiva y visual para cajeros y clientes

* **Diseño intuitivo**
  - Código de colores que indica claramente el estado de las cajas
  - Animaciones sutiles para destacar la caja disponible
  - Diseño responsivo que se adapta a diferentes dispositivos
  - Navegación simple entre vistas

* **Implementación sencilla**
  - Solución basada en tecnologías web estándar (HTML, CSS, JavaScript)
  - No requiere bases de datos ni conexiones externas
  - Funciona en cualquier navegador moderno
  - Fácil de desplegar en una red local

* **Características visuales**
  - Paleta de colores personalizable según la identidad de marca
  - Animaciones para llamar la atención sobre la información importante
  - Diseño limpio y profesional
  - Mensajes de estado claros

## Estructura del Proyecto

```
sistema-gestion-cajas/
├── index.html             # Estructura HTML principal
├── styles.css             # Estilos y diseño visual
├── script.js              # Lógica y funcionalidad
└── README.md              # Documentación del proyecto
```

## Instalación

### Requisitos:

- Cualquier navegador web moderno
- Servidor web local (opcional para pruebas)

```bash
# Clonar el repositorio o descargar los archivos
$ git clone https://tu-repositorio/sistema-gestion-cajas.git
$ cd sistema-gestion-cajas

# O simplemente crea una carpeta y coloca los archivos
$ mkdir sistema-gestion-cajas
$ cd sistema-gestion-cajas
# Coloca index.html, styles.css y script.js en esta carpeta
```

## Uso

### Ejecución local simple:

```bash
# Simplemente abre el archivo index.html en un navegador
$ open index.html    # En macOS
$ xdg-open index.html    # En Linux
# O doble clic en el archivo index.html en Windows
```

### Ejecución con servidor local:

#### Usando Python:

```bash
# Con Python 3
$ python -m http.server 8000

# Con Python 2
$ python -m SimpleHTTPServer 8000
```

#### Usando Node.js:

```bash
# Instalar servidor http simple
$ npm install -g http-server

# Iniciar servidor
$ http-server
```

### Acceso desde otros dispositivos:

Para probar la función de "panel de cajero" y "pantalla de clientes" en diferentes dispositivos:

1. Averigua la dirección IP de tu computadora (usando `ipconfig` en Windows o `ifconfig` en Mac/Linux)
2. En otro dispositivo conectado a la misma red, visita `http://[TU_IP]:8000`

## Configuración

### Personalización de la interfaz:

Para personalizar la apariencia, puedes modificar el archivo `styles.css`:

```css
/* Cambiar colores principales */
header {
    background-color: #YOUR_COLOR_HERE;  /* Color del encabezado */
}

.toggle-btn {
    background-color: #YOUR_COLOR_HERE;  /* Color de los botones */
}

/* Personalizar la apariencia de las cajas */
.box.available {
    background-color: #YOUR_COLOR_HERE;  /* Color de la caja disponible */
}
```

### Modificación del número de cajas:

Para cambiar el número de cajas disponibles, edita el archivo `index.html` y añade o elimina elementos de caja, y actualiza el objeto `cashiers` en `script.js`:

```javascript
// En script.js
const cashiers = {
    1: { available: false },
    2: { available: false },
    3: { available: false },
    4: { available: false },
    5: { available: false },  // Añade más cajas según sea necesario
};
```

## Solución de Problemas

### Los cambios de estado no se reflejan en la pantalla

Verifica que ambas pestañas (panel de control y pantalla de clientes) estén abiertas en la misma sesión del navegador. Si estás usando dispositivos separados, asegúrate de que estén conectados a la misma red y utiliza el modo servidor.

### La aplicación no funciona en Internet Explorer

Esta aplicación está diseñada para navegadores modernos. Recomendamos utilizar Chrome, Firefox, Safari o Edge para una experiencia óptima.

### Problemas de visualización en dispositivos móviles

Si experimentas problemas de visualización en dispositivos móviles, verifica que la meta etiqueta de viewport esté correctamente configurada en el archivo `index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

<p align="center">
  © 2025 Tu Empresa - Desarrollado para proporcionar una gestión eficiente de cajas y mejorar la experiencia del cliente en establecimientos comerciales.
</p>