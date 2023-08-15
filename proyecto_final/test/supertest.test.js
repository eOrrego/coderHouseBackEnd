import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

const productMosck = {
    name: "Producto Prueba1",
    description: "Producto Prueba1",
    price: 100,
    stock: 100,
}

describe('Set de test de supertest para productos', () => {
    it('El usuario tiene que estar autorizado para poder agregar un producto', async () => {
        const result = await requester.post('/api/products').send(productMosck);
        expect(result.status).to.be.equal(401);
    })
    it('El usuario tiene que estar autorizado para poder modificar un producto', async () => {
        const result = await requester.put('/api/products/1').send(productMosck);
        expect(result.status).to.be.equal(401);
    })
    it('El usuario tiene que estar autorizado para poder eliminar un producto', async () => {
        const result = await requester.delete('/api/products/1');
        expect(result.status).to.be.equal(401);
    })

    it('El Dao debe poder obtener los productos en formato de array', async () => {
        const result = await requester.get('/api/products');
        // console.log("RESULT: ", result);
        expect(result.body).to.be.an('array');
    })
    it('Se comprueba si el array de productos tiene al menos un producto', async () => {
        const result = await requester.get('/api/products');
        expect(result.body.length).to.be.greaterThan(0);
    })

})
