const API_URL = "http://localhost:8080";

/* =========================
   LOAD CROPS
========================= */
async function loadCrops() {
    try {
        const response = await fetch(`${API_URL}/crops`);

        if (!response.ok) {
            throw new Error("Failed to load crops");
        }

        const crops = await response.json();

        console.log("Crops:", crops);

        // Dashboard count
        const cropCount = document.getElementById("cropCount");
        if (cropCount) {
            cropCount.textContent = crops.length;
        }

        // Crop table
        const table = document.getElementById("cropTableBody");

        if (table) {
            table.innerHTML = "";

            if (crops.length === 0) {
                table.innerHTML = `
                    <tr>
                        <td colspan="3">No crops found</td>
                    </tr>
                `;
            } else {
                crops.forEach(crop => {
                    table.innerHTML += `
                        <tr>
                            <td>${crop.id}</td>
                            <td>${crop.name}</td>
                            <td>${crop.category}</td>
                        </tr>
                    `;
                });
            }
        }

        // Fill crop dropdowns
        const harvestCrop = document.getElementById("harvestCrop");
        const saleCrop = document.getElementById("saleCrop");

        if (harvestCrop) {
            harvestCrop.innerHTML = `<option value="">Select Crop</option>`;

            crops.forEach(crop => {
                harvestCrop.innerHTML += `
                    <option value="${crop.id}">
                        ${crop.name}
                    </option>
                `;
            });
        }

        if (saleCrop) {
            saleCrop.innerHTML = `<option value="">Select Crop</option>`;

            crops.forEach(crop => {
                saleCrop.innerHTML += `
                    <option value="${crop.id}">
                        ${crop.name}
                    </option>
                `;
            });
        }

    } catch (error) {
        console.error("Error loading crops:", error);

        const table = document.getElementById("cropTableBody");

        if (table) {
            table.innerHTML = `
                <tr>
                    <td colspan="3">Error loading crops</td>
                </tr>
            `;
        }
    }
}


/* =========================
   LOAD HARVEST BATCHES
========================= */
async function loadHarvests() {

    try {
        const response = await fetch(`${API_URL}/harvest-batches`);

        if (!response.ok) {
            throw new Error("Failed to load harvest batches");
        }

        const harvests = await response.json();

        console.log("Harvests:", harvests);

        // Dashboard count
        const harvestCount =
            document.getElementById("harvestCount");

        if (harvestCount) {
            harvestCount.textContent = harvests.length;
        }

        // Harvest table
        const table =
            document.getElementById("harvestTableBody");

        if (table) {

            table.innerHTML = "";

            if (harvests.length === 0) {

                table.innerHTML = `
                    <tr>
                        <td colspan="4">
                            No harvest batches found
                        </td>
                    </tr>
                `;

            } else {

                harvests.forEach(harvest => {

                    let cropName = "N/A";

                    if (harvest.crop) {
                        cropName =
                            harvest.crop.name;
                    }

                    table.innerHTML += `
                        <tr>
                            <td>${harvest.id}</td>
                            <td>${harvest.quantity}</td>
                            <td>${harvest.harvestDate}</td>
                            <td>${cropName}</td>
                        </tr>
                    `;
                });
            }
        }

    } catch (error) {

        console.error(
            "Error loading harvest batches:",
            error
        );

        const table =
            document.getElementById("harvestTableBody");

        if (table) {
            table.innerHTML = `
                <tr>
                    <td colspan="4">
                        Error loading harvest batches
                    </td>
                </tr>
            `;
        }
    }
}


/* =========================
   LOAD SALES
========================= */
async function loadSales() {

    try {

        const response =
            await fetch(`${API_URL}/sales`);

        if (!response.ok) {
            throw new Error("Failed to load sales");
        }

        const sales = await response.json();

        console.log("Sales:", sales);

        // Dashboard count
        const salesCount =
            document.getElementById("salesCount");

        if (salesCount) {
            salesCount.textContent = sales.length;
        }

        // Sales table
        const table =
            document.getElementById("salesTableBody");

        if (table) {

            table.innerHTML = "";

            if (sales.length === 0) {

                table.innerHTML = `
                    <tr>
                        <td colspan="5">
                            No sales found
                        </td>
                    </tr>
                `;

            } else {

                sales.forEach(sale => {

                    let cropName = "N/A";

                    if (sale.crop) {
                        cropName =
                            sale.crop.name;
                    }

                    table.innerHTML += `
                        <tr>
                            <td>${sale.id}</td>
                            <td>${sale.quantity}</td>
                            <td>${sale.price}</td>
                            <td>${sale.saleDate}</td>
                            <td>${cropName}</td>
                        </tr>
                    `;
                });
            }
        }

    } catch (error) {

        console.error(
            "Error loading sales:",
            error
        );

        const table =
            document.getElementById("salesTableBody");

        if (table) {
            table.innerHTML = `
                <tr>
                    <td colspan="5">
                        Error loading sales
                    </td>
                </tr>
            `;
        }
    }
}


/* =========================
   ADD CROP
========================= */
async function addCrop() {

    const name =
        document.getElementById("cropName").value;

    const category =
        document.getElementById("cropCategory").value;

    if (!name || !category) {
        alert("Please enter crop name and category");
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/crops`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    category: category
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add crop");
        }

        alert("Crop added successfully");

        document.getElementById("cropName").value = "";
        document.getElementById("cropCategory").value = "";

        await loadCrops();

    } catch (error) {

        console.error(error);

        alert("Error adding crop");
    }
}


/* =========================
   ADD HARVEST
========================= */
async function addHarvest() {

    const quantity =
        document.getElementById("harvestQuantity").value;

    const harvestDate =
        document.getElementById("harvestDate").value;

    const cropId =
        document.getElementById("harvestCrop").value;

    if (!quantity || !harvestDate || !cropId) {
        alert("Please fill all harvest fields");
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/harvest-batches`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantity: Number(quantity),
                    harvestDate: harvestDate,
                    crop: {
                        id: Number(cropId)
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add harvest");
        }

        alert("Harvest added successfully");

        document.getElementById("harvestQuantity").value = "";
        document.getElementById("harvestDate").value = "";
        document.getElementById("harvestCrop").value = "";

        await loadHarvests();

    } catch (error) {

        console.error(error);

        alert("Error adding harvest");
    }
}


/* =========================
   ADD SALE
========================= */
async function addSale() {

    const quantity =
        document.getElementById("saleQuantity").value;

    const price =
        document.getElementById("salePrice").value;

    const saleDate =
        document.getElementById("saleDate").value;

    const cropId =
        document.getElementById("saleCrop").value;

    if (!quantity || !price || !saleDate || !cropId) {
        alert("Please fill all sale fields");
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/sales`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantity: Number(quantity),
                    price: Number(price),
                    saleDate: saleDate,
                    crop: {
                        id: Number(cropId)
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add sale");
        }

        alert("Sale added successfully");

        document.getElementById("saleQuantity").value = "";
        document.getElementById("salePrice").value = "";
        document.getElementById("saleDate").value = "";
        document.getElementById("saleCrop").value = "";

        await loadSales();

    } catch (error) {

        console.error(error);

        alert("Error adding sale");
    }
}


/* =========================
   LOAD EVERYTHING
========================= */
document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log("FarmStock JavaScript started");

        await loadCrops();
        await loadHarvests();
        await loadSales();

    }
);