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
    const generarFacturaBtn = document.getElementById("generarFactura");

    // Definir el inventario inicial
    let inventario = {
        "1": 10, // Hogwarts Legacy
        "2": 10, // Ghost
        "3": 10, // Mortal Kombat
        "4": 10, // Stray
        "5": 10, // SilentHill 2
        "6": 10, // FC2025
        "7": 10, // Resident Evil 4
        "8": 10, // Spiderman 2
        "9": 10, // Call Of Duty Black Ops 2
        "10": 10 // Wukong
    };

    // Manejadores para incrementar y decrementar la cantidad
    document.querySelectorAll(".sumar").forEach(btn => {
        btn.addEventListener("click", e => {
            const span = e.target.parentElement.querySelector(".cantidad");
            let currentQuantity = parseInt(span.textContent);
            const id = e.target.closest(".producto").querySelector(".agregar").getAttribute("data-id");
            if (inventario[id] > currentQuantity) {
                currentQuantity++;
                span.textContent = currentQuantity;
            } else {
                Swal.fire({
                    title: 'Inventario Insuficiente',
                    text: 'No hay suficiente stock disponible.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            }
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

    // Botón para abrir el modal del carrito
    verCarritoBtn.addEventListener("click", () => {
        let carritoHTML = carrito.map(producto => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ccc;">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-pequena" style="width: 50px; height: 50px;">
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ccc;">${producto.nombre}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ccc;">$${producto.precio}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ccc;">
                    <div class="cantidad-control" style="display: flex; align-items: center; justify-content: center;">
                        <button class="disminuir btn btn-sm btn-outline-secondary" data-id="${producto.id}">-</button>
                        <span class="cantidad" style="margin: 0 10px;">${producto.cantidad}</span>
                        <button class="aumentar btn btn-sm btn-outline-secondary" data-id="${producto.id}">+</button>
                    </div>
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ccc;">
                    <button class="eliminar btn btn-sm btn-danger" data-id="${producto.id}" title="Eliminar">X</button>
                </td>
            </tr>
        `).join("");

        let totalGeneral = carrito.reduce((acc, prod) => acc + prod.total, 0);

        if (carrito.length === 0) {
            Swal.fire({
                title: 'Carrito Vacío',
                text: 'No hay productos en el carrito para generar una factura.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: 'Carrito de Compras',
                html: `
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <thead>
                            <tr>
                                <th style="border-bottom: 1px solid #ccc; padding: 10px;">Imagen</th>
                                <th style="border-bottom: 1px solid #ccc; padding: 10px;">Nombre</th>
                                <th style="border-bottom: 1px solid #ccc; padding: 10px;">Precio Unitario</th>
                                <th style="border-bottom: 1px solid #ccc; padding: 10px;">Cantidad</th>
                                <th style="border-bottom: 1px solid #ccc; padding: 10px;">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${carritoHTML}
                        </tbody>
                    </table>
                    <h3 style="margin-top: 20px;">Total: $${totalGeneral}</h3>
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Generar Factura',
                cancelButtonText: 'Seguir Comprando',
                width: '700px'
            }).then((result) => {
                if (result.isConfirmed) {
                    generarFactura();
                }
            });
        }

        // Botones de eliminar para cada producto dentro del SweetAlert
        document.querySelectorAll(".eliminar").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = event.currentTarget.getAttribute("data-id");
                Swal.fire({
                    title: '¿Está seguro?',
                    text: 'Desea eliminar este producto del carrito.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const producto = carrito.find(item => item.id === id);
                        inventario[id] += producto.cantidad; // Devolver la cantidad al inventario
                        carrito = carrito.filter(item => item.id !== id);
                        actualizarCarrito();
                        verCarritoBtn.click(); // Reabrir el modal para actualizar la vista
                    }
                });
            });
        });

        // Botones de disminuir cantidad para cada producto dentro del SweetAlert
        document.querySelectorAll(".disminuir").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");
                let producto = carrito.find(item => item.id === id);
                if (producto && producto.cantidad > 1) {
                    producto.cantidad--;
                    inventario[id]++;
                    actualizarCarrito();
                    verCarritoBtn.click(); // Reabrir el modal para actualizar la vista
                }
            });
        });

        // Botones de aumentar cantidad para cada producto dentro del SweetAlert
        document.querySelectorAll(".aumentar").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");
                let producto = carrito.find(item => item.id === id);
                if (producto && inventario[id] > 0) {
                    producto.cantidad++;
                    inventario[id]--; // Restar una unidad del inventario
                    actualizarCarrito();
                    verCarritoBtn.click(); // Reabrir el modal para actualizar la vista
                } else {
                    Swal.fire({
                        title: 'Inventario Insuficiente',
                        text: 'No hay suficiente stock disponible.',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        });
    });

    // Función para actualizar el carrito en pantalla
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

        // Botones de eliminar para cada producto
        document.querySelectorAll(".eliminar").forEach(btn => {
            btn.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");
                const producto = carrito.find(item => item.id === id);
                inventario[id] += producto.cantidad; // Devolver la cantidad al inventario
                carrito = carrito.filter(item => item.id !== id);
                actualizarCarrito();
            });
        });
    }

    // Agregar producto al carrito con confirmación de SweetAlert
    document.querySelectorAll(".agregar").forEach(button => {
        button.addEventListener("click", (event) => {
            const productoDiv = event.target.closest(".producto");
            const id = event.target.getAttribute("data-id");
            const precio = parseFloat(event.target.getAttribute("data-precio"));
            const nombre = productoDiv.querySelector("img").alt;
            const cantidad = parseInt(productoDiv.querySelector(".cantidad").textContent);

            if (inventario[id] >= cantidad) {
                Swal.fire({
                    title: '¿Está seguro?',
                    text: `Desea agregar ${cantidad} de ${nombre} al carrito.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, agregar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let producto = carrito.find(item => item.id === id);
                        if (producto) {
                            producto.cantidad += cantidad;
                        } else {
                            const imagen = productoDiv.querySelector("img").src;
                            carrito.push({ id, nombre, cantidad, precio, imagen, total: cantidad * precio });
                        }
                        inventario[id] -= cantidad; // Restar la cantidad del inventario
                        actualizarCarrito();
                        Swal.fire(
                            'Agregado!',
                            `${cantidad} de ${nombre} ha sido agregado al carrito.`,
                            'success'
                        );
                    }
                });
            } else {
                Swal.fire({
                    title: 'Inventario Insuficiente',
                    text: 'No hay suficiente stock disponible.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });

    // Acá procede a generarse la factura.
    function generarFactura() {
        Swal.fire({
            title: '¿Desea generar la factura?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, generar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const facturaDetalles = carrito.map(producto =>
                    `<p>${producto.nombre} - ${producto.cantidad} x $${producto.precio} = $${producto.total}</p>`
                ).join("");

                const total = carrito.reduce((acc, prod) => acc + prod.total, 0);
                const totalFactura = `<h3>Total a Pagar: $${total}</h3>`;

                Swal.fire({
                    title: 'Factura Generada',
                    html: `${facturaDetalles}${totalFactura}`,
                    icon: 'success',
                    confirmButtonText: 'Ir a Pagar'
                }).then(() => {
                    Swal.fire({
                        title: 'Seleccione el método de pago',
                        input: 'radio',
                        inputOptions: {
                            'tarjeta': 'Tarjeta de Crédito/Débito',
                            'cripto': 'Criptomonedas'
                        },
                        inputValidator: (value) => {
                            if (!value) {
                                return 'Debe seleccionar un método de pago';
                            }
                        }
                    }).then((result) => {
                        if (result.value) {
                            if (result.value === 'tarjeta') {
                                Swal.fire({
                                    title: 'Pago con Tarjeta',
                                    html: `
                                        <form id="formTarjeta" style="display: flex; flex-direction: column; gap: 10px;">
                                            <input type="text" id="numeroTarjeta" placeholder="Número de Tarjeta" required style="padding: 10px; border-radius: 5px; border: 1px solid #ccc;"><br>
                                            <input type="text" id="nombreTarjeta" placeholder="Nombre en la Tarjeta" required style="padding: 10px; border-radius: 5px; border: 1px solid #ccc;"><br>
                                            <input type="month" id="fechaExpiracion" placeholder="Fecha de Expiración" required style="padding: 10px; border-radius: 5px; border: 1px solid #ccc;"><br>
                                            <input type="text" id="cvv" placeholder="CVV" required style="padding: 10px; border-radius: 5px; border: 1px solid #ccc;"><br>
                                            <button type="submit" style="padding: 10px; border-radius: 5px; border: none; background-color: #4CAF50; color: white;">Pagar</button>
                                        </form>
                                    `,
                                    showCancelButton: true,
                                    showConfirmButton: false
                                });

                                document.getElementById("formTarjeta").addEventListener("submit", (e) => {
                                    e.preventDefault();
                                    // Aquí puedes integrar una API de pago con tarjeta
                                    Swal.fire('Pago realizado con éxito', 'Gracias por su compra', 'success');
                                    carrito = [];
                                    actualizarCarrito();
                                    modalPago.classList.remove("show");
                                });
                            } else if (result.value === 'cripto') {
                                Swal.fire({
                                    title: 'Pago con Bitcoin u otra Criptomoneda',
                                    html: `
                                        <form id="formCripto" style="display: flex; flex-direction: column; gap: 10px;">
                                            <input type="text" id="direccionCripto" placeholder="Dirección de Billetera" required style="padding: 10px; border-radius: 5px; border: 1px solid #ccc;"><br>
                                            <button type="submit" style="padding: 10px; border-radius: 5px; border: none; background-color: #4CAF50; color: white;">Pagar</button>
                                        </form>
                                    `,
                                    showCancelButton: true,
                                    showConfirmButton: false
                                });

                                document.getElementById("formCripto").addEventListener("submit", (e) => {
                                    e.preventDefault();
                                    // Aquí puedes integrar una API de pago con criptomonedas
                                    Swal.fire('Pago realizado con éxito', 'Gracias por su compra', 'success');
                                    carrito = [];
                                    actualizarCarrito();
                                    modalPago.classList.remove("show");
                                });
                            }
                        }
                    });
                });
            }
        });
    }

    document.getElementById("generarFactura").addEventListener("click", generarFactura);


});
