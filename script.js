```javascript
/* =====================================================
   VOLTROUTE - SMART EV CHARGING SYSTEM
   JAVASCRIPT
   ===================================================== */


/* ================= SEARCH STATION ================= */

function searchStation() {

    const input =
        document.getElementById("searchInput");

    const result =
        document.getElementById("searchResult");

    const searchText =
        input.value.trim().toLowerCase();


    // Check empty search
    if (searchText === "") {

        result.innerHTML =
            "⚠️ Please enter a station name or city.";

        result.style.color = "orange";

        return;
    }


    // Charging station data
    const stations = [

        {
            name: "GreenCharge Station",
            city: "Ahmedabad",
            status: "Available"
        },

        {
            name: "EcoVolt Charging Hub",
            city: "Surat",
            status: "Available"
        },

        {
            name: "PowerDrive EV Point",
            city: "Vadodara",
            status: "Available"
        },

        {
            name: "VoltWay Station",
            city: "Rajkot",
            status: "Available"
        }

    ];


    // Search station
    const foundStation =
        stations.find(function(station) {

            return (
                station.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                station.city
                    .toLowerCase()
                    .includes(searchText)
            );

        });


    // Display search result
    if (foundStation) {

        result.innerHTML =
            "✅ " +
            foundStation.name +
            " found in " +
            foundStation.city +
            ". Status: " +
            foundStation.status;

        result.style.color = "#159447";

    } else {

        result.innerHTML =
            "❌ No charging station found for \"" +
            input.value +
            "\".";

        result.style.color = "red";

    }

}


/* ================= SELECT STATION ================= */

function selectStation(stationName) {

    const stationSelect =
        document.getElementById("station");


    // Automatically select station
    stationSelect.value = stationName;


    // Scroll to booking section
    document.getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= BOOKING FORM ================= */

const bookingForm =
    document.getElementById("bookingForm");


bookingForm.addEventListener(
    "submit",
    function(event) {

        // Stop page refresh
        event.preventDefault();


        // Get form values
        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const vehicle =
            document.getElementById("vehicle").value;

        const station =
            document.getElementById("station").value;

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;

        const duration =
            document.getElementById("duration").value;


        // Validate form
        if (
            name === "" ||
            email === "" ||
            vehicle === "" ||
            station === "" ||
            date === "" ||
            time === ""
        ) {

            alert(
                "Please fill all required fields."
            );

            return;
        }


        // Booking confirmation
        alert(
            "⚡ Booking Confirmed!\n\n" +

            "Name: " +
            name +

            "\nVehicle: " +
            vehicle +

            "\nStation: " +
            station +

            "\nDate: " +
            date +

            "\nTime: " +
            time +

            "\nDuration: " +
            duration +
            " Hour(s)"
        );


        // Clear form
        bookingForm.reset();

    }
);


/* ================= CHARGING COST CALCULATOR ================= */

function calculateCost() {

    // Get battery capacity
    const battery =
        parseFloat(
            document.getElementById("battery").value
        );


    // Get current battery percentage
    const current =
        parseFloat(
            document.getElementById("percentage").value
        );


    // Get target battery percentage
    const target =
        parseFloat(
            document.getElementById("target").value
        );


    // Result element
    const result =
        document.getElementById("costResult");


    // Check empty values
    if (
        isNaN(battery) ||
        isNaN(current) ||
        isNaN(target)
    ) {

        result.innerHTML =
            "⚠️ Please enter all values.";

        result.style.color = "orange";

        return;
    }


    // Check valid values
    if (
        battery <= 0 ||
        current < 0 ||
        current > 100 ||
        target <= 0 ||
        target > 100
    ) {

        result.innerHTML =
```
