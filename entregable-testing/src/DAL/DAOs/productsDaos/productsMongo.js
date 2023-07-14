import productsModel from '../../mongoDB/models/products.model.js';
import BasicMongo from '../basicMongo.js';

class ProductsMongo extends BasicMongo {
    constructor() {
        super(productsModel);
    }
}

const productsMongo = new ProductsMongo();

export default productsMongo;
