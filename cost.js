// Initialize Chart Variables
let costChart, pieChart;

// Event Listener for Calculate Button
document.getElementById('calculate-btn').addEventListener('click', calculateCost);

function calculateCost() {
    const area = parseFloat(document.getElementById('area').value);
    const cityRate = parseFloat(document.getElementById('city').value);
    const materialMultiplier = parseFloat(
        document.querySelector('input[name="material-quality"]:checked').value
    );

    if (!area || !cityRate) {
        alert('Please enter a valid area and select a city!');
        return;
    }

    // Base cost and total cost
    const baseCost = area * cityRate;
    const totalCost = baseCost * materialMultiplier;

    // Cost breakdown based on materials
    const costDivisions = getCostDivisions(materialMultiplier, totalCost);

    // Display total cost
    document.getElementById('total-cost').innerText = `₹${totalCost.toLocaleString()}`;

    // Material suggestions
    updateSuggestions(materialMultiplier);

    // Update the Bar Chart
    updateBarChart(baseCost, totalCost);

    // Update the Pie Chart with cost divisions
    updatePieChart(costDivisions);
}

// Get cost divisions based on material quality
function getCostDivisions(materialMultiplier, totalCost) {
    const foundationCost = totalCost * 0.2 * materialMultiplier; // 20%
    const wallCost = totalCost * 0.25 * materialMultiplier; // 25%
    const flooringCost = totalCost * 0.15 * materialMultiplier; // 15%
    const roofingCost = totalCost * 0.2 * materialMultiplier; // 20%
    const finishingCost = totalCost * 0.1 * materialMultiplier; // 10%
    const laborCost = totalCost * 0.1; // 10%

    return {
        foundationCost,
        wallCost,
        flooringCost,
        roofingCost,
        finishingCost,
        laborCost,
    };
}

// Update Suggestions based on Material Quality
function updateSuggestions(materialMultiplier) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = ''; // Clear previous suggestions

    if (materialMultiplier === 1.0) {
        suggestionsList.innerHTML += '<li>Consider upgrading to Premium for better durability.</li>';
    } else if (materialMultiplier === 1.2) {
        suggestionsList.innerHTML += '<li>Premium materials provide better aesthetics and longevity.</li>';
    } else if (materialMultiplier === 0.9) {
        suggestionsList.innerHTML += `
            <li>Eco-friendly materials reduce carbon footprint and may qualify for green certifications.</li>
            <li>Consider bamboo, recycled steel, and low-VOC paints for eco-friendliness.</li>`;
    }
}

// Update the Bar Chart with the base and total cost
function updateBarChart(baseCost, totalCost) {
    const chartData = [baseCost, totalCost];

    if (costChart) {
        costChart.data.datasets[0].data = chartData;
        costChart.update();
    } else {
        const ctx = document.getElementById('costChart').getContext('2d');
        costChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Base Cost', 'Total Cost'],
                datasets: [
                    {
                        label: 'Cost (in ₹)',
                        data: chartData,
                        backgroundColor: ['#007bff', '#28a745'],
                        borderColor: ['#0056b3', '#19692c'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

// Update the Pie Chart with cost divisions
function updatePieChart(costDivisions) {
    const { foundationCost, wallCost, flooringCost, roofingCost, finishingCost, laborCost } = costDivisions;
    const chartData = [foundationCost, wallCost, flooringCost, roofingCost, finishingCost, laborCost];

    if (pieChart) {
        pieChart.data.datasets[0].data = chartData;
        pieChart.update();
    } else {
        const ctx = document.getElementById('pieChart').getContext('2d');
        pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    'Foundation Cost',
                    'Wall Cost',
                    'Flooring Cost',
                    'Roofing Cost',
                    'Finishing Cost',
                    'Labor Cost',
                ],
                datasets: [  
                    {
                        data: chartData,
                        backgroundColor: [
                            '#ffc107',
                            '#17a2b8',
                            '#28a745',
                            '#fd7e14',
                            '#6f42c1',
                            '#dc3545',
                        ],
                        borderColor: [
                            '#c69500',
                            '#10707e',
                            '#19692c',
                            '#b35b0d',
                            '#50318d',
                            '#a72e32',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `₹${tooltipItem.raw.toLocaleString()}`;
                            },
                        },
                    },
                },
            },
        });
    }
}
