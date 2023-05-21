import ProductManager from "../DAL/dao/ManagerMongo/ProductManagerMongo.js";

const productsManager = new ProductManager()

export const getProducts = async (limit, page, sort, query) => {
    try {
        // const allProducts = await productsModel.find();

        const search = query ? {
            stock: { $gt: 0 },
            $or: [
                //devuelve todos los productos que tengan el query en el titulo o en la categoria
                { category: { $regex: query, $options: 'i' } },
                { title: { $regex: query, $options: 'i' } },
            ]
        } : {
            //devuelve todos los productos que tengan stock mayor a 0
            stock: { $gt: 0 }
        }

        if (sort === 'asc') {
            sort = { price: 1 };
        } else if (sort === 'desc') {
            sort = { price: -1 };
        }

        const options = {
            page: page || 1,
            limit: limit || 10,
            sort: sort,
            lean: true,
        }

        const allProducts = await productsManager.getProducts(search, options);

        allProducts.docs = allProducts.docs.map(product => {
            const { _id, title, description, price, code, stock, category, thumbnail } = product;
            return { id: _id, title, description, price, code, stock, category, thumbnail };
        });

        const info = {
            totalPages: allProducts.totalPages,
            prevPage: allProducts.prevPage,
            nextPage: allProducts.nextPage,
            page: allProducts.page,
            hasPrevPage: allProducts.hasPrevPage,
            hasNextPage: allProducts.hasNextPage,
            prevLink: allProducts.hasPrevPage ? `http://localhost:8080/api/products?page=${allProducts.prevPage}` : null,
            nextLink: allProducts.hasNextPage ? `http://localhost:8080/api/products?page=${allProducts.nextPage}` : null,
        }

        // retornar los productos e info como un objeto
        return { products: allProducts.docs, info };

    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (id) => {
    try {
        const product = await productsManager.getProductById(id);
        return product;
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (product) => {
    try {
        const newProduct = await productsManager.addProduct(product);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (id, product) => {
    try {
        const updatedProduct = await productsManager.updateProduct(id, product);
        return updatedProduct;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const deletedProduct = await productsManager.deleteProduct(id);
        return deletedProduct;
    } catch (error) {
        console.log(error);
    }
}