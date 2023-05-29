import { ordersModel } from '../../mongoDB/models/orders.model.js';
import BasicMongo from '../basicMongo.js';

class OrderMongo extends BasicMongo {
    constructor(model) {
        super(model);
    }
}

const ordersMongo = new OrderMongo(ordersModel);

export default ordersMongo;
