:root {
    --primary: #55b96a;
    --primary-dark: #258542;
    --primary-light: #eaf8ed;
    --green: #16733a;

    --white: #ffffff;
    --black: #142019;
    --text: #25352b;
    --muted: #718078;

    --border: #e2ebe5;
    --bg: #f7faf8;

    --danger: #e53935;
    --warning: #f59e0b;

    --shadow: 0 15px 40px rgba(28, 72, 43, 0.08);

    --radius: 18px;
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
    font-family: "Inter", sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
}

button,
input,
select {
    font-family: inherit;
}

button {
    cursor: pointer;
}

a {
    text-decoration: none;
    color: inherit;
}


/* ================= NAVBAR ================= */

.navbar {
    position: sticky;
    top: 0;
    z-index: 1000;

    background: rgba(255,255,255,.94);
    backdrop-filter: blur(15px);

    border-bottom: 1px solid var(--border);
}

.nav-container {
    max-width: 1250px;
    margin: auto;
    padding: 15px 25px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 25px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 21px;
    font-weight: 800;
    white-space: nowrap;
}

.logo > span:last-child span {
    color: var(--primary-dark);
}

.logo-icon {
    width: 40px;
    height: 40px;

    display: grid;
    place-items: center;

    background: var(--primary-light);
    color: var(--primary-dark);

    border-radius: 12px;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 22px;
}

.nav-links a {
    color: #56635b;
    font-size: 14px;
    font-weight: 600;

    transition: .2s;
}

.nav-links a:hover {
    color: var(--primary-dark);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.location-btn,
.login-btn,
.outline-btn {
    border: 1px solid var(--border);
    background: var(--white);

    padding: 10px 15px;

    border-radius: 10px;

    font-weight: 600;
}

.location-btn {
    color: var(--primary-dark);
}

.location-btn:hover,
.outline-btn:hover {
    border-color: var(--primary);
    background: var(--primary-light);
}

.login-btn,
.primary-btn {
    background: var(--primary-dark);
    color: white;
    border: none;
}

.login-btn {
    padding: 11px 20px;
    border-radius: 10px;
}

.login-btn:hover,
.primary-btn:hover {
    background: #176c34;
    transform: translateY(-1px);
}

.menu-btn {
    display: none;

    width: 42px;
    height: 42px;

    border: 1px solid var(--border);
    background: white;
    border-radius: 10px;
}


/* ================= HERO ================= */

.hero {
    background:
        radial-gradient(circle at 80% 20%, #dff7e4 0, transparent 35%),
        linear-gradient(135deg, #ffffff, #f0faf2);

    padding: 85px 25px;
}

.hero-container {
    max-width: 1250px;
    margin: auto;

    display: grid;
    grid-template-columns: 1.2fr .8fr;

    align-items: center;
    gap: 70px;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    padding: 8px 13px;

    border-radius: 30px;

    background: var(--primary-light);
    color: var(--primary-dark);

    font-size: 13px;
    font-weight: 700;

    margin-bottom: 22px;
}

.hero h1 {
    max-width: 700px;

    font-size: clamp(42px, 5vw, 70px);
    line-height: 1.08;

    letter-spacing: -2px;

    margin-bottom: 22px;
}

.hero h1 span {
    color: var(--primary-dark);
}

.hero-content > p {
    max-width: 620px;

    color: var(--muted);
    font-size: 17px;

    margin-bottom: 30px;
}

.hero-buttons {
    display: flex;
    gap: 13px;
    flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
    min-height: 48px;

    padding: 0 20px;

    border-radius: 11px;

    font-weight: 700;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;

    transition: .2s;
}

.secondary-btn {
    background: white;
    color: var(--text);

    border: 1px solid var(--border);
}

.secondary-btn:hover {
    border-color: var(--primary);
}

.hero-stats {
    display: flex;
    gap: 45px;

    margin-top: 40px;
}

.hero-stats div {
    display: flex;
    flex-direction: column;
}

.hero-stats strong {
    font-size: 25px;
}

.hero-stats span {
    color: var(--muted);
    font-size: 13px;
}


/* HERO CARD */

.hero-card {
    background: white;

    padding: 35px;

    border: 1px solid var(--border);
    border-radius: 28px;

    box-shadow: var(--shadow);

    text-align: center;
}

.charging-circle {
    width: 220px;
    height: 220px;

    margin: auto;

    border-radius: 50%;

    background:
        conic-gradient(
            var(--primary) 0deg 281deg,
            #e8f0ea 281deg 360deg
        );

    padding: 13px;

    display: grid;
    place-items: center;
}

.charging-inner {
    width: 100%;
    height: 100%;

    background: white;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.charging-inner i {
    color: var(--primary-dark);
    font-size: 30px;
}

.charging-inner strong {
    font-size: 44px;
    line-height: 1;
}

.charging-inner small {
    color: var(--muted);
}

.charging-info {
    margin-top: 25px;
}

.charging-info > span {
    color: var(--muted);
    font-size: 13px;
}

.charging-info h3 {
    margin: 5px 0 15px;
}

.progress {
    height: 8px;
    background: #edf2ee;
    border-radius: 20px;
    overflow: hidden;
}

.progress div {
    height: 100%;
    background: var(--primary);
    border-radius: inherit;
}

.charge-row {
    display: flex;
    justify-content: space-between;

    margin-top: 12px;

    color: var(--muted);
    font-size: 13px;
}


/* ================= LOCATION ================= */

.location-section {
    padding: 0 25px;
}

.section-container {
    max-width: 1250px;
    margin: auto;
}

.location-box {
    margin-top: -35px;

    position: relative;
    z-index: 10;

    background: white;

    border: 1px solid var(--border);
    border-radius: 16px;

    padding: 18px 22px;

    display: flex;
    align-items: center;
    gap: 15px;

    box-shadow: var(--shadow);
}

.location-icon {
    width: 45px;
    height: 45px;

    display: grid;
    place-items: center;

    border-radius: 12px;

    color: var(--primary-dark);
    background: var(--primary-light);
}

.location-text {
    flex: 1;

    display: flex;
    flex-direction: column;
}

.location-text small {
    color: var(--muted);
    font-size: 12px;
}

.location-text strong {
    font-size: 14px;
}


/* ================= SECTIONS ================= */

.section {
    padding: 90px 25px;
}

.section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    gap: 30px;

    margin-bottom: 35px;
}

.eyebrow {
    display: block;

    color: var(--primary-dark);

    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.5px;

    margin-bottom: 8px;
}

.section-heading h2 {
    font-size: 34px;
    letter-spacing: -.8px;
}

.section-heading p {
    color: var(--muted);
    margin-top: 5px;
}


/* ================= FILTERS ================= */

.filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    margin-bottom: 25px;
}

.filter {
    padding: 9px 17px;

    background: white;
    border: 1px solid var(--border);

    border-radius: 30px;

    font-weight: 600;
    color: var(--muted);
}

.filter.active,
.filter:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
    color: white;
}


/* ================= STATIONS ================= */

.station-layout {
    display: grid;
    grid-template-columns: 420px 1fr;

    gap: 20px;

    min-height: 600px;
}

.station-list {
    display: flex;
    flex-direction: column;
    gap: 14px;

    max-height: 600px;
    overflow-y: auto;

    padding-right: 5px;
}

.station-card {
    background: white;

    border: 1px solid var(--border);
    border-radius: 16px;

    padding: 18px;

    transition: .2s;

    cursor: pointer;
}

.station-card:hover {
    transform: translateY(-2px);
    border-color: #a8dcb1;
    box-shadow: 0 10px 25px rgba(32, 90, 49, .08);
}

.station-top {
    display: flex;
    justify-content: space-between;
    gap: 15px;
}

.station-title {
    display: flex;
    gap: 12px;
}

.station-icon {
    width: 42px;
    height: 42px;

    flex-shrink: 0;

    display: grid;
    place-items: center;

    border-radius: 11px;

    background: var(--primary-light);
    color: var(--primary-dark);
}

.station-title h3 {
    font-size: 15px;
}

.station-title p {
    font-size: 12px;
    color: var(--muted);
}

.status {
    height: fit-content;

    padding: 5px 9px;

    border-radius: 20px;

    font-size: 11px;
    font-weight: 700;
}

.status.available {
    background: #e8f8eb;
    color: #16803a;
}

.status.busy {
    background: #fff4df;
    color: #a56300;
}

.status.offline {
    background: #f5e9e9;
    color: #b22c2c;
}

.station-meta {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    margin: 15px 0;

    color: var(--muted);

    font-size: 12px;
}

.station-meta i {
    color: var(--primary-dark);
}

.station-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-top: 1px solid var(--border);

    padding-top: 13px;
}

.price strong {
    font-size: 16px;
}

.price span {
    font-size: 11px;
    color: var(--muted);
}

.station-actions {
    display: flex;
    gap: 7px;
}

.small-btn {
    border: 1px solid var(--border);
    background: white;

    padding: 7px 10px;

    border-radius: 8px;

    font-size: 12px;
    font-weight: 700;
}

.small-btn:hover {
    background: var(--primary-light);
    border-color: var(--primary);
}

.small-btn.primary {
    background: var(--primary-dark);
    color: white;
    border-color: var(--primary-dark);
}


/* MAP */

.map-wrapper {
    position: relative;

    border-radius: 18px;
    overflow: hidden;

    border: 1px solid var(--border);

    min-height: 600px;
}

#map {
    width: 100%;
    height: 100%;
    min-height: 600px;
}

.map-overlay {
    position: absolute;

    right: 15px;
    top: 15px;

    z-index: 500;

    display: flex;
    flex-direction: column;
    gap: 7px;
}

.map-overlay button {
    width: 42px;
    height: 42px;

    background: white;

    border: 1px solid var(--border);

    border-radius: 10px;

    box-shadow: 0 5px 15px rgba(0,0,0,.12);

    color: var(--text);
}


/* ================= DASHBOARD ================= */

.dashboard-section {
    background: white;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

.stat-card {
    padding: 22px;

    border: 1px solid var(--border);
    border-radius: 16px;

    display: flex;
    align-items: center;
    gap: 15px;

    background: #fff;
}

.stat-icon {
    width: 48px;
    height: 48px;

    display: grid;
    place-items: center;

    border-radius: 13px;

    font-size: 18px;
}

.stat-icon.green {
    background: #e7f8ea;
    color: #258542;
}

.stat-icon.blue {
    background: #e8f3ff;
    color: #2878bd;
}

.stat-icon.purple {
    background: #f0eaff;
    color: #7451bd;
}

.stat-icon.orange {
    background: #fff1dd;
    color: #c77a17;
}

.stat-card span {
    display: block;
    color: var(--muted);
    font-size: 12px;
}

.stat-card h3 {
    margin: 3px 0;
}

.stat-card small {
    color: var(--muted);
    font-size: 11px;
}

.positive {
    color: var(--primary-dark) !important;
}

.dashboard-panels {
    margin-top: 20px;

    display: grid;
    grid-template-columns: 1.4fr .6fr;

    gap: 20px;
}

.panel {
    background: white;

    border: 1px solid var(--border);
    border-radius: 16px;

    padding: 22px;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;
}

.panel-header h3 {
    font-size: 16px;
}

.panel-header span,
.panel-header button {
    color: var(--muted);
    font-size: 12px;
    border: none;
    background: transparent;
}

.chart {
    height: 240px;

    display: flex;
    align-items: flex-end;
    justify-content: space-around;

    border-bottom: 1px solid var(--border);

    padding-top: 20px;
}

.bar-item {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    flex-direction: column;

    gap: 10px;
}

.bar {
    width: 35px;

    min-height: 20px;

    border-radius: 7px 7px 0 0;

    background: linear-gradient(
        to top,
        var(--primary-dark),
        var(--primary)
    );
}

.bar-item span {
    font-size: 11px;
    color: var(--muted);
}


/* BATTERY */

.battery-panel {
    text-align: center;
}

.battery {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 25px auto 10px;
}

.battery-body {
    width: 150px;
    height: 65px;

    border: 4px solid var(--text);
    border-radius: 10px;

    padding: 5px;
}

.battery-level {
    width: 78%;
    height: 100%;

    border-radius: 4px;

    background: var(--primary);
}

.battery-tip {
    width: 8px;
    height: 25px;

    background: var(--text);

    border-radius: 0 5px 5px 0;
}

.battery-value {
    font-size: 30px;
    font-weight: 800;
}

.battery-panel p {
    color: var(--muted);
    font-size: 13px;
}


/* BOOKING HISTORY */

.booking-history {
    margin-top: 20px;
}

.booking-item {
    padding: 14px 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid var(--border);
}

.booking-item:last-child {
    border-bottom: 0;
}

.booking-item small {
    display: block;
    color: var(--muted);
}


/* ================= BOOKING ================= */

.booking-wrapper {
    display: grid;
    grid-template-columns: 1.2fr .8fr;

    gap: 25px;
}

.booking-form,
.booking-info {
    background: white;

    border: 1px solid var(--border);
    border-radius: 18px;

    padding: 28px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 15px;
}

.form-group {
    margin-bottom: 17px;
}

.form-group label {
    display: block;

    font-size: 13px;
    font-weight: 700;

    margin-bottom: 7px;
}

.form-group input,
.form-group select {
    width: 100%;

    height: 46px;

    padding: 0 13px;

    border: 1px solid var(--border);

    border-radius: 10px;

    background: white;

    color: var(--text);

    outline: none;
}

.form-group input:focus,
.form-group select:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(85,185,106,.12);
}

.booking-summary {
    background: var(--primary-light);

    border-radius: 12px;

    padding: 16px;

    margin-bottom: 18px;
}

.booking-summary div {
    display: flex;
    justify-content: space-between;
}

.booking-summary span {
    color: var(--muted);
}

.booking-summary strong {
    color: var(--primary-dark);
    font-size: 20px;
}

.full-btn {
    width: 100%;
}

.booking-info {
    background:
        linear-gradient(
            145deg,
            #eaf8ed,
            white
        );
}

.info-icon {
    width: 50px;
    height: 50px;

    display: grid;
    place-items: center;

    background: white;

    color: var(--primary-dark);

    border-radius: 13px;

    margin-bottom: 18px;
}

.booking-info h3 {
    margin-bottom: 10px;
}

.booking-info p {
    color: var(--muted);
}

.booking-info ul {
    list-style: none;

    margin-top: 25px;

    display: grid;
    gap: 12px;
}

.booking-info li {
    font-size: 14px;
}

.booking-info li i {
    color: var(--primary-dark);
    margin-right: 8px;
}


/* ================= PAYMENT ================= */

.payment-section {
    background: #f0f8f2;
}

.payment-wrapper {
    display: grid;
    grid-template-columns: .8fr 1.2fr;

    gap: 25px;
}

.payment-card,
.payment-side {
    background: white;

    border: 1px solid var(--border);

    border-radius: 18px;

    padding: 28px;
}

.payment-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 8px;

    margin-bottom: 25px;
}

.payment-tab {
    border: 1px solid var(--border);

    background: white;

    padding: 12px;

    border-radius: 10px;

    font-weight: 700;
}

.payment-tab.active {
    background: var(--primary-light);
    color: var(--primary-dark);
    border-color: var(--primary);
}

.qr-code {
    width: 190px;
    height: 190px;

    margin: 10px auto 15px;

    background: white;

    border: 12px solid white;

    box-shadow: 0 0 0 1px var(--border);

    display: grid;
    place-items: center;
}

.qr-grid {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: repeat(3,1fr);

    gap: 7px;
}

.qr-grid span {
    background: #101512;
}

.qr-grid span:nth-child(2),
.qr-grid span:nth-child(4),
.qr-grid span:nth-child(8) {
    background: white;
}

.qr-text {
    text-align: center;

    color: var(--muted);
    font-size: 13px;
}

.upi-id {
    margin: 15px 0;

    padding: 11px;

    border: 1px dashed var(--primary);

    border-radius: 9px;

    text-align: center;

    font-weight: 700;

    color: var(--primary-dark);
}

.upi-id button {
    border: none;
    background: none;
    color: var(--primary-dark);
    margin-left: 8px;
}

.amount-box {
    padding: 15px 0;

    border-top: 1px solid var(--border);

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 15px;
}

.amount-box span {
    color: var(--muted);
}

.amount-box strong {
    font-size: 24px;
}

.payment-side {
    display: flex;
    flex-direction: column;
    justify-content: center;

    background:
        linear-gradient(
            135deg,
            #dff5e3,
            white
        );
}

.payment-side > i {
    font-size: 45px;
    color: var(--primary-dark);
    margin-bottom: 20px;
}

.payment-side h3 {
    font-size: 25px;
}

.payment-side p {
    max-width: 500px;
    color: var(--muted);
    margin: 10px 0 25px;
}

.payment-methods {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.payment-methods span {
    background: white;
    border: 1px solid var(--border);
    border-radius: 7px;
    padding: 7px 12px;
    font-size: 12px;
    font-weight: 700;
}


/* ================= EMERGENCY ================= */

.emergency-card {
    background:
        linear-gradient(
            120deg,
            #fff0f0,
            white
        );

    border: 1px solid #ffd3d3;

    border-radius: 20px;

    padding: 35px;

    display: flex;
    align-items: center;

    gap: 25px;
}

.emergency-icon {
    width: 75px;
    height: 75px;

    flex-shrink: 0;

    display: grid;
    place-items: center;

    background: #ffe2e2;

    color: var(--danger);

    border-radius: 20px;

    font-size: 30px;
}

.emergency-content > span {
    color: var(--danger);
    font-weight: 800;
    font-size: 12px;
}

.emergency-content h2 {
    margin: 4px 0;
}

.emergency-content p {
    color: var(--muted);
}

.emergency-buttons {
    margin-top: 18px;

    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.danger-btn,
.light-danger-btn {
    padding: 11px 17px;

    border-radius: 10px;

    font-weight: 700;
}

.danger-btn {
    border: none;
    color: white;
    background: var(--danger);
}

.light-danger-btn {
    border: 1px solid #ffc2c2;
    background: white;
    color: var(--danger);
}


/* ================= ADMIN ================= */

.admin-status {
    padding: 8px 12px;

    background: #e9f8ec;

    color: var(--primary-dark);

    border-radius: 30px;

    font-size: 12px;
    font-weight: 700;
}

.admin-status i {
    font-size: 7px;
}

.admin-grid {
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 15px;

    margin-bottom: 25px;
}

.admin-card {
    padding: 22px;

    background: white;

    border: 1px solid var(--border);

    border-radius: 16px;
}

.admin-card > i {
    width: 45px;
    height: 45px;

    display: grid;
    place-items: center;

    background: var(--primary-light);

    color: var(--primary-dark);

    border-radius: 12px;

    margin-bottom: 15px;
}

.admin-card h3 {
    font-size: 16px;
}

.admin-card p {
    color: var(--muted);
    font-size: 12px;

    margin: 6px 0 15px;
}

.admin-card button {
    border: none;
    background: none;

    color: var(--primary-dark);

    font-weight: 700;
}

.admin-table-wrapper {
    background: white;

    border: 1px solid var(--border);

    border-radius: 16px;

    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;

    padding: 15px;

    border-bottom: 1px solid var(--border);

    font-size: 13px;
}

th {
    color: var(--muted);
    background: #f8faf8;
}


/* ================= FOOTER ================= */

footer {
    background: #122118;
    color: white;

    padding: 55px 25px 20px;
}

.footer-container {
    max-width: 1250px;
    margin: auto;

    display: grid;
    grid-template-columns: 1.4fr 1fr .6fr;

    gap: 60px;
}

.footer-brand p {
    color: #aab8ae;

    max-width: 330px;

    margin-top: 15px;

    font-size: 13px;
}

.footer-brand .logo {
    color: white;
}

.footer-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.footer-links h4,
.footer-social h4 {
    margin-bottom: 15px;
}

.footer-links div {
    display: flex;
    flex-direction: column;
    gap: 9px;
}

.footer-links a {
    color: #aab8ae;
    font-size: 13px;
}

.footer-social button {
    width: 38px;
    height: 38px;

    margin-right: 6px;

    border: 1px solid #304239;

    background: #1c3024;

    color: white;

    border-radius: 9px;
}

.footer-social button:hover {
    background: var(--primary-dark);
}

.footer-bottom {
    max-width: 1250px;

    margin: 45px auto 0;

    padding-top: 18px;

    border-top: 1px solid #304239;

    display: flex;
    justify-content: space-between;

    color: #8f9e94;

    font-size: 12px;
}


/* ================= MODALS ================= */

.modal {
    position: fixed;

    inset: 0;

    z-index: 2000;

    background: rgba(11,24,16,.55);

    display: none;

    align-items: center;
    justify-content: center;

    padding: 20px;
}

.modal.show {
    display: flex;
}

.modal-box {
    width: 100%;
    max-width: 430px;

    background: white;

    border-radius: 20px;

    padding: 30px;

    position: relative;

    box-shadow: 0 30px 80px rgba(0,0,0,.2);

    animation: modalIn .25s ease;
}

@keyframes modalIn {
    from {
        opacity: 0;
        transform: translateY(15px) scale(.98);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.close-modal {
    position: absolute;

    right: 15px;
    top: 12px;

    width: 35px;
    height: 35px;

    border: none;

    background: #f1f4f2;

    border-radius: 50%;

    font-size: 20px;
}

.modal-icon {
    width: 55px;
    height: 55px;

    display: grid;
    place-items: center;

    background: var(--primary-light);

    color: var(--primary-dark);

    border-radius: 15px;

    margin-bottom: 18px;
}

.modal-box > p {
    color: var(--muted);
    font-size: 13px;
    margin-bottom: 25px;
}

.switch-text {
    text-align: center;

    margin: 20px 0 0 !important;
}

.switch-text button {
    border: none;
    background: none;

    color: var(--primary-dark);

    font-weight: 700;
}


/* ================= TOAST ================= */

.toast {
    position: fixed;

    right: 25px;
    bottom: 25px;

    z-index: 3000;

    min-width: 280px;

    padding: 14px 17px;

    background: #17241c;
    color: white;

    border-radius: 11px;

    display: flex;
    align-items: center;
    gap: 10px;

    box-shadow: 0 15px 35px rgba(0,0,0,.2);

    transform: translateY(100px);
    opacity: 0;

    pointer-events: none;

    transition: .3s;
}

.toast.show {
    transform: translateY(0);
    opacity: 1;
}

.toast i {
    color: #79d58c;
}


/* ================= UTILITIES ================= */

.hidden {
    display: none !important;
}

.no-result {
    background: white;

    border: 1px dashed var(--border);

    border-radius: 15px;

    padding: 30px;

    text-align: center;

    color: var(--muted);
}


/* ================= RESPONSIVE ================= */

@media(max-width:1100px) {

    .nav-links {
        gap: 12px;
    }

    .station-layout {
        grid-template-columns: 1fr;
    }

    .station-list {
        max-height: none;
    }

    .map-wrapper,
    #map {
        min-height: 500px;
    }

    .dashboard-grid {
        grid-template-columns: repeat(2,1fr);
    }

    .admin-grid {
        grid-template-columns: repeat(2,1fr);
    }

}


@media(max-width:850px) {

    .nav-links {
        position: absolute;

        top: 71px;
        left: 15px;
        right: 15px;

        display: none;
        flex-direction: column;
        align-items: stretch;

        padding: 15px;

        background: white;

        border: 1px solid var(--border);
        border-radius: 15px;

        box-shadow: var(--shadow);
    }

    .nav-links.show {
        display: flex;
    }

    .menu-btn {
        display: block;
    }

    .location-btn span {
        display: none;
    }

    .hero-container,
    .booking-wrapper,
    .payment-wrapper,
    .dashboard-panels {
        grid-template-columns: 1fr;
    }

    .hero {
        padding: 60px 20px;
    }

    .hero-card {
        max-width: 500px;
        width: 100%;
        margin: auto;
    }

    .footer-container {
        grid-template-columns: 1fr 1fr;
    }

}


@media(max-width:600px) {

    .nav-container {
        padding: 12px 15px;
    }

    .logo {
        font-size: 18px;
    }

    .login-btn {
        padding: 9px 12px;
    }

    .hero h1 {
        font-size: 42px;
    }

    .hero-stats {
        gap: 25px;
    }

    .location-box {
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .location-text {
        min-width: 180px;
    }

    .section {
        padding: 65px 15px;
    }

    .section-heading {
        align-items: flex-start;
        flex-direction: column;
    }

    .section-heading h2 {
        font-size: 28px;
    }

    .dashboard-grid,
    .admin-grid {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .emergency-card {
        flex-direction: column;
        align-items: flex-start;
        padding: 25px;
    }

    .footer-container {
        grid-template-columns: 1fr;
        gap: 35px;
    }

    .footer-bottom {
        flex-direction: column;
        gap: 8px;
    }

    .hero-buttons {
        flex-direction: column;
    }

    .primary-btn,
    .secondary-btn {
        width: 100%;
    }

    .toast {
        left: 15px;
        right: 15px;
        bottom: 15px;
        min-width: 0;
    }

}
