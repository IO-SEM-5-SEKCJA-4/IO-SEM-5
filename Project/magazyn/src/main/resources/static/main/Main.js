import Tile from "../model/Tile.js";
import ProductApiClient from "../model/ProductApiClient.js";
import Product from "../model/Product.js";      
import ProductManager from "../model/ProductManager.js"                         

class Main {
  #tilesArray = [];
  #productManager;

  constructor() {
      this.generateTiles(20);
      this.fetchProducts();
      this.#productManager = new ProductManager(this.#tilesArray);
      this.initializeSearchHandlers();
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

  initializeSearchHandlers() {
      document.getElementById('search-input').addEventListener('keyup', (e) => this.#productManager.search(e.target.value));
      document.getElementById('sort-select').addEventListener('change', (e) => this.#productManager.sort(e.target.value));
      document.getElementById('filter-select').addEventListener('change', (e) => this.#productManager.filter(e.target.value));
  }
}

const main = new Main();
