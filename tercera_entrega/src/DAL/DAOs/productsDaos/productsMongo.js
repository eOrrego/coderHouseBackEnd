import { productsModel } from '../../mongoDB/models/products.model.js';
import BasicMongo from '../basicMongo.js';

class ProductsMongo extends BasicMongo {
    constructor(model) {
        super(model);
    }
}

const productsMongo = new ProductsMongo(productsModel);

export default productsMongo;
