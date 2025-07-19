// test/lotes.test.js
const request = require('supertest');
const app = require('../app'); // Asegúrate que exportas app en tu app.js para testearlo

describe('API Lotes', () => {
    let loteId = null;
    const nuevoLote = {
        productid: 1,
        lotnum: 1001,
        quantity: 50,
        expirationdate: '2025-12-31',
        storageid: 1
    };

    it('POST /api/lotes crea un lote', async () => {
        const res = await request(app)
            .post('/api/lotes')
            .send(nuevoLote);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('lotid');
        expect(res.body.productid).toBe(nuevoLote.productid);
        loteId = res.body.lotid; // Guardamos id para usarlo luego
    });

    it('GET /api/lotes devuelve lista', async () => {
        const res = await request(app).get('/api/lotes');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PUT /api/lotes/:id actualiza lote', async () => {
        const res = await request(app)
            .put(`/api/lotes/${loteId}`)
            .send({
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
