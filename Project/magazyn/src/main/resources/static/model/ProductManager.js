export default class ProductManager {
    #tilesArray;
    #container;

    constructor(tilesArray) {
        this.#tilesArray = tilesArray;
        this.#container = document.querySelector('#container');
    }

    search(searchInput) {
        searchInput = searchInput.toLowerCase();
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

    sort(criteria) {
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
        
        this.#container.innerHTML = '';
        tiles.forEach(tile => {
            this.#container.appendChild(tile.container);
        });
    }

    filter(filter) {
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
                isVisible = (filter === 'valid' || filter === 'all');
            }
            
            tile.container.style.display = isVisible ? '' : 'none';
        });
    }

    #extractDate(dateText) {
        const dateMatch = dateText.match(/\d{4}-\d{2}-\d{2}/);
        return dateMatch ? new Date(dateMatch[0]) : new Date(0);
    }
}
