import Tile from "../model/Tile.js";
import ProductApiClient from "../model/ProductApiClient.js";
import Product from "../model/Product.js";                               

class Main {
  #tilesArray = [];                                                                                                                          


  constructor() {
    this.generateTiles(30);

    // API DEBUG PRODUCTS FETCH
    this.fetchProducts();
  }

  async fetchProducts() {
    const productApiClient = new ProductApiClient();
    try {
      const products = await productApiClient.getProducts();
      console.log("Products:", products);
    } catch (error) {
      console.error("Error while fetching products:", error);
    }
  }

  generateTiles(amountOfImages) {
    for (let i = 0; i < amountOfImages; i++) {
      const tile = new Tile();
      this.#tilesArray.push(tile);
    }
  }
}

const main = new Main();
