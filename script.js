/* =====================================================
   VOLTROUTE - SMART EV CHARGING SYSTEM
   JAVASCRIPT
   ===================================================== */


/* ================= SEARCH STATION ================= */

function searchStation() {

    const input = document.getElementById("searchInput");

    const result = document.getElementById("searchResult");

    const searchText = input.value.trim().toLowerCase();


    if (searchText === "") {

        result.innerText =
            "Please enter a city or area name.";

        return;
    }


    if (
        searchText.includes("ahmedabad") ||
        searchText.includes("sg highway") ||
        searchText.includes("prahlad nagar") ||
        searchText.includes("satellite")
    ) {

        result.innerText =
            "Charging stations found! Scroll down to view available stations.";

    } else {

        result.innerText =
            "Sorry, no charging station found for this location.";
    }

}


/* ================= VIEW STATION ================= */

function viewStation(stationName) {

    alert(
        "Station: " + stationName +
        "\n\n" +
        "Charging Station Details" +
        "\nPower: Available" +
        "\nConnector: EV Compatible" +
        "\nStatus: Available" +
        "\n\n" +
        "Thank you for using VoltRoute!"
    );

}


/* ================= QR CODE ================= */

function showQR() {

    alert(
        "VoltRoute Charging Station QR" +
        "\n\n" +
        "Station ID: EV-AHD-001" +
        "\nLocation: SG Highway, Ahmedabad" +
        "\nPower: 60 kW" +
        "\nConnector: CCS2" +
        "\nPorts: 4" +
        "\n\n" +
        "Scan → Check Details → Start Charging → Pay"
    );

}


/* ================= PAYMENT ================= */

function paymentDemo() {

    alert(
        "Payment Successful! ✅" +
        "\n\n" +
        "Amount: ₹300" +
        "\nStation: Ahmedabad EV Hub" +
        "\nEnergy Used: 25 kWh" +
        "\n\n" +
        "Thank you for using VoltRoute."
    );

}


/* ================= FIRE EMERGENCY ================= */

function fireEmergency() {

    alert(
        "🔥 FIRE EMERGENCY" +
        "\n\n" +
        "1. Stop charging immediately." +
        "\n2. Move away from the charging area." +
        "\n3. Do not touch electrical equipment." +
        "\n4. Contact emergency services." +
        "\n\n" +
        "Emergency Number: 112"
    );

}


/* ================= ELECTRICAL EMERGENCY ================= */

function electricalEmergency() {

    alert(
        "⚠️ ELECTRICAL EMERGENCY" +
        "\n\n" +
        "Stop using the charging station." +
        "\nDo not touch damaged cables." +
        "\nMove to a safe area." +
        "\nControl room has been notified. (Demo)"
    );

}


/* ================= CONTROL ROOM ================= */

function contactControl() {

    alert(
        "📞 VOLTROUTE CONTROL ROOM" +
        "\n\n" +
        "Support Number: +91 98765 43210" +
        "\n\n" +
        "For immediate danger, contact emergency services."
    );

}


/* ================= CONTACT FORM ================= */

function contactMessage(event) {

    event.preventDefault();

    alert(
        "Message sent successfully! ✅" +
        "\n\n" +
        "Thank you for contacting VoltRoute."
    );

}


/* ================= PAGE LOADED ================= */

console.log(
    "VoltRoute Smart EV Charging System Loaded Successfully ⚡"
);
