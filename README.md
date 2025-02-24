# 🎮 Carrito de Compras UDB 🎮

## 🛍️ Descripción
Este proyecto es una aplicación web que simula un carrito de compras para una tienda en línea. Permite a los usuarios agregar productos al carrito, ajustar cantidades, eliminar productos, generar una factura y realizar un pago simulado.

## 🗂️ Archivos Principales
- **`index.html`**: Contiene la estructura HTML de la página.
- **`index.js`**:  Contiene la lógica de JavaScript para manejar el carrito de compras.
- **`index.css`**: Contiene los estilos CSS para la página.

## 📚 Librerías Externas
- **jQuery**: Utilizado para simplificar la manipulación del DOM.
- **SweetAlert2**: Utilizado para mostrar alertas y modales personalizados.

## 🛠️ Funcionalidades Principales

### 🛒 Agregar Productos al Carrito
- Los usuarios pueden agregar productos al carrito con un simple clic en el botón "Agregar al carrito".
- SweetAlert2 nos muestra una confirmación antes de que el producto se agregue.

### 📈 Ajustar Cantidades
- Los usuarios pueden aumentar o disminuir la cantidad de cada producto antes de agregarlo al carrito.

### 🛍️ Ver Carrito
- Los usuarios pueden ver el contenido del carrito haciendo clic en el botón "Ver Carrito".
Se muestra un modal con los productos agregados, sus cantidades, precios y la opción de eliminar productos.

### 🧾 Generar Factura
- Los usuarios pueden generar una factura que muestra el detalle de los productos y el total a pagar.

### 💳 Realizar Pago
- Los usuarios pueden seleccionar un método de pago (tarjeta de crédito/débito o criptomonedas) y completar el proceso de pago simulado.

## ⚙️ Detalles Técnicos

### 📝 HTML
- La estructura HTML está organizada en secciones como el encabezado (header), el contenido principal (main) y el pie de página (footer).
- Se utilizan modales (modal) para mostrar el carrito, la factura y el formulario de pago.

### 🎨 CSS
- Los estilos están enlazados en el archivo index.css y se aplican a los elementos HTML para dar formato a la página.

### 💻 JavaScript
- **Manejo del Carrito**: Se utiliza un array carrito para almacenar los productos agregados.
- **Event Listeners**: Se utilizan para manejar los clics en los botones de agregar, eliminar, aumentar y disminuir cantidades.
- **SweetAlert2**: Se utiliza para mostrar alertas y modales personalizados, como la confirmación de agregar productos, la generación de facturas y el proceso de pago..

---

Esperamos que disfrutes el **Carrito de Compras UDB** 🛍️✨
