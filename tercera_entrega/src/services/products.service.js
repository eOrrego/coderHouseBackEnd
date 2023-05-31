import productsMongo from '../DAL/DAOs/productsDaos/productsMongo.js'

class ProductsService {
    async findAll() {
        try {
            const result = await productsMongo.findAll();
            return result;
        } catch (error) {
            return error;
        }
    }

    async findById(id) {
        try {
            const result = await productsMongo.findById(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async create(products) {
        try {
            const result = await productsMongo.create(products);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(id, products) {
        try {
            const result = await productsMongo.update(id, products);
            return result;
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            const result = await productsMongo.delete(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async deleteSoft(id) {
        try {
            const result = await productsMongo.deleteSoft(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    // async findByCategory(category) {
    //     try {
    //         const result = await productsMongo.findByCategory(category);
    //         return result;
    //     } catch (error) {
    //         return error;
    //     }
    // }

}

const productsService = new ProductsService();

export default productsService;
