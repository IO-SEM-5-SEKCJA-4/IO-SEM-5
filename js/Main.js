import Tile from "./Tile.js";

class Main {
  #tilesArray = [];


  constructor() {
    this.generateTiles(30);
    
  }

  generateTiles(amountOfImages) {
    for (let i = 0; i < amountOfImages; i++) {
      const tile = new Tile();
      this.#tilesArray.push(tile);
    }
  }



  
}

const main = new Main();
