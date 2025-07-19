// test/lot.test.js
const request = require('supertest');
const express = require('express');

jest.mock('../models/lot.model.js', () => {
    return (sequelize, DataTypes) => {
        return {
            create: jest.fn().mockImplementation(async (data) => ({
                lotid: 1,
                ...data,
            })),
            findAll: jest.fn().mockResolvedValue([
                { lotid: 1, productid: 1, lotnum: 123, quantity: 50, expirationdate: '2025-12-31', storageid: 1 }
            ]),
            findByPk: jest.fn().mockImplementation(async (id) => {
                if (id == 1) {
                    return { lotid: 1, quantity: 50, update: jest.fn().mockResolvedValue(true), destroy: jest.fn().mockResolvedValue(true) };
                }
                return null;
            }),
        };
    };
});

const lotRoutes = require('../routes/lot.routes.js');

describe('Lot API', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/api/lotes', lotRoutes);
    });

    it('POST /api/lotes crea lote', async () => {
        const res = await request(app)
            .post('/api/lotes')
            .send({
                productid: 1,
                lotnum: 123,
                quantity: 50,
                expirationdate: '2025-12-31',
                storageid: 1
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.lotnum).toBe(123);
    });

    it('GET /api/lotes devuelve lista', async () => {
        const res = await request(app).get('/api/lotes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PUT /api/lotes/:id actualiza lote', async () => {
        const res = await request(app)
            .put('/api/lotes/1')
            .send({ quantity: 75 });

        expect(res.statusCode).toBe(200);
    });

    it('DELETE /api/lotes/:id elimina lote', async () => {
        const res = await request(app).delete('/api/lotes/1');
        expect(res.statusCode).toBe(200);
    });
});
