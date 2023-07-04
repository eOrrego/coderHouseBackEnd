import productsMongo from '../DAL/DAOs/productsDaos/productsMongo.js'
import productsMocks from '../utils/mocks.utils.js';
import { verifyToken } from '../utils/jwt.utils.js';

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

    async create(products, token) {
        try {
            //crear un nuevo product con el owner del token y el resto de los datos del body
            const resultToken = await verifyToken(token);
            const { email } = resultToken;
            const result = await productsMongo.create({ ...products, owner: email });
            return result;

        } catch (error) {
            return error;
        }
    }

    async update(id, products, token) {
        try {
            //verificar si el product es del owner del token o si el token es role admin
            const resultToken = await verifyToken(token);
            const { role, email } = resultToken;
            const resultProduct = await productsMongo.findById(id);
            const { owner } = resultProduct;
            if (role === 'admin' || email === owner) {
                const result = await productsMongo.update(id, products);
                return result;
            }
            return null;

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

    async findAllMocks() {
        try {
            const result = productsMocks;
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
