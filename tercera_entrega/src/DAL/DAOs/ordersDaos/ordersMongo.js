import ordersModel from '../../mongoDB/models/orders.model.js';
import BasicMongo from '../basicMongo.js';

class OrdersMongo extends BasicMongo {
    constructor() {
        super(ordersModel);
    }
}

const ordersMongo = new OrdersMongo();

export default ordersMongo;