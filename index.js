const express = require('express');
const app = express();

// Middleware para analizar cuerpos de solicitudes JSON
app.use(express.json());

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// GET - Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// POST - Agregar un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// PUT - Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (producto) {
        producto.nombre = req.body.nombre || producto.nombre;
        producto.precio = req.body.precio || producto.precio;
        res.json(producto);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

// DELETE - Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);

    if (index !== -1) {
        const productoEliminado = productos.splice(index, 1);
        res.json(productoEliminado);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
