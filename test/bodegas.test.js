const request = require('supertest');
const app = require('../app');

describe('API Bodegas', () => {
    let id;

    it('POST /api/bodegas crea una bodega', async () => {
        const res = await request(app).post('/api/bodegas').send({
            name: 'Bodega Central'
        });
        expect(res.statusCode).toBe(201);
        id = res.body.id;
    });

    it('GET /api/bodegas devuelve lista', async () => {
        const res = await request(app).get('/api/bodegas');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PUT /api/bodegas/:id actualiza bodega', async () => {
        const res = await request(app).put(`/api/bodegas/${id}`).send({
            name: 'Bodega Principal'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Bodega Principal');
    });

    it('DELETE /api/bodegas/:id elimina bodega', async () => {
        const res = await request(app).delete(`/api/bodegas/${id}`);
        expect(res.statusCode).toBe(200);
    });
});
