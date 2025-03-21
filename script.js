// Estado de las cajas
const cashiers = {
    1: { available: false },
    2: { available: false },
    3: { available: false },
    4: { available: false }
};

// Elementos DOM
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const toggleButtons = document.querySelectorAll('.toggle-btn');
const viewScreenButton = document.getElementById('view-screen');
const availableBoxesContainer = document.getElementById('available-boxes');
const notification = document.getElementById('notification');

// Cambiar entre pestañas
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover clase active de todas las pestañas
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        // Agregar clase active a la pestaña seleccionada
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        // Si cambiamos a la pantalla de visualización, actualizar las cajas disponibles
        if (tabId === 'display') {
            updateAvailableBoxes();
        }
    });
});

// Cambiar disponibilidad de las cajas
toggleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const cashierControl = e.target.closest('.cashier-control');
        const cashierId = parseInt(cashierControl.getAttribute('data-cashier'));
        const statusIndicator = cashierControl.querySelector('.status-indicator');
        const statusText = cashierControl.querySelector('.status-text');
        
        // Cambiar el estado
        cashiers[cashierId].available = !cashiers[cashierId].available;
        
        // Actualizar la interfaz
        if (cashiers[cashierId].available) {
            statusIndicator.classList.add('available');
            statusText.textContent = 'Disponible';
        } else {
            statusIndicator.classList.remove('available');
            statusText.textContent = 'No disponible';
        }
        
        // Mostrar notificación
        showNotification();
        
        // Actualizar la pantalla si está visible
        if (document.getElementById('display').classList.contains('active')) {
            updateAvailableBoxes();
        }
    });
});

// Ver pantalla de clientes
viewScreenButton.addEventListener('click', () => {
    tabs[1].click(); // Hacer clic en la pestaña de display
});

// Función para actualizar las cajas disponibles en la pantalla
function updateAvailableBoxes() {
    // Limpiar contenedor
    availableBoxesContainer.innerHTML = '';
    
    // Verificar si hay cajas disponibles
    const availableCashiers = Object.keys(cashiers).filter(id => cashiers[id].available);
    
    if (availableCashiers.length === 0) {
        const message = document.createElement('h3');
        message.textContent = 'No hay cajas disponibles en este momento.';
        availableBoxesContainer.appendChild(message);
        return;
    }
    
    // Mostrar solo la primera caja disponible (podría ser aleatoria o la primera disponible)
    const id = availableCashiers[0]; // Tomamos solo la primera caja disponible
    
    const boxElement = document.createElement('div');
    boxElement.className = 'box available';
    
    const boxLabel = document.createElement('span');
    boxLabel.className = 'box-label';
    boxLabel.textContent = 'CAJA';
    
    const boxNumber = document.createTextNode(id);
    
    boxElement.appendChild(boxLabel);
    boxElement.appendChild(boxNumber);
    availableBoxesContainer.appendChild(boxElement);
}

// Función para mostrar notificación
function showNotification() {
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Inicializar la pantalla
updateAvailableBoxes();
