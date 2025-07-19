const request = require('supertest');
const app = require('../app');

describe('API Bodegas', () => {
    let id;

    it('POST /api/bodegas crea una bodega', async () => {
        const res = await request(app).post('/api/bodegas').send({
            nombre: 'Bodega Central',
            ubicacion: 'Centro',
            personid: 1
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.nombre).toBe('Bodega Central');
        id = res.body.storageid;
    });

    it('GET /api/bodegas devuelve lista', async () => {
        const res = await request(app).get('/api/bodegas');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PUT /api/bodegas/:id actualiza bodega', async () => {
        const res = await request(app).put(`/api/bodegas/${id}`).send({
            nombre: 'Bodega Actualizada',
            ubicacion: 'Sur',
            personid: 2
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.nombre).toBe('Bodega Actualizada');
    });

    it('DELETE /api/bodegas/:id elimina bodega', async () => {
        const res = await request(app).delete(`/api/bodegas/${id}`);
        expect(res.statusCode).toBe(200);
    });
});
