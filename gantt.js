let ganttChart;

// Project activities and durations
const activities = [
    { name: "Foundation", duration: 30 },
    { name: "Framing", duration: 40 },
    { name: "Plumbing", duration: 20 },
    { name: "Electrical", duration: 15 },
    { name: "Interior Finishing", duration: 25 },
    { name: "Landscaping", duration: 10 },
];

// Function to initialize and animate Gantt Chart
function startGantt() {
    const projectSize = document.getElementById("projectSize").value;
    if (!projectSize || projectSize <= 0) {
        alert("Please enter a valid project size!");
        return;
    }

    const chartContainer = document.getElementById("chartContainer");
    chartContainer.classList.remove("hidden");

    // Scale durations based on project size (for demo purposes)
    const scaledDurations = activities.map((activity) => ({
        ...activity,
        duration: Math.ceil(activity.duration * (projectSize / 1000)),
    }));

    // Initialize the Gantt Chart
    generateGanttChart(scaledDurations);
}

// Function to create the Gantt Chart
function generateGanttChart(data) {
    const ctx = document.getElementById("ganttChart").getContext("2d");

    const labels = data.map((activity) => activity.name);
    const durations = data.map((activity) => activity.duration);
    const startDays = durations.reduce((acc, duration, index) => {
        acc.push((index === 0 ? 0 : acc[index - 1]) + duration);
        return acc;
    }, []);

    // Initialize data for Chart.js
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Project Duration (days)",
                data: durations,
                backgroundColor: "rgba(255, 223, 0, 0.7)",
                borderColor: "rgba(255, 223, 0, 1)",
                borderWidth: 1,
                base: startDays.map((start, i) => (i === 0 ? 0 : startDays[i - 1])), // Calculate base start for bars
            },
        ],
    };

    // Chart options
    const options = {
        indexAxis: "y", // Horizontal bars
        animation: {
            duration: 1000, // Set animation duration
            onProgress(animation) {
                const chartInstance = animation.chart;
                chartInstance.draw();
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Duration: ${context.raw} Days`;
                    },
                },
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Days",
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.3)",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Activities",
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    // Destroy existing chart before creating a new one
    if (ganttChart) {
        ganttChart.destroy();
    }

    // Create the Gantt Chart
    ganttChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: options,
    });
}
