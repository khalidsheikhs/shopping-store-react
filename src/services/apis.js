import axios from "axios"; // Library uses for HTTP requests

const path = "https://my-json-server.typicode.com/benirvingplt/products/"; // Api path

/* Function to get all products */
export const fetchProducts = async () => {
    return await axios.get(path + 'products').catch((err) => {
        console.log("ERR", err);
    });
}

/* Function to get product by id */
export const fetchProductById = async (id) => {
    return await axios.get(path + 'products/' + id).catch((err) => {
        console.log("ERR", err);
    });
}
