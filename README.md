# Verge Combined Desk App

This repo now contains a real React frontend under `/frontend`, based on the structure of `TobiasFinance/Verge-App`.

The combined app keeps the Verge-App parent layout:

- Dark navy sidebar
- Slim top bar
- Light main canvas
- Verge-style cards, tables and register layout
- React Router navigation
- Tailwind/PostCSS setup

## Main desks

### 1. Repair

For underwater services, afloat repairs, shipyard support and technical attendance.

Includes:

- Repair case register
- Vessel / port / ETA / scope fields
- Status and priority tracking
- Supplier request generator
- CSV export

### 2. Products

For spare parts and product enquiries.

Includes:

- Equipment, maker, model and part number fields
- Required delivery time field
- Status and priority tracking
- Supplier request generator
- CSV export

### 3. Chartering

For offshore support vessels, towage, barges, PSV, AHTS and project vessel opportunities.

Includes:

- Vessel position list
- Vessel type, location, availability and rate indication fields
- Public notes and internal notes
- Charterparty reference cards
- Owner / client message generator
- CSV export

## How to run

```bash
cd frontend
npm install
npm start
```

## Files imported / recreated from Verge-App structure

- `frontend/package.json`
- `frontend/public/index.html`
- `frontend/public/logo.svg`
- `frontend/public/badge.svg`
- `frontend/public/badge-header.svg`
- `frontend/src/index.js`
- `frontend/src/index.css`
- `frontend/src/App.js`
- `frontend/src/App.css`
- `frontend/src/components/AppShell.js`
- `frontend/src/components/NotificationBell.js`
- `frontend/src/context/AuthContext.js`
- `frontend/tailwind.config.js`
- `frontend/postcss.config.js`

## Important note

This is still a demo using local browser storage. Do not use it for real sensitive commercial records yet.

Before real company use, add:

- Proper backend database
- Login and user roles
- Permission levels
- Activity log
- Secure hosting
- Data backup

The old static root demo files are still present for reference, but the actual combined software is now in `/frontend`.
