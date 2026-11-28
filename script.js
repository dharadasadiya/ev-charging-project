```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

:root {
    --primary: #20a464;
    --primary-dark: #12804b;
    --light-green: #e9f8ef;
    --white: #ffffff;
    --dark: #18352a;
    --gray: #6b7c73;
    --border: #dcebe1;
    --shadow: 0 8px 25px rgba(25, 100, 60, 0.09);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Poppins', sans-serif;
    background: #f7fcf8;
    color: var(--dark);
}

/* HEADER */

header {
    width: 100%;
    background: var(--white);
    padding: 15px 7%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 15px rgba(0,0,0,0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.logo {
    font-size: 23px;
    font-weight: 800;
    color: var(--primary);
}

nav {
    display: flex;
    align-items: center;
    gap: 25px;
}

nav a {
    text-decoration: none;
    color: var(--dark);
    font-size: 14px;
    font-weight: 500;
    transition: 0.3s;
}

nav a:hover {
    color: var(--primary);
}

button {
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: 0.3s;
}

.btn,
.primary-btn {
    background: var(--primary);
    color: white;
    padding: 11px 22px;
    border-radius: 8px;
    font-weight: 600;
}

.btn:hover,
.primary-btn:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
}

.menu-toggle {
    display: none;
    background: transparent;
    font-size: 25px;
}

/* HERO SECTION */

.hero {
    padding: 80px 7%;
    background: linear-gradient(120deg, #e7f8ed, #ffffff);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 35px;
}

.hero h1 {
    font-size: clamp(32px, 5vw, 55px);
    line-height: 1.2;
    margin-bottom: 20px;
}

.hero h1 span {
    color: var(--primary);
}

.hero p {
    color: var(--gray);
    line-height: 1.8;
    max-width: 550px;
    margin-bottom: 25px;
}

.hero img {
    max-width: 45%;
    border-radius: 20px;
}

/* GENERAL SECTION */

section {
    padding: 65px 7%;
}

.section-title {
    text-align: center;
    margin-bottom: 35px;
}

.section-title h2 {
    font-size: 30px;
    margin-bottom: 10px;
}

.section-title p {
    color: var(--gray);
}

/* DASHBOARD */

.dashboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.stat-card {
    background: var(--white);
    padding: 25px;
    border-radius: 15px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
}

.stat-card h3 {
    color: var(--gray);
    font-size: 14px;
}

.stat-card h2 {
    color: var(--primary);
    font-size: 32px;
    margin-top: 10px;
}

/* SEARCH */

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
}

input,
select,
textarea {
    width: 100%;
    padding: 13px 15px;
    border: 1px solid var(--border);
    border-radius: 8px;
    outline: none;
    font-family: inherit;
    background: white;
}

input:focus,
select:focus,
textarea:focus {
    border-color: var(--primary);
}

/* STATION CARDS */

.station-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
}

.station-card {
    background: white;
    border: 1px solid var(--border);
    padding: 22px;
    border-radius: 15px;
    box-shadow: var(--shadow);
    transition: 0.3s;
}

.station-card:hover {
    transform: translateY(-5px);
}

.station-card h3 {
    font-size: 18px;
    margin-bottom: 10px;
}

.station-card p {
    color: var(--gray);
    font-size: 13px;
    margin: 7px 0;
}

.available {
    color: #159957;
    font-weight: 600;
}

.unavailable {
    color: #e74c3c;
    font-weight: 600;
}

.station-card button {
    margin-top: 15px;
    width: 100%;
}

/* MAP */

#map {
    width: 100%;
    height: 420px;
    border-radius: 15px;
    border: 2px solid var(--border);
    z-index: 1;
}

/* BOOKING */

.booking-list {
    display: grid;
    gap: 15px;
}

.booking-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
}

/* GUIDE */

.guide-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.guide-card {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: var(--shadow);
}

.guide-card h3 {
    color: var(--primary);
    margin-bottom: 12px;
}

/* EMERGENCY */

.emergency {
    background: #fff1ed;
    border: 1px solid #ffd5ca;
    padding: 25px;
    border-radius: 15px;
}

.emergency h2 {
    color: #d94332;
    margin-bottom: 10px;
}

/* MODAL */

dialog {
    border: none;
    border-radius: 16px;
    padding: 30px;
    width: min(450px, 92%);
    margin: auto;
    box-shadow: 0 15px 50px rgba(0,0,0,0.2);
}

dialog::backdrop {
    background: rgba(0,0,0,0.55);
}

dialog h2 {
    margin-bottom: 20px;
    color: var(--primary);
}

dialog form {
    display: grid;
    gap: 15px;
}

.close-btn {
    float: right;
    background: #ffe9e9;
    color: #d33;
    padding: 7px 12px;
    border-radius: 7px;
}

/* PAYMENT */

.payment-options {
    display: grid;
    gap: 10px;
}

.payment-options label {
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
}

/* FOOTER */

footer {
    background: #143d2b;
    color: white;
    padding: 35px 7%;
    text-align: center;
}

footer p {
    color: #d2e8da;
    font-size: 13px;
    margin-top: 10px;
}

/* RESPONSIVE DESIGN */

@media (max-width: 900px) {
    .station-list,
    .guide-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .hero img {
        max-width: 40%;
    }
}

@media (max-width: 650px) {
    header {
        padding: 15px 5%;
    }

    .menu-toggle {
        display: block;
    }

    nav {
        display: none;
        position: absolute;
        top: 65px;
        left: 0;
        width: 100%;
        background: white;
        padding: 20px;
        flex-direction: column;
        box-shadow: var(--shadow);
    }

    nav.active {
        display: flex;
    }

    .hero {
        flex-direction: column;
        text-align: center;
        padding: 55px 5%;
    }

    .hero img {
        max-width: 100%;
    }

    section {
        padding: 45px 5%;
    }

    .dashboard,
    .station-list,
    .guide-grid {
        grid-template-columns: 1fr;
    }

    .search-box {
        flex-direction: column;
    }

    #map {
        height: 320px;
    }
}
```
