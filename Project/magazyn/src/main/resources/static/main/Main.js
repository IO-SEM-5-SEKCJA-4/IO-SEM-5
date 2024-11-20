import Tile from "../model/Tile.js";
import ProductApiClient from "../model/ProductApiClient.js";
import Product from "../model/Product.js";                               

class Main {
  #tilesArray = [];                                                                                                                          


  constructor() {
    this.generateTiles(20);
    this.fetchProducts();
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
    document.getElementById('search-input').addEventListener('keyup', () => this.searchProducts());
    document.getElementById('sort-select').addEventListener('change', (e) => this.sortProducts(e.target.value));
    document.getElementById('filter-select').addEventListener('change', (e) => this.filterProducts(e.target.value));
  }

  searchProducts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    this.#tilesArray.forEach(tile => {
        const name = tile.name.textContent.toLowerCase();
        const location = tile.location.textContent.toLowerCase();
        const company = tile.company.textContent.toLowerCase();
        const isVisible = name.includes(searchInput) ||
            location.includes(searchInput) ||
            company.includes(searchInput);
        tile.container.style.display = isVisible ? '' : 'none';
    });
  }

  sortProducts(criteria) {
    const container = document.querySelector('#container');
    const tiles = Array.from(this.#tilesArray);
    tiles.sort((a, b) => {
        const nameA = a.name.textContent.toLowerCase();
        const nameB = b.name.textContent.toLowerCase();
        const dateA = this.#extractDate(a.expirationDate.textContent);
        const dateB = this.#extractDate(b.expirationDate.textContent);
        const priceA = parseFloat(a.price.textContent.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.textContent.replace(/[^0-9.]/g, ''));
        
        switch(criteria) {
            case 'nameAsc':
                return nameA.localeCompare(nameB);
            case 'nameDesc':
                return nameB.localeCompare(nameA);
            case 'dateAsc':
                return dateA - dateB;
            case 'dateDesc':
                return dateB - dateA;
            case 'priceAsc':
                return priceA - priceB;
            case 'priceDesc':
                return priceB - priceA;
            default:
                return 0;
        }
    });
    
    container.innerHTML = '';
    tiles.forEach(tile => {
        container.appendChild(tile.container);
    });
  }

  filterProducts(filter) {
    const currentDate = new Date();
    this.#tilesArray.forEach(tile => {
        const dateText = tile.expirationDate.textContent;
        const dateMatch = dateText.match(/\d{4}-\d{2}-\d{2}/);
        let isVisible = true;
        
        if (dateMatch) {
            const expireDate = new Date(dateMatch[0]);
            switch(filter) {
                case 'expired':
                    isVisible = expireDate < currentDate;
                    break;
                case 'valid':
                    isVisible = expireDate >= currentDate;
                    break;
                case 'all':
                    isVisible = true;
                    break;
            }
        } else {
            // Produkty bez daty ważności są traktowane jako ważne
            isVisible = (filter === 'valid' || filter === 'all');
        }
        
        tile.container.style.display = isVisible ? '' : 'none';
    });
  }

  #extractDate(dateText) {
    const dateMatch = dateText.match(/\d{4}-\d{2}-\d{2}/);
    return dateMatch ? new Date(dateMatch[0]) : new Date(0);
  }

  setVisibility(tile, isVisible) {
    tile.container.style.display = isVisible ? '' : 'none';
  }

}

const main = new Main();
