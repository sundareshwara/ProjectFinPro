function calculateMaterials() {
    const area = document.getElementById('area').value;
    const constructionType = document.getElementById('constructionType').value;
    const location = document.getElementById('location').value;

    if (!area || isNaN(area) || area <= 0) {
        alert("Please enter a valid area!");
        return;
    }

    const totalArea = parseFloat(area);

    // Material estimates based on typical construction needs
    const materials = [
        { name: "Cement (in bags)", ratePerSqFt: 0.5 },
        { name: "Sand (in cubic feet)", ratePerSqFt: 0.75 },
        { name: "Bricks (in numbers)", ratePerSqFt: 7 },
        { name: "Steel (in kilograms)", ratePerSqFt: 4.5 },
        { name: "Aggregates (in cubic feet)", ratePerSqFt: 0.9 },
        { name: "Water (in liters)", ratePerSqFt: 15 },
        { name: "Paint (in liters)", ratePerSqFt: 0.2 },
        { name: "Electric Wiring (in meters)", ratePerSqFt: 1 },
        { name: "Plumbing Pipes (in meters)", ratePerSqFt: 0.5 }
    ];

    // Adjusting rates based on location (urban vs rural)
    const locationMultipliers = {
        urban: 1.2,  // Higher cost in urban areas due to transport, labor, etc.
        rural: 1.0   // Standard rate for rural areas
    };

    const locationMultiplier = locationMultipliers[location] || 1;

    // Adjusting material requirements based on construction type
    const constructionTypeMultipliers = {
        residential: 1.0,
        commercial: 1.2,  // Commercial buildings may require more materials
        industrial: 1.5   // Industrial projects often have higher material needs
    };

    const constructionMultiplier = constructionTypeMultipliers[constructionType] || 1;

    // Calculate total quantities for each material
    const materialDetails = materials.map(material => ({
        name: material.name,
        quantity: (material.ratePerSqFt * totalArea * locationMultiplier * constructionMultiplier).toFixed(2)
    }));

    // Calculate cost estimation
    const materialCosts = {
        "Cement (in bags)": 500,        // Price per unit
        "Sand (in cubic feet)": 50,
        "Bricks (in numbers)": 2,
        "Steel (in kilograms)": 60,
        "Aggregates (in cubic feet)": 40,
        "Water (in liters)": 5,
        "Paint (in liters)": 150,
        "Electric Wiring (in meters)": 10,
        "Plumbing Pipes (in meters)": 30
    };

    let totalCost = 0;
    materialDetails.forEach(material => {
        const cost = materialCosts[material.name] * material.quantity;
        totalCost += cost;
    });

    // Display material details
    const materialDetailsDiv = document.getElementById('material-details');
    materialDetailsDiv.innerHTML = `
        <h3>Material Estimation</h3>
        <table>
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                ${materialDetails.map(material => `
                    <tr>
                        <td>${material.name}</td>
                        <td>${material.quantity}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Display cost estimation
    const costEstimationDiv = document.getElementById('cost-estimation');
    costEstimationDiv.innerHTML = `
        <h3>Total Cost Estimation</h3>
        <p>Total material cost: ₹${totalCost.toLocaleString()}</p>
    `;
}
