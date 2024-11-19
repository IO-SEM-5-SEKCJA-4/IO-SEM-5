export default class Product {
    constructor(id, name, series_number, description, expireDate) {
        this.id = id || null;
        this.series_number = series_number || null;
        this.name = name || null;
        this.description = description || null;
        this.expireDate = expireDate || null;
    }
}