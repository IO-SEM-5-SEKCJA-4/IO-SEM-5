export default class Document {
  constructor(date, zone, products) {
    this.date = date;
    this.zone = zone;
    this.products = products;
  }

  generate() {
    document.getElementById("currentDate").textContent =
      this.date || new Date().toLocaleDateString("pl-PL");
    const zoneSummary = document.getElementById("zoneSummary");
    zoneSummary.innerHTML = `
<tr>
    <td>${this.zone.name}</td>
    <td>${this.zone.maxCapacity} kg</td>
    <td>${this.zone.currentWeight} kg</td>
    <td>${this.zone.amountOfProducs}</td>
</tr>
`;

    const productList = document.getElementById("productList");
    this.products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.actionType}</td>
                <td>${product.amount}</td>
            `;
      productList.appendChild(row);
    });
  }
}
