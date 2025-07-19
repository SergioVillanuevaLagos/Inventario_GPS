// test/product.test.js
const request = require('supertest');
const express = require('express');

// Mock del modelo product
jest.mock('../models/product.model.js', () => {
    return (sequelize, DataTypes) => {
        return {
            create: jest.fn().mockImplementation(async (data) => ({
                productid: 1,
                ...data,
            })),
            findAll: jest.fn().mockResolvedValue([
                { productid: 1, name: 'Mock Product', descripcion: 'desc', meassure: 'kg', type: 'food', price: 100 }
            ]),
            findByPk: jest.fn().mockImplementation(async (id) => {
                if (id == 1) {
                    return { productid: 1, name: 'Mock Product', update: jest.fn().mockResolvedValue(true), destroy: jest.fn().mockResolvedValue(true) };
                }
                return null;
            }),
        };
    };
});

const productRoutes = require('../routes/product.routes.js');

describe('Product API', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/api/productos', productRoutes);
    });

    it('POST /api/productos crea producto', async () => {
        const res = await request(app)
            .post('/api/productos')
            .send({ name: 'Test Prod', meassure: 'kg', type: 'food', price: 100 });

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Test Prod');
    });

    it('GET /api/productos devuelve lista', async () => {
        const res = await request(app).get('/api/productos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PUT /api/productos/:id actualiza producto', async () => {
        const res = await request(app)
            .put('/api/productos/1')
            .send({ price: 200 });

        expect(res.statusCode).toBe(200);
    });

    it('DELETE /api/productos/:id elimina producto', async () => {
        const res = await request(app).delete('/api/productos/1');
        expect(res.statusCode).toBe(200);
    });
});
