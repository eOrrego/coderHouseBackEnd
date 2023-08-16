import chai from 'chai';
import mongoose from 'mongoose';
import productsMongo from '../src/DAL/DAOs/productsDaos/productsMongo.js';
import connectDB from '../src/DAL/mongoDB/dbConfig.js';

const expect = chai.expect;

connectDB();

describe('Set de test de chai', () => {
    before(function () {
        // this.productsDao = new Product();
        // console.log("VER: ", productsMongo);
    })
    beforeEach(function () {
        // this.timeout(5000);
    })
    it('El Dao debe poder obtener los productos en formato de array', async () => {
        const result = await productsMongo.findAll();
        // console.log("RESULT: ", result);
        expect(Array.isArray(result)).to.be.true;
    })
    it('Se comprueba si el array de productos tiene al menos un producto', async () => {
        const result = await productsMongo.findAll();
        expect(result.length).to.be.greaterThan(0);
    })
    it('Debe agregar un producto a la base de datos', async () => {
        const product = {
            name: "Test2",
            description: "Test2",
            price: 100,
            stock: 100,
        }
        const result = await productsMongo.create(product);
        // console.log("RESULT: ", result);
        //compruebo que el resultado sea un objeto
        expect(result).to.be.an('object');
        //compruebo que el resultado tenga un id
        expect(result).to.have.property('_id');
    })

})