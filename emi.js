const principalSlider = document.getElementById('principal');
const durationSlider = document.getElementById('duration');
const interestSlider = document.getElementById('interest');

const principalValue = document.getElementById('principal-value');
const durationValue = document.getElementById('duration-value');
const interestValue = document.getElementById('interest-value');

const emiSpan = document.getElementById('emi');
const totalPaymentSpan = document.getElementById('total-payment');
const totalInterestSpan = document.getElementById('total-interest');
const amortizationSchedule = document.getElementById('amortization-schedule');

// Update values on slider change
function updateEMI() {
    const principal = parseFloat(principalSlider.value);
    const duration = parseFloat(durationSlider.value) * 12; // Convert years to months
    const annualRate = parseFloat(interestSlider.value);
    const monthlyRate = annualRate / 12 / 100;

    // EMI Formula
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
                (Math.pow(1 + monthlyRate, duration) - 1);

    const totalPayment = emi * duration;
    const totalInterest = totalPayment - principal;

    // Update UI 
    principalValue.textContent = principal.toLocaleString();
    durationValue.textContent = (duration / 12).toFixed(0);
    interestValue.textContent = annualRate.toFixed(1);

    emiSpan.textContent = emi.toFixed(2).toLocaleString();
    totalPaymentSpan.textContent = totalPayment.toFixed(2).toLocaleString();
    totalInterestSpan.textContent = totalInterest.toFixed(2).toLocaleString();

    // Calculate Amortization Schedule
    calculateAmortizationSchedule(principal, emi, monthlyRate, duration);
}

function calculateAmortizationSchedule(principal, emi, monthlyRate, duration) {
    amortizationSchedule.innerHTML = ""; // Clear previous schedule
    let remainingPrincipal = principal; 

    for (let month = 1; month <= duration; month++) {
        const interestForMonth = remainingPrincipal * monthlyRate;
        const principalForMonth = emi - interestForMonth;
        remainingPrincipal -= principalForMonth;

        // Append row to the amortization table
        amortizationSchedule.innerHTML += `
            <tr>
                <td>${month}</td>
                <td>${emi.toFixed(2).toLocaleString()}</td>
                <td>${interestForMonth.toFixed(2).toLocaleString()}</td>
                <td>${principalForMonth.toFixed(2).toLocaleString()}</td>
                <td>${Math.max(remainingPrincipal, 0).toFixed(2).toLocaleString()}</td>
            </tr>
        `;

        if (remainingPrincipal <= 0) break; // Loan fully repaid
    }
}

// Attach event listeners to sliders
principalSlider.addEventListener('input', updateEMI);
durationSlider.addEventListener('input', updateEMI);
interestSlider.addEventListener('input', updateEMI);

// Initialize with default values
updateEMI();

// Reset Button Functionality
document.getElementById('reset-btn').addEventListener('click', function () {
    principalSlider.value = 500000;
    durationSlider.value = 5;
    interestSlider.value = 7.5;
    updateEMI();
});