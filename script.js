```javascript
// =====================================
// AHMEDABAD EV CHARGING STATION WEBSITE
// =====================================

// Sample station data (demo data)
const stations = [
    {
        id: 1,
        name: "Tata Power Charging Station",
        area: "SG Highway",
        address: "SG Highway, Ahmedabad",
        charger: "DC Fast Charging",
        power: "60 kW",
        price: 18,
        status: "Available",
        lat: 23.0395,
        lng: 72.5065
    },
    {
        id: 2,
        name: "ChargeZone EV Station",
        area: "Prahlad Nagar",
        address: "Prahlad Nagar, Ahmedabad",
        charger: "Fast Charging",
        power: "30 kW",
        price: 16,
        status: "Available",
        lat: 23.0125,
        lng: 72.5100
    },
    {
        id: 3,
        name: "Statiq Charging Point",
        area: "Satellite",
        address: "Satellite, Ahmedabad",
        charger: "DC Fast Charging",
        power: "50 kW",
        price: 20,
        status: "Busy",
        lat: 23.0250,
        lng: 72.5150
    },
    {
        id: 4,
        name: "Ather Grid Station",
        area: "Bopal",
        address: "Bopal, Ahmedabad",
        charger: "AC Charging",
        power: "7 kW",
        price: 12,
        status: "Available",
        lat: 23.0330,
        lng: 72.4650
    },
    {
        id: 5,
        name: "Jio-bp Pulse Charging",
        area: "Maninagar",
        address: "Maninagar, Ahmedabad",
        charger: "Fast Charging",
        power: "30 kW",
        price: 17,
        status: "Available",
        lat: 22.9970,
        lng: 72.6050
    },
    {
        id: 6,
        name: "EV Charging Hub",
        area: "Thaltej",
        address: "Thaltej, Ahmedabad",
        charger: "DC Fast Charging",
        power: "60 kW",
        price: 19,
        status: "Busy",
        lat: 23.0500,
        lng: 72.4900
    }
];

// =====================================
// DISPLAY STATIONS
// =====================================

function displayStations(data = stations) {

    const container = document.getElementById("stationList");

    if (!container) return;

    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>No charging stations found.</p>";
        return;
    }

    data.forEach(station => {

        const card = document.createElement("div");

        card.className = "station-card";

        card.innerHTML = `
            <div class="station-info">

                <h3>${station.name}</h3>

                <p>📍 ${station.address}</p>

                <p>⚡ ${station.charger}</p>

                <p>🔋 Power: ${station.power}</p>

                <p>💰 ₹${station.price}/unit (demo price)</p>

                <span class="status ${
                    station.status === "Available"
                    ? "available"
                    : "busy"
                }">
                    ${station.status}
                </span>

                <br><br>

                <button onclick="bookStation(${station.id})">
                    Book Now
                </button>

                <button class="btn-outline"
                    onclick="showRoute(${station.id})">
                    Get Direction
                </button>

            </div>
        `;

        container.appendChild(card);

    });

}

// =====================================
// SEARCH STATIONS
// =====================================

function searchStations() {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const value = searchInput.value.toLowerCase();

    const filtered = stations.filter(station => {

        return (
            station.name.toLowerCase().includes(value) ||
            station.area.toLowerCase().includes(value) ||
            station.charger.toLowerCase().includes(value)
        );

    });

    displayStations(filtered);

}

// =====================================
// FILTER STATIONS
// =====================================

function filterStations() {

   
