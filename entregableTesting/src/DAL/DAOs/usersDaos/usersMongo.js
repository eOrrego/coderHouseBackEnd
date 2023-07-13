import usersModel from '../../mongoDB/models/users.model.js';
import BasicMongo from '../basicMongo.js';

class UsersMongo extends BasicMongo {
    constructor() {
        super(usersModel);
    }
}

const usersMongo = new UsersMongo();

export default usersMongo;