import cartsModel from '../../mongoDB/models/carts.model.js';
import BasicMongo from '../basicMongo.js';

class CartsMongo extends BasicMongo {
    constructor() {
        super(cartsModel);
    }
}

const cartsMongo = new CartsMongo();

export default cartsMongo;