import Product from "./Product.js"; 
import ApiHandler from "./ApiHandler.js";

export default class ProductApiClient {
    constructor() {
        this.url = "http://localhost:8080/produkty";
        this.productsObjectsArray = [];
        this.apiHandler = new ApiHandler();
    }

    async getProducts() {
        const productsJson = await this.apiHandler.getJsonFromApi(this.url);
        this.#transformJsonToObject(productsJson);
        return this.getProductsObjectsArray();
    }
    
    getProductsObjectsArray() {
        return this.productsObjectsArray;
    }
    
    #transformJsonToObject(jsonArray) {
        if (!Array.isArray(jsonArray)) {
            throw new Error("Invalid data format: expected an array.");
        }

        this.productsObjectsArray = jsonArray.map(item => {
            const { id, name, series_number, description, expireDate } = item;
            return new Product(id, name, series_number, description, expireDate);
        });
    }
}