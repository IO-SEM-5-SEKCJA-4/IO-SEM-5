export default class Tile {
  #parent = document.querySelector("#container");

  constructor(
    language = "en",
    imagePath = null,
    name = "Item",
    amount = 1,
    price = 0,
    currency = "$",
    company = "Company.etp",
    expirationDate = null,
    additionalDetails = "Item Description",
    location = "Poland",
    idItem = "#00000"
  ) {
    // creating div with class tile
    this.container = document.createElement("div");
    this.container.className = "tile";
    this.#parent.appendChild(this.container);

    // creating img random image
    this.tileImg = document.createElement("img");
    this.tileImg.src = this.#initImage(imagePath);
    this.container.appendChild(this.tileImg);

    // creating div info
    this.infoDiv = document.createElement("div");
    this.infoDiv.className = "info";
    this.container.appendChild(this.infoDiv);

    // creating paragraph name
    this.name = document.createElement("p");
    this.name.className = "name";
    this.name.innerHTML = name;
    this.infoDiv.appendChild(this.name);

    // creating paragraph amount
    this.amount = document.createElement("p");
    this.amount.className = "amount";
    this.amount.innerHTML =
      language === "pl" ? "Ilość: " + amount : "Amount: " + amount;
    this.infoDiv.appendChild(this.amount);

    // creating paragraph price
    this.price = document.createElement("p");
    this.price.className = "price";
    this.price.innerHTML =
      language === "pl"
        ? "Cena: " + price + " " + currency
        : "Price: " + price + " " + currency;
    this.infoDiv.appendChild(this.price);

    // creating paragraph company
    this.company = document.createElement("p");
    this.company.className = "company";
    this.company.innerHTML =
      language === "pl" ? "Firma: " + company : "Company: " + company;
    this.infoDiv.appendChild(this.company);

    // creating paragraph expiration-date
    this.expirationDate = document.createElement("p");
    this.expirationDate.className = "expiration-date";
    this.expirationDate.innerHTML =
      language === "pl"
        ? expirationDate
          ? "Data wygaśnięcia: " + expirationDate
          : "Data wygaśnięcia: brak"
        : expirationDate
        ? "Expiration Date: " + expirationDate
        : "Expiration Date: none";
    this.infoDiv.appendChild(this.expirationDate);

    // creating paragraph additional details
    this.additionalDetails = document.createElement("p");
    this.additionalDetails.className = "additional-details";
    this.additionalDetails.innerHTML =
      language === "pl"
        ? "Dodatkowe szczegóły: </br></br>" + additionalDetails
        : "Additional details: </br></br>" + additionalDetails;
    this.infoDiv.appendChild(this.additionalDetails);

    // creating paragraph location
    this.location = document.createElement("p");
    this.location.className = "location";
    this.location.innerHTML =
      language === "pl" ? "Lokalizacja: " + location : "Location: " + location;
    this.infoDiv.appendChild(this.location);

    // creating paragraph id-item
    this.idItem = document.createElement("p");
    this.idItem.className = "id-item";
    this.idItem.innerHTML = "id: " + idItem;
    this.infoDiv.appendChild(this.idItem);
  }

  #initImage(imagePath) {
    let randomNumber = Math.random() * 1000;
    let url = "https://picsum.photos/300/300?random=" + randomNumber;
    return url;
  }
}
