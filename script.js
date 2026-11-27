// Ahmedabad EV Charging Stations
const stations = [
    {
        name: "Tata Power Charging Station",
        area: "SG Highway",
        type: "DC Fast Charging",
        power: "60 kW"
    },
    {
        name: "Statiq Charging Station",
        area: "Prahlad Nagar",
        type: "DC Fast Charging",
        power: "30 kW"
    },
    {
        name: "ChargeZone Station",
        area: "Satellite",
        type: "DC Fast Charging",
        power: "60 kW"
    },
    {
        name: "Jio-bp Pulse",
        area: "Thaltej",
        type: "Fast Charging",
        power: "50 kW"
    },
    {
        name: "Ather Grid",
        area: "Vastrapur",
        type: "AC Charging",
        power: "7 kW"
    },
    {
        name: "EV Charging Point",
        area: "Bopal",
        type: "AC Charging",
        power: "22 kW"
    }
];

// Display stations
function displayStations(data) {

    const list = document.getElementById("stationList");

    list.innerHTML = "";

    data.forEach((station) => {

        list.innerHTML += `
            <div class="station-card">

                <h3>${station.name}</h3>

                <p>Location: ${station.area}</p>

                <p>Type: ${station.type}</p>

                <p>Power: ${station.power}</p>

                <a target="_blank"
                   href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.name + " " + station.area + " Ahmedabad")}">
                   View on Google Maps
                </a>

            </div>
        `;

    });
}

// Search station
function searchStation() {

    const value = document
        .getElementById("search")
        .value.toLowerCase();

    const filtered = stations.filter(station =>

        station.name.toLowerCase().includes(value) ||
        station.area.toLowerCase().includes(value)

    );

    displayStations(filtered);
}

// Fill station dropdown
const dropdown = document.getElementById("station");

stations.forEach((station, index) => {

    const option = document.createElement("option");

    option.value = index;
    option.textContent = station.name + " - " + station.area;

    dropdown.appendChild(option);

});

// Booking system
document.getElementById("bookingForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const booking = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        station: dropdown.value,

        date: document.getElementById("date").value,

        time: document.getElementById("time").value

    };

    let bookings = JSON.parse(
        localStorage.getItem("bookings") || "[]"
    );

    bookings.push(booking);

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    document.getElementById("bookingMessage")
    .innerHTML = "Booking saved successfully!";

    this.reset();

});

// Charging cost calculator
function calculateCost() {

    const units = Number(
        document.getElementById("units").value
    );

    const price = Number(
        document.getElementById("price").value
    );

    if (units <= 0 || price < 0 ||
        !Number.isFinite(units + price)) {

        document.getElementById("result")
        .innerHTML = "Please enter valid values.";

        return;
    }

    const total = units * price;

    document.getElementById("result")
    .innerHTML = "Estimated Cost: ₹" + total.toFixed(2);

}

// Initial display
displayStations(stations);
