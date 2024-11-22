// Pobieramy elementy
const toggleButton = document.getElementById('toggle-button');
const sidePanel = document.getElementById('side-panel');

// Dodajemy nasłuchiwacz zdarzenia na kliknięcie w przycisk
toggleButton.addEventListener('click', () => {
    console.log("Kliknięto przycisk rozwijania"); // Dodajemy log, aby sprawdzić czy skrypt działa
    sidePanel.classList.toggle('open'); // Przełączamy klasę .open
});