const request = require('supertest');
const app = require('../../../app');
const Beer = require('../models/Beer');

describe('Beer Controller', () => {
    // Antes de cada prueba, limpia la base de datos de cervezas
    beforeEach(async () => {
        await Beer.deleteMany({});
    });

    // Prueba para el método getAllBeers
    describe('GET /api/beers', () => {
        it('Debería devolver todas las cervezas en la base de datos', async () => {
            await Beer.create([
                { name: 'Cerveza 1', category: 'IPA', country: 'USA' },
                { name: 'Cerveza 2', category: 'Lager', country: 'Germany' },
            ]);

            const response = await request(app).get('/api/beers');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });
    });

    // Prueba para el método getBeerById
    describe('GET /api/beers/:id', () => {
        it('Debería devolver la cerveza correspondiente al ID proporcionado', async () => {
            const beer = await Beer.create({ name: 'Cerveza de prueba', category: 'Ale', country: 'UK' });

            const response = await request(app).get(`/api/beers/${beer._id}`);

            expect(response.status).toBe(200);
            expect(response.body._id).toBe(String(beer._id));
        });

        it('Debería devolver un error 404 si no se encuentra la cerveza', async () => {
            const nonExistentId = '6097d6f5ca7a2e23e8ff3d32'; // ID que no existe en la base de datos
            const response = await request(app).get(`/api/beers/${nonExistentId}`);

            expect(response.status).toBe(404);
        });
    });

    // Prueba para el método addBeer
    describe('POST /api/beers', () => {
        it('Debería agregar una nueva cerveza a la base de datos', async () => {
            const beerData = {
                name: 'Nueva Cerveza',
                category: 'Stout',
                country: 'Ireland',
                ingredients: ['agua', 'malta', 'lúpulo', 'levadura'],
                price: 5.99,
                description: 'Una cerveza oscura y deliciosa',
            };

            const response = await request(app)
                .post('/api/beers')
                .send(beerData);

            expect(response.status).toBe(201);

            const beer = await Beer.findOne({ name: 'Nueva Cerveza' });
            expect(beer).toBeTruthy();
            expect(beer.name).toBe(beerData.name);
            expect(beer.category).toBe(beerData.category);
            expect(beer.country).toBe(beerData.country);
            expect(beer.ingredients).toEqual(beerData.ingredients);
            expect(beer.price).toBe(beerData.price);
            expect(beer.description).toBe(beerData.description);
        });

        it('Debería devolver un error 400 si se proporcionan datos incorrectos', async () => {
            const invalidBeerData = {
                // Proporciona datos incompletos para provocar un error de validación
                name: 'Cerveza sin ingredientes ni precio',
                category: 'Ale',
                country: 'UK',
            };

            const response = await request(app)
                .post('/api/beers')
                .send(invalidBeerData);

            expect(response.status).toBe(400);
        });
    });

    // Prueba para el método updateBeer
    describe('PUT /api/beers/:id', () => {
        it('Debería actualizar la cerveza correspondiente al ID proporcionado', async () => {
            const beer = await Beer.create({ name: 'Cerveza a actualizar', category: 'Ale', country: 'UK' });

            const updatedBeerData = { name: 'Cerveza actualizada', category: 'Lager' };

            const response = await request(app)
                .put(`/api/beers/${beer._id}`)
                .send(updatedBeerData);

            expect(response.status).toBe(200);

            const updatedBeer = await Beer.findById(beer._id);
            expect(updatedBeer.name).toBe(updatedBeerData.name);
            expect(updatedBeer.category).toBe(updatedBeerData.category);
        });

        it('Debería devolver un error 404 si no se encuentra la cerveza', async () => {
            const nonExistentId = '6097d6f5ca7a2e23e8ff3d32'; // ID que no existe en la base de datos
            const response = await request(app)
                .put(`/api/beers/${nonExistentId}`)
                .send({ name: 'Cerveza a actualizar', category: 'Ale' });

            expect(response.status).toBe(404);
        });
    });

    // Prueba para el método deleteBeer
    describe('DELETE /api/beers/:id', () => {
        it('Debería eliminar la cerveza correspondiente al ID proporcionado', async () => {
            const beer = await Beer.create({ name: 'Cerveza a eliminar', category: 'Ale', country: 'UK' });

            const response = await request(app).delete(`/api/beers/${beer._id}`);

            expect(response.status).toBe(200);

            const deletedBeer = await Beer.findById(beer._id);
            expect(deletedBeer).toBeNull();
        });

        it('Debería devolver un error 404 si no se encuentra la cerveza', async () => {
            const nonExistentId = '6097d6f5ca7a2e23e8ff3d32'; // ID que no existe en la base de datos
            const response = await request(app).delete(`/api/beers/${nonExistentId}`);

            expect(response.status).toBe(404);
        });
    });
});
