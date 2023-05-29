import { businessModel } from '../../mongoDB/models/business.model.js';
import BasicMongo from '../basicMongo.js';

class BusinessMongo extends BasicMongo {
    constructor(model) {
        super(model);
    }
}

const businessMongo = new BusinessMongo(businessModel);

export default businessMongo;