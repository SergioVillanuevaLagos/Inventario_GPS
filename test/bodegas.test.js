// test/storage.test.js
const request = require('supertest');
const express = require('express');
const { Op } = require('sequelize');

jest.mock('../models/storage.model.js', () => {
    return (sequelize, DataTypes) => {
        return {
            create: jest.fn().mockImplementation(async (data) => ({
                storageid: 1,
                ...data,
            })),
            findAll: jest.fn().mockResolvedValue([
                { storageid: 1, nombre: 'Mock Bodega', ubicacion: 'Loc' }
            ]),
            findByPk: jest.fn().mockImplementation(async (id) => {
                if (id == 1) {
                    return { storageid: 1, nombre: 'Mock Bodega', update: jest.fn().mockResolvedValue(true), destroy: jest.fn().mockResolvedValue(true) };
                }
                return null;
            }),
        };
    };
});

const storageRoutes = require('../routes/storage.routes.js');

describe('Storage API', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/api/bodegas', storageRoutes);
    });

    it('POST /api/bodegas crea bodega', async () => {
        const res = await request(app)
            .post('/api/bodegas')
            .send({ nombre: 'Test Bodega', personid: 1 });

        expect(res.statusCode).toBe(201);
        expect(res.body.nombre).toBe('Test Bodega');
    });

    it('GET /api/bodegas devuelve lista', async () => {
        const res = await request(app).get('/api/bodegas');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PUT /api/bodegas/:id actualiza bodega', async () => {
        const res = await request(app)
            .put('/api/bodegas/1')
            .send({ nombre: 'Bodega Actualizada' });

        expect(res.statusCode).toBe(200);
    });

    it('DELETE /api/bodegas/:id elimina bodega', async () => {
        const res = await request(app).delete('/api/bodegas/1');
        expect(res.statusCode).toBe(200);
    });
});
