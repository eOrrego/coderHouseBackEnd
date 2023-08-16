import usersModel from '../../mongoDB/models/users.model.js';
import BasicMongo from '../basicMongo.js';

class UsersMongo extends BasicMongo {
    constructor() {
        super(usersModel);
    }

    //Realiza un soft delete de todos los usuarios con lastLogin menor en dos dias a la fecha actual

    async deleteSoftAll() {
        try {
            const result = await this.model.updateMany({ lastLogin: { $lt: Date.now() - 172800000 }, status: 'active' },
                {
                    status: 'inactive',
                    deleteAt: Date.now()
                },
                { new: true });
            return result;
        } catch (error) {
            return error;
        }
    }

}

const usersMongo = new UsersMongo();

export default usersMongo;