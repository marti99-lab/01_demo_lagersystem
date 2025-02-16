document.addEventListener('DOMContentLoaded', function () {
    // Highlight active navigation link
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const savedStyle = localStorage.getItem('selectedStyle');
    if (savedStyle) {
        document.body.classList.add(savedStyle);
    }

    // Add search functionality for Waren
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Suche...';
    searchInput.style.margin = '10px';
    searchInput.addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        document.querySelectorAll('.card').forEach(card => {
            const cardText = card.textContent.toLowerCase();
            card.style.display = cardText.includes(searchValue) ? 'block' : 'none';
        });
    });
    document.querySelector('main').prepend(searchInput);

    // Modal animation functions
    function showModal(modal) {
        modal.style.display = 'block';
        modal.style.opacity = 0;
        modal.classList.add('open');
        setTimeout(() => modal.style.opacity = 1, 100);
    }


    function closeModal(modal) {
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('open');
        }, 300);
    }

    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            closeModal(modal);
            location.reload();
        });
    });

    document.addEventListener('click', function (event) {
        const openModal = document.querySelector('.modal.open');
        if (openModal && event.target === openModal) {
            closeModal(openModal);
        }
    });


    // Add toast notifications for feedback
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.padding = '10px 20px';
        toast.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
        toast.style.color = 'white';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = 1000;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // Example: Show toast after an order
    document.getElementById('placeOrderBtnModal')?.addEventListener('click', function () {
        showToast('Bestellung erfolgreich aufgegeben.');
    });


    // Add Fruit Style toggle
    const styleToggleButton = document.createElement('button');
    styleToggleButton.textContent = document.body.classList.contains('fruit')
        ? 'Switch to Vintage Style'
        : 'Switch to Fruit Style';
    styleToggleButton.style.margin = '10px';

    // Toggle style and save the preference in localStorage
    styleToggleButton.addEventListener('click', function () {
        const isFruitStyle = document.body.classList.toggle('fruit');
        styleToggleButton.textContent = isFruitStyle
            ? 'Switch to Vintage Style'
            : 'Switch to Fruit Style';

        // Save the selected style in localStorage
        if (isFruitStyle) {
            localStorage.setItem('selectedStyle', 'fruit');
        } else {
            localStorage.removeItem('selectedStyle');
        }
    });

    // Append the button to the header
    document.querySelector('header').appendChild(styleToggleButton);


    // Add animations for cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = 0;
        setTimeout(() => card.style.opacity = 1, 300);

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.2s';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});

// Function to send AJAX(asynchron programming) requests
function sendRequest(url, data, successMessage) {
    const errorModal = document.getElementById('errorModal');
    const errorMessageElement = document.getElementById('errorMessage');
    const closeErrorModal = document.getElementById('closeErrorModal');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Response:', xhr.responseText);
            if (xhr.responseText.includes("erfolgreich")) {
                alert(successMessage);
                location.reload();
            } else {
                closeAllModals();
                errorMessageElement.innerHTML = 'Fehler: ' + xhr.responseText;
                errorModal.style.display = 'block';
            }
        } else {
            console.error('Error:', xhr.responseText);
            closeAllModals();
            errorMessageElement.innerHTML = 'Fehler: ' + xhr.responseText;
            errorModal.style.display = 'block';
        }
    };
    xhr.onerror = function () {
        console.error('Request failed');
        closeAllModals();
        errorMessageElement.innerHTML = 'Request failed';
        errorModal.style.display = 'block';
    };
    xhr.send(new URLSearchParams(data).toString());

    closeErrorModal.onclick = function () {
        errorModal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === errorModal) {
            errorModal.style.display = 'none';
        }
    };
}

// Function to close all other modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}


// Show modals
function showModal(modal) {
    modal.style.display = "block";
}

// Close modals
function closeModals() {
    Object.values(modals).forEach(modal => modal.style.display = "none");
    Object.values(deleteModals).forEach(modal => modal.style.display = "none");
}

// Modal elements
const modals = {
    warengruppe: document.getElementById("myModal"),
    ware: document.getElementById("myModalWare"),
    updatePrice: document.getElementById("myModalUpdatePrice"),
    updateStock: document.getElementById("myModalUpdateStock"),
    placeOrder: document.getElementById("myModalPlaceOrder")
};

const buttons = {
    createWarengruppe: document.getElementById("createWarengruppeBtn"),
    createWare: document.getElementById("createWareBtn"),
    updatePrice: document.getElementById("updatePriceBtn"),
    updateStock: document.getElementById("updateStockBtn"),
    placeOrder: document.getElementById("placeOrderBtn"),
    viewOrders: document.getElementById("viewOrdersBtn"),
    deleteWarengruppe: document.getElementById("deleteWarengruppeBtn"),
    deleteWare: document.getElementById("deleteWareBtn")
};

const spans = {
    closeWarengruppe: modals.warengruppe?.querySelector(".close"),
    closeWare: modals.ware?.querySelector(".close"),
    closeUpdatePrice: modals.updatePrice?.querySelector(".close"),
    closeUpdateStock: modals.updateStock?.querySelector(".close"),
    closePlaceOrder: modals.placeOrder?.querySelector(".close")
};

// Event Listeners
buttons.createWarengruppe.addEventListener('click', () => showModal(modals.warengruppe));
buttons.createWare.addEventListener('click', () => showModal(modals.ware));
buttons.updatePrice.addEventListener('click', () => showModal(modals.updatePrice));
buttons.updateStock.addEventListener('click', () => showModal(modals.updateStock));
buttons.placeOrder.addEventListener('click', () => showModal(modals.placeOrder));

buttons.viewOrders.addEventListener('click', () => {
    const ordersView = document.getElementById("ordersView");
    ordersView.style.display = ordersView.style.display === "none" ? "block" : "none";
});

// Close modals
Object.values(spans).forEach(span => span?.addEventListener('click', closeModals));

window.addEventListener('click', function (event) {
    if (Object.values(modals).includes(event.target) || Object.values(deleteModals).includes(event.target)) {
        closeModals();
    }
});

// Event Listeners for Form Actions
document.getElementById('createWarengruppe').addEventListener('click', () => {
    const warengruppeName = document.getElementById('warengruppeName').value.trim();

    if (!warengruppeName) {
        alert('Bitte geben Sie einen Namen ein.');
        return;
    }

    // Check if the Warengruppe already exists in the current view
    const existingGroups = Array.from(document.querySelectorAll('.card .card-title'))
        .map(card => card.textContent.trim());
    if (existingGroups.includes(warengruppeName)) {
        alert('Die Warengruppe existiert bereits.');
        return;
    }

    // Send the request to the backend
    sendRequest('../backend/create_warengruppe.php', { warengruppe: warengruppeName }, 'Warengruppe erfolgreich erstellt.');
});


document.getElementById('createWare').addEventListener('click', () => {
    const wareName = document.getElementById('wareName').value.trim();
    const warePreis = document.getElementById('warePreis').value;
    const wareAnzahl = document.getElementById('wareAnzahl').value;
    const wareWarengruppe = document.getElementById('wareWarengruppe').value;

    // Check for empty input
    if (!wareName || !warePreis || !wareAnzahl || !wareWarengruppe) {
        alert('Bitte füllen Sie alle Felder aus.');
        return;
    }

    // Check if the Ware already exists in the selected Warengruppe
    const existingWares = Array.from(document.querySelectorAll('.card'))
        .filter(card => card.querySelector('.card-title')?.textContent === wareWarengruppe)
        .flatMap(card => Array.from(card.querySelectorAll('.card-item')))
        .map(item => item.querySelector('strong')?.textContent.trim());

    if (existingWares.includes(wareName)) {
        alert('Die Ware existiert bereits in dieser Warengruppe.');
        return;
    }

    // Send the request to the backend
    sendRequest('../backend/create_ware.php', { name: wareName, preis: warePreis, anzahl: wareAnzahl, warengruppe: wareWarengruppe }, 'Ware erfolgreich erstellt.');
});


document.getElementById('updatePriceBtnModal').addEventListener('click', () => {
    const wareId = document.getElementById('updatePriceWare').value;
    const newPrice = document.getElementById('updatePrice').value;
    sendRequest('../backend/update_price.php', { wareId, newPrice }, 'Preis erfolgreich aktualisiert.');
});

// Initialize variables for stock adjustments
const updateStockWare = document.getElementById('updateStockWare');
const currentStock = document.getElementById('currentStock');
const adjustmentValue = document.getElementById('adjustmentValue');
const newStock = document.getElementById('newStock');
const decreaseStock = document.getElementById('decreaseStock');
const increaseStock = document.getElementById('increaseStock');

// Update current stock when a Ware is selected
updateStockWare.addEventListener('change', () => {
    const selectedOption = updateStockWare.options[updateStockWare.selectedIndex];
    const stock = parseInt(selectedOption.getAttribute('data-current-stock')) || 0;
    currentStock.textContent = stock; // Display the current stock
    adjustmentValue.value = 0; // Reset the adjustment input
    newStock.textContent = stock; // Set new stock to current stock
});

// Adjust stock dynamically using the "-" button
decreaseStock.addEventListener('click', () => {
    const current = parseInt(currentStock.textContent) || 0;
    const adjustment = parseInt(adjustmentValue.value) || 0;
    if (adjustment > 0) {
        adjustmentValue.value = adjustment - 1;
        newStock.textContent = current + parseInt(adjustmentValue.value, 10);
    }
});

// Adjust stock dynamically using the "+" button
increaseStock.addEventListener('click', () => {
    const current = parseInt(currentStock.textContent) || 0;
    const adjustment = parseInt(adjustmentValue.value) || 0;
    adjustmentValue.value = adjustment + 1;
    newStock.textContent = current + parseInt(adjustmentValue.value, 10);
});

// Update new stock when the user manually inputs an adjustment value
adjustmentValue.addEventListener('input', () => {
    const current = parseInt(currentStock.textContent) || 0;
    const adjustment = parseInt(adjustmentValue.value) || 0;
    newStock.textContent = current + adjustment;
});

// Handle stock update request
document.getElementById('updateStockBtnModal').addEventListener('click', () => {
    const wareId = updateStockWare.value;
    const newStockValue = parseInt(newStock.textContent) || 0;

    // Validate inputs
    if (!wareId) {
        alert('Bitte wählen Sie eine Ware aus.');
        return;
    }
    if (newStockValue < 0) {
        alert('Der Lagerbestand darf nicht negativ sein.');
        return;
    }

    // Send request to the backend
    sendRequest('../backend/update_stock.php', { wareId, newStock: newStockValue }, 'Lagerbestand erfolgreich aktualisiert.');
});


document.getElementById('placeOrderBtnModal').addEventListener('click', () => {
    const customerName = document.getElementById('orderCustomerName').value;
    const companyName = document.getElementById('orderCompanyName').value;
    const wareId = document.getElementById('orderWare').value;
    const quantity = document.getElementById('orderQuantity').value;

    sendRequest('../backend/place_order.php', { customerName, companyName, wareId, quantity }, 'Bestellung erfolgreich aufgegeben.');
});

// Delete Modal Handling
const deleteModals = {
    warengruppe: document.getElementById("myModalDeleteWarengruppe"),
    ware: document.getElementById("myModalDeleteWare")
};

const deleteButtons = {
    deleteWarengruppe: document.getElementById("deleteWarengruppeBtn"),
    deleteWare: document.getElementById("deleteWareBtn")
};

const deleteSpans = {
    closeWarengruppe: deleteModals.warengruppe?.querySelector(".close"),
    closeWare: deleteModals.ware?.querySelector(".close")
};

deleteButtons.deleteWarengruppe.addEventListener('click', () => showModal(deleteModals.warengruppe));
deleteButtons.deleteWare.addEventListener('click', () => showModal(deleteModals.ware));

Object.values(deleteSpans).forEach(span => span?.addEventListener('click', closeModals));

document.getElementById('confirmDeleteWarengruppe').addEventListener('click', () => {
    const selectedWarengruppe = document.getElementById('deleteWarengruppeSelect').value;
    if (selectedWarengruppe) {
        sendRequest('../backend/delete_warengruppe.php', { warengruppe: selectedWarengruppe }, 'Warengruppe erfolgreich gelöscht.');
    } else {
        alert('Bitte wählen Sie eine Warengruppe aus.');
    }
});

document.getElementById('confirmDeleteWare').addEventListener('click', () => {
    const selectedWareId = document.getElementById('deleteWareSelect').value;
    if (selectedWareId) {
        sendRequest('../backend/delete_ware.php', { id: selectedWareId }, 'Ware erfolgreich gelöscht.');
    } else {
        alert('Bitte wählen Sie eine Ware aus.');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Select the modal and its close button
    const bestellungsverlaufModal = document.getElementById('bestellungsverlaufModal');
    const closeBestellungsverlaufModal = document.getElementById('closeBestellungsverlaufModal');
    const viewOrdersBtn = document.getElementById('viewOrdersBtn');

    // Show the Bestellungsverlauf modal
    viewOrdersBtn.addEventListener('click', function (e) {
        e.preventDefault();
        bestellungsverlaufModal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeBestellungsverlaufModal.addEventListener('click', function () {
        bestellungsverlaufModal.style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', function (e) {
        if (e.target === bestellungsverlaufModal) {
            bestellungsverlaufModal.style.display = 'none';
        }
    });
});