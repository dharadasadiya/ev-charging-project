/* =========================================================
   GREENCHARGE EV WEBSITE
   Frontend Demo
   ========================================================= */


/* ================= DATA ================= */

const stations = [

    {
        id: 1,
        name: "GreenCharge Hub",
        address: "SG Highway, Ahmedabad",
        lat: 23.0775,
        lng: 72.5170,
        status: "available",
        chargers: 8,
        available: 5,
        power: 60,
        price: 12,
        type: "fast"
    },

    {
        id: 2,
        name: "EcoVolt Station",
        address: "Prahlad Nagar, Ahmedabad",
        lat: 23.0125,
        lng: 72.5100,
        status: "available",
        chargers: 12,
        available: 8,
        power: 120,
        price: 15,
        type: "fast"
    },

    {
        id: 3,
        name: "PowerUp EV Point",
        address: "Navrangpura, Ahmedabad",
        lat: 23.0395,
        lng: 72.5600,
        status: "busy",
        chargers: 6,
        available: 1,
        power: 50,
        price: 10,
        type: "normal"
    },

    {
        id: 4,
        name: "VoltWay Charging",
        address: "Satellite, Ahmedabad",
        lat: 23.0258,
        lng: 72.5090,
        status: "available",
        chargers: 10,
        available: 6,
        power: 40,
        price: 9,
        type: "normal"
    },

    {
        id: 5,
        name: "Green Mobility Point",
        address: "Bodakdev, Ahmedabad",
        lat: 23.0400,
        lng: 72.5250,
        status: "offline",
        chargers: 4,
        available: 0,
        power: 30,
        price: 8,
        type: "normal"
    },

    {
        id: 6,
        name: "FastCharge Arena",
        address: "Vastrapur, Ahmedabad",
        lat: 23.0370,
        lng: 72.5290,
        status: "available",
        chargers: 16,
        available: 12,
        power: 180,
        price: 18,
        type: "fast"
    }

];


let map;

let userMarker = null;

let stationMarkers = [];

let userLocation = null;

let currentPayment = "upi";


/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeMap();

    renderStations(stations);

    populateBookingStations();

    renderAdminTable();

    renderBookingHistory();

    setMinimumDate();

    updateBookingPrice();

    document
        .getElementById("duration")
        ?.addEventListener("change", updateBookingPrice);

    document
        .getElementById("bookingStation")
        ?.addEventListener("change", updateBookingPrice);

    updateLoginButton();

});


/* ================= MAP ================= */

function initializeMap() {

    map = L.map("map").setView(
        [23.0225, 72.5714],
        12
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(map);


    stations.forEach(station => {

        const color =
            station.status === "available"
                ? "#2e9d4d"
                : station.status === "busy"
                    ? "#f59e0b"
                    : "#e53935";


        const icon = L.divIcon({

            className: "custom-map-marker",

            html: `
                <div style="
                    width:32px;
                    height:32px;
                    background:${color};
                    border:3px solid white;
                    border-radius:50% 50% 50% 0;
                    transform:rotate(-45deg);
                    box-shadow:0 3px 10px rgba(0,0,0,.25);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                ">
                    <i class="fa-solid fa-bolt"
                       style="
                       color:white;
                       transform:rotate(45deg);
                       font-size:13px;
                       ">
                    </i>
                </div>
            `,

            iconSize: [32, 32],
            iconAnchor: [16, 32]

        });


        const marker = L.marker(
            [station.lat, station.lng],
            { icon }
        ).addTo(map);


        marker.bindPopup(`
            <div style="min-width:190px">
                <strong>${station.name}</strong>

                <p style="margin:5px 0;color:#718078">
                    ${station.address}
                </p>

                <p>
                    <b>${station.available}</b>
                    / ${station.chargers} chargers available
                </p>

                <p>
                    ${station.power} kW • ₹${station.price}/kWh
                </p>

                <button
                    onclick="bookStation(${station.id})"
                    style="
                        border:none;
                        background:#258542;
                        color:white;
                        padding:8px 12px;
                        border-radius:7px;
                        cursor:pointer;
                    ">
                    Book Now
                </button>
            </div>
        `);


        stationMarkers.push({
            station,
            marker
        });

    });

}


/* ================= RENDER STATIONS ================= */

function renderStations(data) {

    const list =
        document.getElementById("stationList");

    if (!list) return;

    if (!data.length) {

        list.innerHTML = `
            <div class="no-result">
                <i class="fa-solid fa-charging-station"
                   style="font-size:30px;margin-bottom:10px">
                </i>

                <p>No charging stations found.</p>
            </div>
        `;

        return;
    }


    list.innerHTML = data.map(station => `

        <div class="station-card"
             onclick="focusStation(${station.id})">

            <div class="station-top">

                <div class="station-title">

                    <div class="station-icon">
                        <i class="fa-solid fa-bolt"></i>
                    </div>

                    <div>

                        <h3>${station.name}</h3>

                        <p>
                            <i class="fa-solid fa-location-dot"></i>
                            ${station.address}
                        </p>

                    </div>

                </div>

                <span class="status ${station.status}">
                    ${station.status}
                </span>

            </div>


            <div class="station-meta">

                <span>
                    <i class="fa-solid fa-plug"></i>
                    ${station.available}/${station.chargers} Available
                </span>

                <span>
                    <i class="fa-solid fa-bolt"></i>
                    ${station.power} kW
                </span>

                <span>
                    <i class="fa-solid fa-clock"></i>
                    24/7
                </span>

            </div>


            <div class="station-bottom">

                <div class="price">

                    <strong>
                        ₹${station.price}
                    </strong>

                    <span>/kWh</span>

                </div>


                <div class="station-actions">

                    <button class="small-btn"
                            onclick="event.stopPropagation(); showStationDetails(${station.id})">

                        Details

                    </button>

                    <button class="small-btn primary"
                            onclick="event.stopPropagation(); bookStation(${station.id})">

                        Book

                    </button>

                </div>

            </div>

        </div>

    `).join("");

}


/* ================= FILTER ================= */

function filterStations(filter, button) {

    document
        .querySelectorAll(".filter")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    button.classList.add("active");


    let result = stations;


    if (filter === "available") {

        result = stations.filter(
            s => s.status === "available"
        );

    }


    if (filter === "fast") {

        result = stations.filter(
            s => s.type === "fast"
        );

    }


    if (filter === "free") {

        result = stations.filter(
            s => s.price <= 10
        );

    }


    renderStations(result);

}


/* ================= MAP FOCUS ================= */

function focusStation(id) {

    const station =
        stations.find(s => s.id === id);

    if (!station || !map) return;


    map.flyTo(
        [station.lat, station.lng],
        15,
        {
            duration: 1
        }
    );


    const markerData =
        stationMarkers.find(
            x => x.station.id === id
        );

    markerData?.marker.openPopup();

}


function zoomMap(direction) {

    if (!map) return;

    if (direction > 0) {
        map.zoomIn();
    } else {
        map.zoomOut();
    }

}


/* ================= LOCATION ================= */

function getLiveLocation() {

    if (!navigator.geolocation) {

        showToast(
            "Your browser does not support location."
        );

        return;
    }


    showToast(
        "Requesting your live location..."
    );


    navigator.geolocation.getCurrentPosition(

        position => {

            const lat =
                position.coords.latitude;

            const lng =
                position.coords.longitude;


            userLocation = {
                lat,
                lng
            };


            document.getElementById(
                "locationText"
            ).textContent =
                `${lat.toFixed(5)}, ${lng.toFixed(5)}`;


            if (userMarker) {

                userMarker.setLatLng([
                    lat,
                    lng
                ]);

            } else {

                userMarker =
                    L.marker(
                        [lat, lng]
                    ).addTo(map);

                userMarker.bindPopup(
                    "<b>You are here</b>"
                );

            }


            map.flyTo(
                [lat, lng],
                14,
                {
                    duration: 1.2
                }
            );


            userMarker.openPopup();


            showToast(
                "Live location detected successfully."
            );

        },

        error => {

            let message =
                "Unable to get your location.";

            if (error.code === 1) {
                message =
                    "Location permission denied.";
            }

            if (error.code === 2) {
                message =
                    "Location unavailable.";
            }

            if (error.code === 3) {
                message =
                    "Location request timed out.";
            }

            showToast(message);

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}


function locateOnMap() {

    if (userLocation) {

        map.flyTo(
            [userLocation.lat, userLocation.lng],
            15
        );

    } else {

        getLiveLocation();

    }

}


/* ================= NEAREST STATIONS ================= */

function findNearbyStations() {

    if (!userLocation) {

        getLiveLocation();

        showToast(
            "Allow location access to find nearby stations."
        );

        return;
    }


    const sorted =
        stations
            .map(station => ({
                ...station,

                distance:
                    calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        station.lat,
                        station.lng
                    )

            }))
            .sort(
                (a,b) =>
                    a.distance - b.distance
            );


    renderStations(sorted);


    scrollToSection("stations");


    showToast(
        `Nearest station: ${sorted[0].name}`
    );

}


function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;

    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;

}


/* ================= STATION DETAILS ================= */

function showStationDetails(id) {

    const station =
        stations.find(s => s.id === id);

    if (!station) return;


    const distance =
        userLocation
            ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                station.lat,
                station.lng
            ).toFixed(1)
            : null;


    alert(
`
${station.name}

📍 ${station.address}

Status: ${station.status.toUpperCase()}

Chargers: ${station.available}/${station.chargers} available

Power: ${station.power} kW

Price: ₹${station.price}/kWh

${distance ? `Distance: ${distance} km` : ""}

Open 24/7
`
    );

}


/* ================= BOOKING ================= */

function populateBookingStations() {

    const select =
        document.getElementById(
            "bookingStation"
        );

    if (!select) return;


    stations.forEach(station => {

        const option =
            document.createElement("option");

        option.value =
            station.id;

        option.textContent =
            `${station.name} - ₹${station.price}/kWh`;

        select.appendChild(option);

    });

}


function bookStation(id) {

    const station =
        stations.find(s => s.id === id);

    if (!station) return;


    if (station.status === "offline") {

        showToast(
            "This station is currently offline."
        );

        return;
    }


    document.getElementById(
        "bookingStation"
    ).value = id;


    updateBookingPrice();

    scrollToSection("booking");

    showToast(
        `${station.name} selected for booking.`
    );

}


function setMinimumDate() {

    const input =
        document.getElementById(
            "bookingDate"
        );

    if (!input) return;

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    input.min = today;

    input.value = today;

}


function updateBookingPrice() {

    const stationId =
        Number(
            document.getElementById(
                "bookingStation"
            )?.value
        );

    const duration =
        Number(
            document.getElementById(
                "duration"
            )?.value || 30
        );


    const station =
        stations.find(
            s => s.id === stationId
        );


    const priceElement =
        document.getElementById(
            "estimatedPrice"
        );


    if (!priceElement) return;


    if (!station) {

        priceElement.textContent =
            "₹0";

        return;
    }


    const estimatedKwh =
        duration / 60 * 20;

    const total =
        Math.round(
            estimatedKwh *
            station.price
        );


    priceElement.textContent =
        `₹${total}`;


    document.getElementById(
        "paymentAmount"
    ).textContent =
        `₹${total}`;

}


function submitBooking(event) {

    event.preventDefault();


    const stationId =
        Number(
            document.getElementById(
                "bookingStation"
            ).value
        );

    const date =
        document.getElementById(
            "bookingDate"
        ).value;

    const time =
        document.getElementById(
            "bookingTime"
        ).value;

    const charger =
        document.getElementById(
            "chargerType"
        ).value;

    const duration =
        document.getElementById(
            "duration"
        ).value;


    const station =
        stations.find(
            s => s.id === stationId
        );


    if (!station) {

        showToast(
            "Please select a station."
        );

        return;
    }


    const booking = {

        id:
            Date.now(),

        station:
            station.name,

        date,

        time,

        charger,

        duration,

        price:
            document.getElementById(
                "estimatedPrice"
            ).textContent,

        status:
            "Confirmed"

    };


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "greencharge_bookings"
            ) || "[]"
        );


    bookings.unshift(booking);


    localStorage.setItem(
        "greencharge_bookings",
        JSON.stringify(bookings)
    );


    renderBookingHistory();


    document.getElementById(
        "bookingStation"
    ).value = "";


    showToast(
        "Booking confirmed successfully!"
    );


    document.getElementById(
        "paymentAmount"
    ).textContent =
        booking.price;


    scrollToSection("dashboard");

}


/* ================= BOOKING HISTORY ================= */

function renderBookingHistory() {

    const container =
        document.getElementById(
            "bookingHistory"
        );

    if (!container) return;


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "greencharge_bookings"
            ) || "[]"
        );


    if (!bookings.length) {

        container.innerHTML = `
            <div class="booking-item">
                <div>
                    <strong>No bookings yet</strong>
                    <small>
                        Your confirmed bookings will appear here.
                    </small>
                </div>
            </div>
        `;

        return;
    }


    container.innerHTML =
        bookings
            .slice(0, 5)
            .map(
                booking => `

                <div class="booking-item">

                    <div>

                        <strong>
                            ${booking.station}
                        </strong>

                        <small>
                            ${booking.date}
                            •
                            ${booking.time}
                            •
                            ${booking.duration} min
                        </small>

                    </div>

                    <strong>
                        ${booking.price}
                    </strong>

                </div>

            `
            )
            .join("");

}


function showAllBookings() {

    const bookings =
        JSON.parse(
            localStorage.getItem(
                "greencharge_bookings"
            ) || "[]"
        );


    if (!bookings.length) {

        showToast(
            "No bookings available."
        );

        return;
    }


    alert(
        bookings
            .map(
                (b, i) =>
                    `${i + 1}. ${b.station}
${b.date} ${b.time}
${b.duration} minutes
${b.price}
Status: ${b.status}`
            )
            .join("\n\n")
    );

}


/* ================= PAYMENT ================= */

function selectPayment(type, button) {

    currentPayment = type;


    document
        .querySelectorAll(".payment-tab")
        .forEach(
            btn =>
                btn.classList.remove("active")
        );


    button.classList.add("active");


    document
        .getElementById("upiPayment")
        .classList.toggle(
            "hidden",
            type !== "upi"
        );


    document
        .getElementById("cardPayment")
        .classList.toggle(
            "hidden",
            type !== "card"
        );

}


function copyUPI() {

    navigator.clipboard
        ?.writeText(
            "greencharge@upi"
        )
        .then(() => {

            showToast(
                "UPI ID copied!"
            );

        })
        .catch(() => {

            showToast(
                "UPI ID: greencharge@upi"
            );

        });

}


function makePayment() {

    const amount =
        document.getElementById(
            "paymentAmount"
        ).textContent;


    if (currentPayment === "card") {

        const card =
            document.getElementById(
                "cardNumber"
            ).value;


        if (card.replace(/\s/g, "").length < 12) {

            showToast(
                "Enter a valid demo card number."
            );

            return;
        }

    }


    showToast(
        `Payment of ${amount} successful!`
    );

}


/* ================= EMERGENCY ================= */

function callEmergency() {

    if (
        confirm(
            "Call emergency number 112?"
        )
    ) {

        window.location.href =
            "tel:112";

    }

}


function sendEmergencyLocation() {

    if (!userLocation) {

        getLiveLocation();

        showToast(
            "Detecting location first..."
        );

        return;
    }


    const text =
        `Emergency! My current location is:
https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;


    const whatsapp =
        `https://wa.me/?text=${encodeURIComponent(text)}`;


    window.open(
        whatsapp,
        "_blank"
    );

}


/* ================= LOGIN ================= */

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");

}


function openSignup() {

    document
        .getElementById("signupModal")
        .classList.add("show");

}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");

}


function switchToSignup() {

    closeModal("loginModal");

    openSignup();

}


function switchToLogin() {

    closeModal("signupModal");

    openLogin();

}


function signupUser(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "signupName"
        ).value;

    const email =
        document.getElementById(
            "signupEmail"
        ).value;

    const password =
        document.getElementById(
            "signupPassword"
        ).value;


    const user = {
        name,
        email,
        password
    };


    localStorage.setItem(
        "greencharge_user",
        JSON.stringify(user)
    );


    closeModal("signupModal");

    showToast(
        "Account created successfully!"
    );


    document.getElementById(
        "loginNavBtn"
    ).textContent =
        name.split(" ")[0];

}


function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "loginEmail"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const saved =
        JSON.parse(
            localStorage.getItem(
                "greencharge_user"
            )
        );


    if (
        saved &&
        saved.email === email &&
        saved.password === password
    ) {

        closeModal("loginModal");

        showToast(
            `Welcome back, ${saved.name}!`
        );

        updateLoginButton();

        return;
    }


    if (!saved) {

        showToast(
            "No account found. Please sign up first."
        );

    } else {

        showToast(
            "Incorrect email or password."
        );

    }

}


function updateLoginButton() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "greencharge_user"
            )
        );


    const button =
        document.getElementById(
            "loginNavBtn"
        );


    if (!button) return;


    if (saved) {

        button.textContent =
            saved.name.split(" ")[0];

        button.onclick =
            logoutUser;

    }

}


function logoutUser() {

    if (
        confirm(
            "Do you want to logout?"
        )
    ) {

        localStorage.removeItem(
            "greencharge_user"
        );

        const button =
            document.getElementById(
                "loginNavBtn"
            );

        button.textContent =
            "Login";

        button.onclick =
            openLogin;


        showToast(
            "Logged out successfully."
        );

    }

}


/* ================= ADMIN ================= */

function renderAdminTable() {

    const tbody =
        document.getElementById(
            "adminTable"
        );

    if (!tbody) return;


    tbody.innerHTML =
        stations
            .map(
                station => `

                <tr>

                    <td>
                        <strong>
                            ${station.name}
                        </strong>
                    </td>

                    <td>
                        <span class="status ${station.status}">
                            ${station.status}
                        </span>
                    </td>

                    <td>
                        ${station.available}/${station.chargers}
                    </td>

                    <td>
                        ${station.power} kW
                    </td>

                    <td>
                        ₹${station.price}/kWh
                    </td>

                </tr>

            `
            )
            .join("");

}


function adminAction(type) {

    if (type === "stations") {

        showToast(
            "Station management opened."
        );

        scrollToSection("stations");

        return;
    }


    if (type === "users") {

        showToast(
            "Demo: 10,284 registered users."
        );

        return;
    }

}


function showReport() {

    alert(
`
GREENCHARGE MONTHLY REPORT

Total Stations: ${stations.length}

Available Stations:
${stations.filter(s => s.status === "available").length}

Total Chargers:
${stations.reduce((a,s) => a + s.chargers, 0)}

Available Chargers:
${stations.reduce((a,s) => a + s.available, 0)}

Total Energy:
126.8 kWh

Revenue:
₹1,482

CO₂ Saved:
42.6 kg
`
    );

}


function showSystemStats() {

    const total =
        stations.reduce(
            (sum, s) =>
                sum + s.chargers,
            0
        );

    const available =
        stations.reduce(
            (sum, s) =>
                sum + s.available,
            0
        );


    alert(
`
SYSTEM STATUS

Stations: ${stations.length}

Total Chargers: ${total}

Available Chargers: ${available}

System: ONLINE

Map: ONLINE

Booking: ONLINE

Payment Demo: ONLINE
`
    );

}


/* ================= DASHBOARD ================= */

function refreshDashboard() {

    const energy =
        (120 + Math.random() * 20)
            .toFixed(1);

    const spent =
        Math.round(
            1400 +
            Math.random() * 200
        );


    document.getElementById(
        "totalEnergy"
    ).textContent =
        `${energy} kWh`;


    document.getElementById(
        "totalSpent"
    ).textContent =
        `₹${spent}`;


    showToast(
        "Dashboard refreshed."
    );

}


/* ================= UI ================= */

function scrollToSection(id) {

    document
        .getElementById(id)
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


function toggleMenu() {

    document
        .getElementById("navLinks")
        .classList.toggle("show");

}


function socialMessage(platform) {

    showToast(
        `${platform} social page demo.`
    );

}


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    const text =
        document.getElementById(
            "toastMessage"
        );


    text.textContent = message;

    toast.classList.add("show");


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            () => {
                toast.classList.remove(
                    "show"
                );
            },
            3000
        );

}


/* ================= MODAL EVENTS ================= */

window.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.remove(
                "show"
            );

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            document
                .querySelectorAll(".modal.show")
                .forEach(
                    modal =>
                        modal.classList.remove(
                            "show"
                        )
                );

        }

    }
);


/* ================= ONLINE STATUS ================= */

window.addEventListener(
    "online",
    () => {

        showToast(
            "Internet connection restored."
        );

    }
);


window.addEventListener(
    "offline",
    () => {

        showToast(
            "You are currently offline."
        );

    }
);
