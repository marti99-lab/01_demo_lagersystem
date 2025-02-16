<?php
// Database connection & User-Data
require_once '../backend/db.php';
include '../backend/user-data.php';
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lagerverwaltungssystem - Menu</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="errorModal" class="modal">
        <div class="modal-content">
            <span class="close" id="closeErrorModal">&times;</span>
            <p id="errorMessage" style="color: red;"></p>
        </div>
    </div>
    <div class="container">
    <header class="header">
    <h1>Willkommen, <?php echo htmlspecialchars($name); ?>!</h1>
    <p>Firma: <?php echo htmlspecialchars($company_name); ?></p>
</header>
    <aside class="sidebar">
        <h2 class="sidebar-title">Navigation</h2>
        <div class="nav-links">
            <a href="#" class="nav-link" id="createWarengruppeBtn">➕ Erstelle Warengruppe</a>
            <a href="#" class="nav-link" id="createWareBtn">➕ Erstelle Ware</a>
            <a href="#" class="nav-link" id="updatePriceBtn">💲 Preise ändern</a>
            <a href="#" class="nav-link" id="updateStockBtn">📦 Lagerbestand ändern</a>
            <a href="#" class="nav-link" id="placeOrderBtn">🛒 Bestellung tätigen</a>
            <a href="#" class="nav-link" id="viewOrdersBtn">📜 Bestellungsverlauf</a>
            <a href="#" class="nav-link danger" id="deleteWarengruppeBtn">❌ Warengruppe löschen</a>
            <a href="#" class="nav-link danger" id="deleteWareBtn">❌ Ware löschen</a>
            <a href="https://learn-it-bonn.de/" class="nav-link home">🏠 Zurück zur Startseite</a>
        </div>
    </aside>
    <main class="main-content">
        <div class="grid-container">
                    <?php foreach ($warengruppen as $warengruppe): ?>
                        <div class="card">
                            <h2 class="card-title"><?php echo htmlspecialchars($warengruppe['name']); ?></h2>
                            <?php if (!empty($warengruppe['waren'])): ?>
                                <ul class="card-list">
                                    <?php foreach ($warengruppe['waren'] as $ware): ?>
                                        <li class="card-item">
                                            <strong><?php echo htmlspecialchars($ware['name']); ?></strong>
                                            - Preis: <?php echo htmlspecialchars($ware['preis']); ?> €<br>
                                            Lagerbestand: <?php echo htmlspecialchars($ware['anzahl']); ?>, Verkauft: <?php echo htmlspecialchars($ware['verkauft']); ?>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                                <p class="card-empty">Keine Waren in dieser Warengruppe.</p>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </main>
        </div>

<!-- Modal(Fenster für Benutzeraktion) for Bestellungsverlauf -->
<div id="bestellungsverlaufModal" class="modal">
    <div class="modal-content">
        <span class="close" id="closeBestellungsverlaufModal">&times;</span>
        <h2>Bestellungsverlauf</h2>
        <div class="order-table-wrapper">
            <table class="order-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kundenname</th>
                        <th>Unternehmen</th>
                        <th>Datum</th>
                        <th>Bestellte Ware</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($orders as $order): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($order['id']); ?></td>
                            <td><?php echo htmlspecialchars($order['kundenname']); ?></td>
                            <td><?php echo htmlspecialchars($order['unternehmen']); ?></td>
                            <td><?php echo htmlspecialchars($order['datum']); ?></td>
                            <td><?php echo htmlspecialchars($order['bestellteware']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

            </main>
        </div>
        <footer class="footer">
        <p>&copy; Copyright Martin Rübner @2024</p>
    </footer>
    </div>

    <!-- The Modal for Warengruppe -->
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Bitte wählen Sie einen Namen der Warengruppe:</p>
            <input type="text" id="warengruppeName" placeholder="Warengruppe Name" maxlength="30">
            <button id="createWarengruppe">Erstellen</button>
        </div>
    </div>

    <!-- The Modal for Ware -->
    <div id="myModalWare" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Bitte geben Sie die Details der Ware ein:</p>
            <input type="text" id="wareName" placeholder="Ware Name" maxlength="25">
            <input type="number" id="warePreis" placeholder="Preis" class="spaced-input" maxlength="12">
            <input type="number" id="wareAnzahl" placeholder="Anzahl" class="spaced-input" maxlength="10">
            <select id="wareWarengruppe" class="spaced-input">
                <option value="" disabled selected>Warengruppe wählen</option>
                <?php foreach ($warengruppeNames as $warengruppe): ?>
                    <option value="<?php echo htmlspecialchars($warengruppe); ?>"><?php echo htmlspecialchars($warengruppe); ?></option>
                <?php endforeach; ?>
            </select>
            <button id="createWare" class="button-spacing">Erstellen</button>
        </div>
    </div>

<!-- The Modal for Updating Prices -->
<div id="myModalUpdatePrice" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Bitte wählen Sie die Ware und geben Sie den neuen Preis ein:</p>
        <select id="updatePriceWare">
            <option value="" disabled selected>Ware wählen</option>
            <?php foreach ($warengruppen as $warengruppe): ?>
                <?php foreach ($warengruppe['waren'] as $ware): ?>
                    <option value="<?php echo htmlspecialchars($ware['id']); ?>">
                        <?php echo htmlspecialchars($ware['name']) . ' (' . htmlspecialchars($warengruppe['name']) . ', Preis: ' . htmlspecialchars($ware['preis']) . ' €)'; ?>
                    </option>
                <?php endforeach; ?>
            <?php endforeach; ?>
        </select>
        <input type="number" id="updatePrice" placeholder="Neuer Preis" maxlength="12">
        <button id="updatePriceBtnModal">Aktualisieren</button>
    </div>
</div>


    <!-- The Modal for Updating Stock -->
    <div id="myModalUpdateStock" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Bitte wählen Sie die Ware und passen Sie den Lagerbestand an:</p>
        <select id="updateStockWare">
            <option value="" disabled selected>Ware wählen</option>
            <?php foreach ($warengruppen as $warengruppe): ?>
                <?php foreach ($warengruppe['waren'] as $ware): ?>
                    <option value="<?php echo htmlspecialchars($ware['id']); ?>" 
                            data-current-stock="<?php echo htmlspecialchars($ware['anzahl']); ?>">
                        <?php echo htmlspecialchars($ware['name']) . ' (' . htmlspecialchars($warengruppe['name']) . ')'; ?>
                    </option>
                <?php endforeach; ?>
            <?php endforeach; ?>
        </select>
        <p>Aktueller Lagerbestand: <span id="currentStock">-</span></p>
        <div class="stock-adjustment">
            <button id="decreaseStock">-</button>
            <input type="number" id="adjustmentValue" value="0" min="0">
            <button id="increaseStock">+</button>
        </div>
        <p>Neuer Lagerbestand: <span id="newStock">-</span></p>
        <button id="updateStockBtnModal">Aktualisieren</button>
    </div>
</div>

    <!-- The Modal for Placing Orders -->
    <div id="myModalPlaceOrder" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Bestellung aufgeben:</p>
            <input type="text" id="orderCustomerName" placeholder="Kundenname" maxlength="30">
            <input type="text" id="orderCompanyName" placeholder="Unternehmen" maxlength="30">
            <select id="orderWare">
                <option value="" disabled selected>Ware wählen</option>
                <?php foreach ($warengruppen as $warengruppe): ?>
                    <?php foreach ($warengruppe['waren'] as $ware): ?>
                        <option value="<?php echo htmlspecialchars($ware['id']); ?>">
                            <?php echo htmlspecialchars($ware['name']) . ' (' . htmlspecialchars($warengruppe['name']) . ')'; ?>
                        </option>
                    <?php endforeach; ?>
                <?php endforeach; ?>
            </select>
            <input type="number" id="orderQuantity" placeholder="Anzahl" maxlength="10">
            <button id="placeOrderBtnModal">Bestellen</button>
        </div>
    </div>

    <!-- The Modal for Bestellungsverlauf -->
<div id="orderHistoryModal" class="modal">
    <div class="modal-content">
        <span class="close" id="closeOrderHistory">&times;</span>
        <h2>Bestellungsverlauf</h2>
        <div id="orderHistoryContent">
            <!-- Order history will be dynamically loaded here -->
        </div>
    </div>
</div>

<!-- The Modal for Deleting Warengruppe -->
<div id="myModalDeleteWarengruppe" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Bitte wählen Sie die Warengruppe zum Löschen:</p>
        <select id="deleteWarengruppeSelect">
            <option value="" disabled selected>Warengruppe wählen</option>
            <?php foreach ($warengruppeNames as $warengruppe): ?>
                <option value="<?php echo htmlspecialchars($warengruppe); ?>">
                    <?php echo htmlspecialchars($warengruppe); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <button id="confirmDeleteWarengruppe">Lösche</button>
    </div>
</div>

<!-- The Modal for Deleting Ware -->
<div id="myModalDeleteWare" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Bitte wählen Sie die Ware zum Löschen:</p>
        <select id="deleteWareSelect">
            <option value="" disabled selected>Ware wählen</option>
            <?php foreach ($warengruppen as $warengruppe): ?>
                <?php foreach ($warengruppe['waren'] as $ware): ?>
                    <option value="<?php echo htmlspecialchars($ware['id']); ?>">
                        <?php echo htmlspecialchars($ware['name']) . ' (' . htmlspecialchars($warengruppe['name']) . ')'; ?>
                    </option>
                <?php endforeach; ?>
            <?php endforeach; ?>
        </select>
        <button id="confirmDeleteWare">Lösche</button>
    </div>
</div>
<script src="../frontend/script.js"></script>
</body>
</html>