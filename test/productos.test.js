const request = require('supertest');
const app = require('../app');

describe('API Productos', () => {
    let id;

    it('POST /api/productos crea un producto', async () => {
        const res = await request(app).post('/api/productos').send({
            name: 'Producto Test',
            description: 'Test',
            unit: 'kg',
            controlType: 'manual',
            price: 1000,
            status: true,
        });
        expect(res.statusCode).toBe(201);
        id = res.body.id;
    });

    it('GET /api/productos devuelve lista', async () => {
        const res = await request(app).get('/api/productos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PUT /api/productos/:id actualiza producto', async () => {
        const res = await request(app).put(`/api/productos/${id}`).send({
            price: 2000
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.price).toBe(2000);
    });

    it('DELETE /api/productos/:id elimina producto', async () => {
        const res = await request(app).delete(`/api/productos/${id}`);
        expect(res.statusCode).toBe(200);
    });
});
