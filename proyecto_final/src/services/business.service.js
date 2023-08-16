import businessMongo from '../DAL/DAOs/businessDaos/businessMongo.js'

class BusinessService {
    async findAll() {
        try {
            const result = await businessMongo.findAll();
            return result;
        } catch (error) {
            return error;
        }
    }

    async findById(id) {
        try {
            const result = await businessMongo.findById(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async create(business) {
        try {
            const result = await businessMongo.create(business);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(id, business) {
        try {
            const result = await businessMongo.update(id, business);
            return result;
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            const result = await businessMongo.delete(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async deleteSoft(id) {
        try {
            const result = await businessMongo.deleteSoft(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    // async findByName(name) {
    //     try {
    //         const result = await businessMongo.findByName(name);
    //         return result;
    //     } catch (error) {
    //         return error;
    //     }
    // }
}

const businessService = new BusinessService();

export default businessService;

