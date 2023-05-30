import bussinessModel from '../../mongoDB/models/bussiness.model.js';
import BasicMongo from '../basicMongo.js';

class BussinessMongo extends BasicMongo {
    constructor() {
        super(bussinessModel);
    }
}

const bussinessMongo = new BussinessMongo();

export default bussinessMongo;