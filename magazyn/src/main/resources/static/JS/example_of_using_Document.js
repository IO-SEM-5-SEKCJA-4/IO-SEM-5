import Zone from "./Zone.js";
import Product from "./Product.js";
import Document from "./Document.js";

const zone = new Zone("Strefa A", 5000, 3200, 25);
const products = [
  new Product("Produkt 1", "Dostarczenie", 10),
  new Product("Produkt 2", "Wyjęcie", 5),
  new Product("Produkt 3", "Dostarczenie", 20),
];

const dokument = new Document(
  new Date().toLocaleDateString("pl-PL"),
  zone,
  products
);
dokument.generate();
