import ordersMongo from '../DAL/DAOs/ordersDaos/ordersMongo.js'

class OrdersService {
    async findAll() {
        try {
            const result = await ordersMongo.findAll();
            return result;
        } catch (error) {
            return error;
        }
    }

    async findById(id) {
        try {
            const result = await ordersMongo.findById(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async create(orders) {
        try {
            const result = await ordersMongo.create(orders);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(id, orders) {
        try {
            const result = await ordersMongo.update(id, orders);
            return result;
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            const result = await ordersMongo.delete(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async deleteSoft(id) {
        try {
            const result = await ordersMongo.deleteSoft(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    // async findByCategory(category) {
    //     try {
    //         const result = await ordersMongo.findByCategory(category);
    //         return result;
    //     } catch (error) {
    //         return error;
    //     }
    // }

}

const ordersService = new OrdersService();

export default ordersService;