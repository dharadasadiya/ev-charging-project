```javascript
/* =====================================================
   GREENCHARGE EV - JAVASCRIPT
   ===================================================== */


/* =====================================================
   GLOBAL VARIABLES
   ===================================================== */

let selectedPaymentMethod = "UPI";

let currentUser = null;

let userLocation = null;


/* =====================================================
   PAGE LOAD
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("GreenCharge EV website loaded.");

    // Set minimum booking date to today
    const dateInput = document.getElementById("bookingDate");

    if (dateInput) {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }

    // Load saved user
    const savedUser = localStorage.getItem("greenchargeUser");

    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch (error) {
            currentUser = null;
        }
    }

});


/* =====================================================
   HELPER - SHOW TOAST
   ===================================================== */

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    if (!toast || !toastMessage) {
        alert(message);
        return;
    }

    toastMessage.textContent = message;

    const icon = toast.querySelector("i");

    if (icon) {

        if (type === "error") {
            icon.className = "fa-solid fa-circle-xmark";
        } else if (type === "warning") {
            icon.className = "fa-solid fa-triangle-exclamation";
        } else {
            icon.className = "fa-solid fa-circle-check";
        }

    }

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3500);
}


/* =====================================================
   SCROLL TO SECTION
   ===================================================== */

function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

}


/* =====================================================
   LIVE LOCATION
   ===================================================== */

function getLiveLocation() {

    const locationText = document.getElementById("locationText");
    const locationTitle = document.getElementById("locationTitle");

    if (!navigator.geolocation) {

        showToast(
            "Your browser does not support location services.",
            "erro
```
