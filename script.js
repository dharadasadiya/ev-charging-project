const stations = [
  {
    id: 1,
    name: "EV Charging Hub",
    area: "SG Highway, Ahmedabad",
    connector: "CCS2",
    power: "60 kW",
    price: 18
  },
  {
    id: 2,
    name: "GreenCharge",
    area: "Prahlad Nagar, Ahmedabad",
    connector: "Type 2",
    power: "22 kW",
    price: 16
  },
  {
    id: 3,
    name: "VoltPoint",
    area: "Vastrapur, Ahmedabad",
    connector: "CCS2",
    power: "50 kW",
    price: 19
  },
  {
    id: 4,
    name: "CityCharge",
    area: "Maninagar, Ahmedabad",
    connector: "Bharat DC",
    power: "30 kW",
    price: 15
  },
  {
    id: 5,
    name: "EcoPlug",
    area: "Satellite, Ahmedabad",
    connector: "Type 2",
    power: "22 kW",
    price: 17
  },
  {
    id: 6,
    name: "ChargeWay",
    area: "Gota, Ahmedabad",
    connector: "CCS2",
    power: "60 kW",
    price: 18
  }
];

function displayStations() {
  const search = document
    .getElementById("stationSearch")
    .value.toLowerCase();

  const connector =
    document.getElementById("connectorFilter").value;

  const filtered = stations.filter(station =>
    (station.name + station.area).toLowerCase().includes(search) &&
    (connector === "all" || station.connector === connector)
  );

  document.getElementById("stationGrid").innerHTML =
    filtered.map(station => `
      <div class="station-card">
        <h3>${station.name}</h3>
        <p>📍 ${station.area}</p>
        <p>⚡ ${station.power}</p>
        <p>🔌 ${station.connector}</p>
        <p>₹${station.price} per kWh</p>

        <a class="btn"
          href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.area)}"
          target="_blank">
          Get Directions
        </a>

        <button class="btn" onclick="bookStation(${station.id})">
          Book Slot
        </button>
      </div>
    `).join("");
}

document.getElementById("stationSearch")
  .addEventListener("input", displayStations);

document.getElementById("connectorFilter")
  .addEventListener("change", displayStations);

function calculateCost() {
  const units = Number(document.getElementById("units").value);
  const rate = Number(document.getElementById("rate").value);

  if (units <= 0 || rate < 0) {
    alert("Please enter valid values.");
    return;
  }

  const total = units * rate;

  document.getElementById("result").innerText =
    "Estimated Cost: ₹" + total.toFixed(2);
}

function openAuth() {
  document.getElementById("authModal").classList.remove("hidden");
}

function closeAuth() {
  document.getElementById("authModal").classList.add("hidden");
}

document.getElementById("authBtn")
  .addEventListener("click", openAuth);

function signupUser() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  if (!name || !email || password.length < 6) {
    alert("Enter your name, valid email and password of at least 6 characters.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email]) {
    alert("This email is already registered.");
    return;
  }

  users[email] = { name, password };

  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");
}

function loginUser() {
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email] && users[email].password === password) {
    localStorage.setItem("currentUser", email);
    alert("Login successful!");
    closeAuth();
  } else {
    alert("Incorrect email or password.");
  }
}

function bookStation(id) {
  const email = localStorage.getItem("currentUser");

  if (!email) {
    alert("Please login before booking.");
    openAuth();
    return;
  }

  const station = stations.find(s => s.id === id);

  const date = prompt("Enter booking date (YYYY-MM-DD):");
  const time = prompt("Enter booking time (HH:MM):");

  if (!date || !time) return;

  const bookings = JSON.parse(
    localStorage.getItem("bookings") || "[]"
  );

  bookings.push({
    id: Date.now(),
    email,
    station: station.name,
    area: station.area,
    date,
    time
  });

  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Demo booking saved successfully!");
}

displayStations();
