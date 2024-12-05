class ToastManager {
    constructor() {
        // Znajdź lub utwórz kontener na toasty
        this.toastContainer = document.getElementById('toast-container');
        if (!this.toastContainer) {
            this.toastContainer = document.createElement('div');
            this.toastContainer.id = 'toast-container';
            this.toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(this.toastContainer);
        }
    }

    showToast(message, type = 'info') {
        const toastId = `toast-${Date.now()}`;
        const toastTypeClass = {
            info: 'bg-info text-white',
            success: 'bg-success text-white',
            warning: 'bg-warning text-dark',
            error: 'bg-danger text-white',
        }[type] || 'bg-info text-white';

        // Tworzymy nowy toast
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast align-items-center ${toastTypeClass} border-0`;
        toast.role = 'alert';
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');

        // Zawartość toastu
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        // Dodajemy toast do kontenera
        this.toastContainer.appendChild(toast);

        // Inicjalizacja obiektu Bootstrap Toast i jego wyświetlenie
        const toastElement = document.getElementById(toastId);  // Znajdź nowo utworzony element toast
        const bootstrapToast = new bootstrap.Toast(toastElement);  // Utwórz instancję bootstrap.Toast
        bootstrapToast.show();  // Pokaż toast

        // Usuwamy toast po zakończeniu animacji
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }
}

export default ToastManager;
