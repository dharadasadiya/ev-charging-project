```javascript
"use strict";

// ==========================================
// EV CHARGE WEBSITE
// Frontend demonstration
// ==========================================

const $ = (id) => document.getElementById(id);

let userLocation = null;
let selectedStationId = 1;
let calculatedBill = 0;
let sessionTimer = null;
let sessionSeconds = 0;
let sessionEnergy = 0;
let sessionRunning = false;
let map = null;
let userMarker = null;
let stationMarkers = [];
let toastTimer = null;

const stations = [
    {
        id: 1,
        name: "Green EV Hub",
        city: "Ahmedabad",
        address: "Ahmedabad, Gujarat",
        lat: 23.0225,
        lng: 72.5714,
        power: 60,
        voltage: 400,
        connector: "CCS2",
        price: 18,
        status: "available"
    },
    {
        id: 2,
        name: "City Charge Point",
        city: "Ahmedabad",
        address: "Ahmedabad, Gujarat",
        lat: 23.0300,
        lng: 72.5800,
        power: 7.4,
        voltage: 230,
        connector: "Type 2",
        price: 12,
        status: "busy"
    },
    {
        id: 3,
        name: "Highway EV Station",
        city: "Ahmedabad",
        address: "Ahmedabad Region",
        lat: 23.0400,
        lng: 72.6000,
        power: 120,
        voltage: 400,
        connector: "CCS2",
        price: 20,
        status: "available"
    }
];

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function notify(message) {
    const toast = $("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

function getStatusLabel(status) {
    return {
        available: "● Available — Demo",
        busy: "● Occupied — Demo",
        offline: "● Offline — Demo"
    }[status] || "Unknown";
}

function distanceKm(lat1, lng1, lat2, lng2) {
    const toRadians = value => value * Math.PI / 180;

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) ** 2;

    return 6371 * 2 *
        Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ==========================================
// STATIONS
// ==========================================

function renderStations() {
    const query = $("stationSearch").value.trim().toLowerCase();
    const filter = $("statusFilter").value;

    let results = stations.filter(station => {
        const matchesSearch =
            station.name.toLowerCase().includes(query) ||
            station.city.toLowerCase().includes(query) ||
            station.address.toLowerCase().includes(query);

        const matchesStatus =
            filter === "all" || station.status === filter;

        return matchesSearch && matchesStatus;
    });

    if (userLocation) {
        results.sort((a, b) => {
            return distanceKm(
                userLocation.lat,
                userLocation.lng,
                a.lat,
                a.lng
            ) - distanceKm(
                userLocation.lat,
                userLocation.lng,
                b.lat,
                b.lng
            );
        });
    }

    $("stationGrid").innerHTML = "";

    if (!results.length) {
        $("stationGrid").innerHTML =
            '<article class="panel">No stations match your search.</article>';
        return;
    }

    results.forEach(station => {
        const distance = userLocation
            ? distanceKm(
                userLocation.lat,
                userLocation.lng,
                station.lat,
                station.lng
              ).toFixed(1) + " km away"
            : "Distance unavailable";

        const article = document.createElement("article");
        article.className = "panel station-card";

        article.innerHTML = `
            <div class="station-icon">⚡</div>

            <h3>${escapeHTML(station.name)}</h3>

            <p>📍 ${escapeHTML(station.address)}</p>
            <p>🔌 Connector: ${escapeHTML(station.connector)}</p>
            <p>⚡ Rated power: ${station.power} kW</p>
            <p>🔋 Nominal voltage: ${station.voltage} V</p>
            <p>💰 Demo price: ₹${station.price}/kWh</p>
            <p>📏 ${distance}</p>

            <p class="status ${station.status}">
                ${getStatusLabel(station.status)}
            </p>

            <div class="button-row">
                <button class="btn view-station"
                    data-id="${station.id}">
                    View Map
                </button>

                <button class="btn outline select-station"
                    data-id="${station.id}">
                    Select Charger
                </button>
            </div>
        `;

        $("stationGrid").appendChild(article);
    });

    document.querySelectorAll(".view-station").forEach(button => {
        button.addEventListener("click", () => {
            const station = stations.find(
                item => item.id === Number(button.dataset.id)
            );

            if (station) {
                showStationOnMap(station);
            }
        });
    });

    document.querySelectorAll(".select-station").forEach(button => {
        button.addEventListener("click", () => {
            selectStation(Number(button.dataset.id));
        });
    });

    $("stationCount").textContent = stations.length;

    $("availableCount").textContent = stations.filter(
        station => station.status === "available"
    ).length;
}

function selectStation(id) {
    const station = stations.find(item => item.id === id);

    if (!station) return;

    selectedStationId = id;

    $("selectedStation").textContent = station.name;
    $("sessionVoltage").textContent = station.voltage + " V*";
    $("sessionPower").textContent = station.power + " kW*";

    $("priceInput").value = station.price;

    calculateBill();

    notify(station.name + " selected.");
    $("session").scrollIntoView({ behavior: "smooth" });
}

$("stationSearch").addEventListener("input", renderStations);
$("statusFilter").addEventListener("change", renderStations);

$("nearbyButton").addEventListener("click", () => {
    if (!userLocation) {
        getMyLocation();
        notify("Allow location access to sort by distance.");
        return;
    }

    renderStations();

    $("stationGrid").scrollIntoView({ behavior: "smooth" });
});

// ==========================================
// MAP
// ==========================================

function initializeMap() {
    if (typeof L === "undefined") {
        $("map").innerHTML =
            "Map library unavailable. Check your internet connection.";
        return;
    }

    map = L.map("map").setView([23.0225, 72.5714], 12);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 19
        }
    ).addTo(map);

    stations.forEach(station => {
        const marker = L.marker([
            station.lat,
            station.lng
        ]).addTo(map);

        marker.bindPopup(`
            <strong>${escapeHTML(station.name)}</strong><br>
            ${station.power} kW rated power<br>
            ${station.voltage} V nominal voltage<br>
            Demo status: ${escapeHTML(station.status)}
        `);

        stationMarkers.push(marker);
    });
}

function showStationOnMap(station) {
    if (!map) {
        notify("Map is not ready. Check your internet connection.");
        return;
    }

    map.setView([station.lat, station.lng], 15);

    const marker = stationMarkers[stations.indexOf(station)];

    if (marker) marker.openPopup();

    $("map-section").scrollIntoView({ behavior: "smooth" });
}

function getMyLocation() {
    if (!navigator.geolocation) {
        $("locationMessage").textContent =
            "Geolocation is not supported by this browser.";
        return;
    }

    $("locationMessage").textContent =
        "Requesting permission to access your location...";

    navigator.geolocation.getCurrentPosition(
        position => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            $("locationStatus").textContent = "Located";

            $("locationMessage").textContent =
                "Location detected. Coordinates: " +
                userLocation.lat.toFixed(5) + ", " +
                userLocation.lng.toFixed(5) +
                ". Nearby distances are calculated from sample stations.";

            if (map) {
                map.setView([
                    userLocation.lat,
                    userLocation.lng
                ], 13);

                if (userMarker) {
                    userMarker.setLatLng([
                        userLocation.lat,
                        userLocation.lng
                    ]);
                } else {
                    userMarker = L.marker([
                        userLocation.lat,
                        userLocation.lng
                    ]).addTo(map);
                }

                userMarker.bindPopup("Your current location").openPopup();
            }

            renderStations();
        },
        error => {
            const errors = {
                1: "Location permission denied. Allow access in browser settings.",
                2: "Your current location is unavailable.",
                3: "Location request timed out. Please try again."
            };

            $("locationMessage").textContent =
                errors[error.code] || "Could not obtain your location.";

            notify("Unable to access location.");
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
        }
    );
}

$("getLocation").addEventListener("click", getMyLocation);
$("heroLocation").addEventListener("click", getMyLocation);

$("openMap").addEventListener("click", () => {
    const station = stations.find(item => item.id === selectedStationId);

    const lat = userLocation ? userLocation.lat : station.lat;
    const lng = userLocation ? userLocation.lng : station.lng;

    window.open(
        "https://www.openstreetmap.org/?mlat=" + lat +
        "&mlon=" + lng + "#map=14/" + lat + "/" + lng,
        "_blank",
        "noopener"
    );
});

// ==========================================
// CHARGING SESSION SIMULATION
// ==========================================

function updateSessionDisplay() {
    const station = stations.find(
        item => item.id === selectedStationId
    );

    const elapsedHours = sessionSeconds / 3600;

    sessionEnergy = station.power * elapsedHours;

    const cost = sessionEnergy * station.price;

    $("sessionEnergy").textContent =
        sessionEnergy.toFixed(3) + " kWh";

    $("sessionCost").textContent =
        "₹" + cost.toFixed(2);

    $("sessionMessage").textContent =
        "Demo session running for " +
        Math.floor(sessionSeconds / 60) + " minute(s). " +
        "This is a simulation, not a real charging session.";
}

$("startSession").addEventListener("click", () => {
    if (sessionRunning) {
        notify("Demo session is already running.");
        return;
    }

    const station = stations.find(
        item => item.id === selectedStationId
    );

    if (station.status !== "available") {
        notify("This demo station is not marked available.");
        return;
    }

    sessionRunning = true;

    $("sessionMessage").textContent =
        "Demo session started. No physical charger has been activated.";

    sessionTimer = setInterval(() => {
        sessionSeconds++;
        updateSessionDisplay();
    }, 1000);

    notify("Demo charging session started.");
});

$("stopSession").addEventListener("click", () => {
    clearInterval(sessionTimer);
    sessionTimer = null;
    sessionRunning = false;

    $("sessionMessage").textContent =
        "Demo session stopped. Estimated energy: " +
        sessionEnergy.toFixed(3) +
        " kWh. No actual charger was controlled.";

    notify("Demo session stopped.");
});

// ==========================================
// BILL CALCULATION
// ==========================================

function calculateBill() {
    const energy = Number($("energyInput").value);
    const price = Number($("priceInput").value);

    if (!Number.isFinite(energy) || !Number.isFinite(price) ||
        energy <= 0 || energy > 500 || price < 0 || price > 1000) {
        $("billTotal").textContent = "Invalid input";
        calculatedBill = 0;
        return false;
    }

    calculatedBill = energy * price;

    $("billTotal").textContent =
        "₹" + calculatedBill.toFixed(2);

    $("paymentMessage").textContent =
        "Estimated bill calculated. Taxes and extra fees are not included.";

    return true;
}

$("calculateBill").addEventListener("click", () => {
    if (calculateBill()) {
        notify("Estimated bill calculated.");
    } else {
        notify("Please enter valid charging values.");
    }
});

// ==========================================
// DEMO QR PAYMENT
// ==========================================

$("generateQR").addEventListener("click", () => {
    if (!calculateBill()) {
        notify("Calculate a valid bill first.");
        return;
    }

    const container = $("qrContainer");

    container.innerHTML = "";

    const description = document.createElement("p");

    description.textContent =
        "DEMO ONLY — Amount: ₹" + calculatedBill.toFixed(2);

    const qr = document.createElement("img");

    qr.className = "qr-image";
    qr.alt = "Non-payment demo QR code";

    const demoPayload = JSON.stringify({
        type: "EV_CHARGE_DEMO",
        station: selectedStationId,
        amount: calculatedBill.toFixed(2),
        currency: "INR"
    });

    qr.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
        encodeURIComponent(demoPayload);

    container.append(description, qr);

    $("paymentMessage").textContent =
        "Demo QR generated. It does not initiate or verify a payment.";

    notify("Demo QR generated.");
});

$("paymentDone").addEventListener("click", () => {
    $("paymentMessage").textContent =
        "DEMO ONLY: No payment was received or verified. " +
        "A real payment gateway and server-side verification are required.";

    notify("Demo payment cannot be confirmed as real.");
});

// ==========================================
// EMERGENCY ASSISTANCE
// ==========================================

$("emergencyLocation").addEventListener("click", () => {
    $("emergencyMessage").textContent =
        "Requesting location to find nearby sample stations.";

    getMyLocation();

    $("stations").scrollIntoView({ behavior: "smooth" });
});

$("emergencyCall").addEventListener("click", () => {
    const confirmed = confirm(
        "No emergency provider is configured. " +
        "Do you want to search for EV roadside assistance?"
    );

    if (confirmed) {
        window.open(
            "https://www.google.com/search?q=EV+roadside+assistance+near+me",
            "_blank",
            "noopener"
        );

        $("emergencyMessage").textContent =
            "Search opened. No assistance request has been sent.";
    }
});

// ==========================================
// SAFETY INFORMATION
// ==========================================

const safetyGuides = {
    temperature:
        "If a charger or cable is unusually hot, smoking, damaged or smells burnt, " +
        "stop using it if safe to do so and contact the station operator. " +
        "Actual temperature alerts require connected sensors.",

    voltage:
        "Never touch exposed electrical conductors. Only trained personnel " +
        "should investigate electrical faults. Live voltage readings require " +
        "compatible charger telemetry; demo values are not safety measurements.",

    stop:
        "For an immediate charging hazard, use the charger's physical emergency " +
        "stop if safe, keep clear of damaged equipment and contact emergency " +
        "services or the station operator. This website does not control the charger."
};

document.querySelectorAll(".safety-button").forEach(button => {
    button.addEventListener("click", () => {
        $("safetyOutput").textContent =
            safetyGuides[button.dataset.safety];

        $("safetyOutput").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});

// ==========================================
// DEMO LOGIN / SIGNUP
// ==========================================

// This is deliberately not real authentication.
// Do not store actual passwords in localStorage.

$("loginOpen").addEventListener("click", () => {
    $("loginModal").classList.add("show");
    $("loginModal").setAttribute("aria-hidden", "false");
});

function closeModal() {
    $("loginModal").classList.remove("show");
    $("loginModal").setAttribute("aria-hidden", "true");
}

$("closeModal").addEventListener("click", closeModal);

$("loginModal").addEventListener("click", event => {
    if (event.target === $("loginModal")) {
        closeModal();
    }
});

$("modalSignup").addEventListener("click", () => {
    $("authMode").value = "signup";
    closeModal();

    $("account").scrollIntoView({ behavior: "smooth" });
});

$("modalLogin").addEventListener("click", () => {
    $("authMode").value = "login";
    closeModal();

    $("account").scrollIntoView({ behavior: "smooth" });
});

$("authMode").addEventListener("change", () => {
    $("userPassword").value = "";
    $("authMessage").textContent = "";
});

$("authForm").addEventListener("submit", event => {
    event.preventDefault();

    const mode = $("authMode").value;
    const name = $("userName").value.trim();
    const email = $("userEmail").value.trim();

    if (!name || !email) {
        notify("Please complete the required fields.");
        return;
    }

    $("authMessage").textContent =
        mode === "signup"
            ? "Demo signup submitted for " + name +
              ". No account was created. Connect secure authentication."
            : "Demo login form submitted for " + email +
              ". Credentials were not verified.";

    // Password is intentionally not stored.
    $("userPassword").value = "";

    notify("Demo form submitted.");
});

$("logoutButton").addEventListener("click", () => {
    $("authMessage").textContent =
        "Demo session ended. No authenticated account was active.";
});

// ==========================================
// CONTACT FORM
// ==========================================

$("contactForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("contactName").value.trim();
    const email = $("contactEmail").value.trim();
    const topic = $("contactTopic").value;
    const message = $("contactText").value.trim();

    if (!name || !email || !message) {
        notify("Please complete all required fields.");
        return;
    }

    const subject = encodeURIComponent(
        "EV Charge Support - " + topic
    );

    const body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Topic: " + topic + "\n\n" +
        "Message:\n" + message
    );

    $("contactMessage").textContent =
        "Your message is ready. Your email application will open; " +
        "sending it requires your confirmation.";

    window.location.href =
        "mailto:support@example.com?subject=" +
        subject + "&body=" + body;
});

// ==========================================
// MOBILE MENU
// ==========================================

$("menuToggle").addEventListener("click", () => {
    $("navigation").classList.toggle("open");
});

document.querySelectorAll("#navigation a").forEach(link => {
    link.addEventListener("click", () => {
        $("navigation").classList.remove("open");
    });
});

// ==========================================
// START WEBSITE
// ==========================================

renderStations();

if (typeof L !== "undefined") {
    initializeMap();
} else {
    window.addEventListener("load", () => {
        if (typeof L !== "undefined" && !map) {
            initializeMap();
        }
    });
}
```
