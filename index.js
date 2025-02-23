document.addEventListener("DOMContentLoaded", () => {
    let carrito = [];
    const carritoContainer = document.getElementById("carrito");
    const totalContainer = document.getElementById("total");
    const modalCarrito = document.getElementById("modalCarrito");
    const modalFactura = document.getElementById("modalFactura");
    const modalPago = document.getElementById("modal-pago");
    const facturaContenido = document.getElementById("facturaContenido");
    const totalFactura = document.getElementById("totalFactura");
    const verCarritoBtn = document.getElementById("verCarrito");

    // Incremento y decremento de cantidad
    document.querySelectorAll(".sumar").forEach(btn => {
        btn.addEventListener("click", e => {
            const span = e.target.parentElement.querySelector(".cantidad");
            let currentQuantity = parseInt(span.textContent);
            currentQuantity++;
            span.textContent = currentQuantity;
        });
    });

    document.querySelectorAll(".restar").forEach(btn => {
        btn.addEventListener("click", e => {
            const span = e.target.parentElement.querySelector(".cantidad");
            let currentQuantity = parseInt(span.textContent);
            if (currentQuantity > 1) {
                currentQuantity--;
                span.textContent = currentQuantity;
            }
        });
    });

    //Abrir carrito
    verCarritoBtn.addEventListener("click", () => {
        modalCarrito.classList.add("show");
    });

    // Actualizar carrito
    function actualizarCarrito() {
        carritoContainer.innerHTML = "";
        let totalGeneral = 0;

        carrito.forEach(producto => {
            producto.total = producto.cantidad * producto.precio;
            const div = document.createElement("div");
            div.innerHTML = `
                <p>${producto.nombre} - Cantidad: ${producto.cantidad} - $${producto.precio} c/u - Total: $${producto.total}</p>
                <button class="eliminar" data-id="${producto.id}">Eliminar</button>
            `;
            carritoContainer.appendChild(div);
            totalGeneral += producto.total;
        });

        totalContainer.innerHTML = `<h3>Total: $${totalGeneral}</h3>`;

        // Eliminar cada producto (Botones)
        document.querySelectorAll(".eliminar").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");
                carrito = carrito.filter(item => item.id !== id);
                actualizarCarrito();
            });
        });
    }

    // Agregar producto al carrito
    document.querySelectorAll(".agregar").forEach(button => {
        button.addEventListener("click", (event) => {
            const productoDiv = event.target.closest(".producto");
            const id = event.target.getAttribute("data-id");
            const precio = parseFloat(event.target.getAttribute("data-precio"));
            const nombre = productoDiv.querySelector("img").alt;
            const cantidad = parseInt(productoDiv.querySelector(".cantidad").textContent);

            let producto = carrito.find(item => item.id === id);
            if (producto) {
                producto.cantidad += cantidad;
            } else {
                carrito.push({ id, nombre, cantidad, precio, total: cantidad * precio });
            }
            actualizarCarrito();
        });
    });

    // Acá procede a generarse la factura.
    document.getElementById("generarFactura").addEventListener("click", () => {
        facturaContenido.innerHTML = carrito.map(producto =>
            `<p>${producto.nombre} - ${producto.cantidad} x $${producto.precio} = $${producto.total}</p>`
        ).join("");

        const total = carrito.reduce((acc, prod) => acc + prod.total, 0);
        totalFactura.innerHTML = `<h3>Total a Pagar: $${total}</h3>`;
        modalFactura.classList.add("show");
    });

    // Cierre de modales.
    document.querySelectorAll(".close").forEach(btn => {
        btn.addEventListener("click", () => {
            modalCarrito.classList.remove("show");
            modalFactura.classList.remove("show");
            modalPago.classList.remove("show");
        });
    });

    // Se abre el modal de pago
    document.getElementById("generarPago").addEventListener("click", () => {
        modalFactura.classList.remove("show");
        modalPago.classList.add("show");

        // Mostrar total 
        const total = carrito.reduce((acc, prod) => acc + prod.total, 0);
        document.getElementById("total-pago").textContent = total;
    });

    // Evento de pago 
    const formPago = document.getElementById("formPago");
    formPago.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Compra realizada con éxito. ¡Gracias por su compra!");
        carrito = [];
        actualizarCarrito();
        modalPago.classList.remove("show");
    });

    // Botón cancelar en el formulario de pago
    document.getElementById("cancelar").addEventListener("click", () => {
        modalPago.classList.remove("show");
    });
});
