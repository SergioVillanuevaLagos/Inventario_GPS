const request = require('supertest');
const app = require('../app');

describe('API Lotes', () => {
    let loteId;
    let productoId;
    let bodegaId;

    beforeAll(async () => {
        const producto = await request(app).post('/api/productos').send({
            name: 'Producto Lote',
            description: 'Test Lote',
            unit: 'unit',
            controlType: 'auto',
            price: 500,
            status: true
        });
        productoId = producto.body.id;

        const bodega = await request(app).post('/api/bodegas').send({
            name: 'Bodega Lote'
        });
        bodegaId = bodega.body.id;
    });

    it('POST /api/lotes crea un lote', async () => {
        const res = await request(app).post('/api/lotes').send({
            productid: productoId,
            lotnumber: 123,
            quantity: 50,
            expirationdate: '2025-12-31',
            storageid: bodegaId
        });
        expect(res.statusCode).toBe(201);
        loteId = res.body.id;
    });

    it('GET /api/lotes devuelve lista', async () => {
        const res = await request(app).get('/api/lotes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PUT /api/lotes/:id actualiza lote', async () => {
        const res = await request(app).put(`/api/lotes/${loteId}`).send({
            quantity: 75
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.quantity).toBe(75);
    });

    it('DELETE /api/lotes/:id elimina lote', async () => {
        const res = await request(app).delete(`/api/lotes/${loteId}`);
        expect(res.statusCode).toBe(200);
    });
});
