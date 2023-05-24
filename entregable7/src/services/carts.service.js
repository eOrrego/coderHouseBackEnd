import CartManager from "../DAL/dao/ManagerMongo/CartManagerMongo.js";
import ProductManager from "../DAL/dao/ManagerMongo/ProductManagerMongo.js";

// instanciamos el manager de carritos para poder usar sus métodos
const cartManager = new CartManager();
// instanciamos el manager de productos para poder usar sus métodos
const productManager = new ProductManager();

// exportamos la funcion que se encarga de obtener un carrito por id
export const getCart = async (cid) => {
    try {
        const cart = await cartManager.getCartById(cid);
        return cart;
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener el carrito');
    }
}

// exportamos la funcion que se encarga de agregar un carrito vacio
export const addCart = async () => {
    try {
        const cart = await cartManager.addCart();
        return cart;
    } catch (err) {
        console.error(err);
        throw new Error('Error al agregar el carrito');
    }
}

// exportamos la funcion que se encarga de agregar un producto al carrito
export const addProductToCart = async (cid, pid) => {
    try {
        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return null;
        }

        const pro = await productManager.getProductById(pid);
        if (!pro) {
            return null;
        }

        const product = cart.products.find((product) => product.pid._id.toString() === pid);

        if (!product) {
            cart.products.push({ pid: pid, quantity: 1 });
            await cartManager.saveCart(cart);
        } else {
            product.quantity++;
            await cartManager.updateOneCart(cart);
        }

        return cart;
    } catch (err) {
        console.error(err);
        throw new Error('Error al agregar el producto al carrito');
    }
}

// exportamos la funcion que se encarga de eliminar un producto del carrito
export const deleteProductFromCart = async (cid, pid) => {
    try {
        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return null;
        }

        const product = cart.products.find((product) => product.pid._id.toString() === pid);

        if (!product) {
            return null;
        } else {
            product.quantity--;
            if (product.quantity === 0) {
                cart.products = cart.products.filter((product) => product.pid._id.toString() !== pid);
            }
            await cartManager.updateOneCart(cart);
        }

        return cart;
    } catch (err) {
        console.error(err);
        throw new Error('Error al eliminar el producto del carrito');
    }
}

// exportamos la funcion que se encarga de eliminar todos los productos del carrito
export const deleteProductsFromCart = async (cid) => {
    try {
        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return null;
        }

        cart.products = [];
        await cartManager.updateOneCart(cart);

        return cart;
    } catch (err) {
        console.error(err);
        throw new Error('Error al eliminar los productos del carrito');
    }
}

// exportamos la funcion que se encarga de actualizar los productos del carrito
export const updateProductsFromCart = async (cid, products) => {
    try {
        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return null;
        }

        // verificar que los productos existan
        // for (let i = 0; i < products.length; i++) {
        //     const product = await productManager.getProductById(products[i].pid);
        //     if (!product) {
        //         return null;
        //     }
        // }

        // for (const product of products) {
        //     const pro = await productManager.getProductById(product.pid);
        //     if (!pro) {
        //         return null;
        //     }
        // }

        // products.forEach(async (product) => {
        //     const pro = await productManager.getProductById(product.pid);
        //     if (!pro) {
        //         return null;
        //     }
        // });

        // console.log(products);
        // console.log(cart);
        // await cartManager.updateOneCart(cart);

        return cart;
    } catch (err) {
        console.error(err);
        throw new Error('Error al actualizar los productos del carrito');
    }
}

// exportamos la funcion que se encarga de actualizar la cantidad de un producto del carrito
export const updateProductsQaFromCart = async (cid, pid, quantity) => {
    try {
        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return null;
        }

        const product = cart.products.find((product) => product.pid._id.toString() === pid);

        if (!product) {
            return null;
        } else {
            product.quantity = quantity;
            await cartManager.updateOneCart(cart);
        }

        return cart;
    }
    catch (err) {
        console.error(err);
        throw new Error('Error al actualizar la cantidad del producto del carrito');
    }

}
