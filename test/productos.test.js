const request = require('supertest');
const app = require('../app'); // Asegúrate de que este exporta tu `app`

describe('API Productos', () => {
    let id;

    it('POST /api/productos crea un producto', async () => {
        const res = await request(app)
            .post('/api/productos')
            .send({
                name: 'Producto Test',
                descripcion: 'Producto para pruebas',
                meassure: 'kg',
                type: 'controlado',
                price: 1500
            });

        console.log('POST response:', res.body); // ✅ Útil para depurar
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Producto Test');
        id = res.body.productid; // 👈 debe ser `productid`, no `id`
    });

    it('GET /api/productos devuelve lista', async () => {
        const res = await request(app).get('/api/productos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PUT /api/productos/:id actualiza producto', async () => {
        const res = await request(app)
            .put(`/api/productos/${id}`)
            .send({
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
