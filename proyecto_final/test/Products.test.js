import productsMongo from '../src/DAL/DAOs/productsDaos/productsMongo.js';
import Assert from 'assert';
import connectDB from '../src/DAL/mongoDB/dbConfig.js';

connectDB();

const assert = Assert.strict;

describe('Testing Products DAO', () => {
    before(function () {
        // this.productsDao = new productsMongo();
        console.log("VER: ", productsMongo);
    })
    it('El Dao debe poder obtener los productos en formato de array', async () => {
        const result = await productsMongo.findAll();
        assert.strictEqual(Array.isArray(result), true);
    })
    beforeEach(function () {
        // this.timeout(5000);
    })
});