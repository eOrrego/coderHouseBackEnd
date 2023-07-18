import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('test endpoint de carts', () => {
    it('Probar el get de un carrito metodo GET api/carts/1', async () => {
        const result = await requester.get('/api/carts/1');
        expect(result.status).to.be.equal(200);
    })
    it('Probar creacion de un carrito metodo POST /api/carts', async () => {
        const result = await requester.post('/api/carts');
        expect(result.status).to.be.equal(200);
    })
})
