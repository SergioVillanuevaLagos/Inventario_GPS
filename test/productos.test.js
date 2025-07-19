const request = require('supertest');
const app = require('../app'); // Ajusta ruta a tu app.js que exporta la app express

describe('API Productos', () => {
    let createdProductId;

    it('GET /api/productos debería devolver lista', async () => {
        const res = await request(app).get('/api/productos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /api/productos debería crear un producto', async () => {
        const newProduct = {
            name: 'Producto Test',
            description: 'Descripción Test',
            price: 100
        };
        const res = await request(app)
            .post('/api/productos')
            .send(newProduct);
        expect(res.statusCode).toBe(201); // o el código que uses
        expect(res.body).toHaveProperty('id');
        createdProductId = res.body.id;
    });

    it('PUT /api/productos/:id debería actualizar el producto', async () => {
        const updateData = { price: 150 };
        const res = await request(app)
            .put(`/api/productos/${createdProductId}`)
            .send(updateData);
        expect(res.statusCode).toBe(200); // o 204 según config
        expect(res.body.price).toBe(150);
    });

    it('DELETE /api/productos/:id debería eliminar el producto', async () => {
        const res = await request(app).delete(`/api/productos/${createdProductId}`);
        expect(res.statusCode).toBe(200); // o 204 según config
    });
});
