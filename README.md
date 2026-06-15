# Verge Desk App Demo

Internal demo concept for Verge Shipbrokers.

This repo now uses the Verge-App structure as the parent idea: dark navy sidebar, top bar and light canvas. The app is divided into three desks:

1. Repair
2. Products
3. Chartering

## Current modules

### Repair

- Repair case register
- Underwater, afloat repair, shipyard and inspection case input
- Scope safe to share
- Private broker notes
- Copy-ready supplier request
- CSV export

### Products

- Spare parts and product enquiry register
- Maker, model, part number and required delivery time fields
- Supplier request generator
- CSV export

### Chartering

- Vessel position list
- Offshore support, towage, PSV, AHTS, barges and project vessel fields
- Charterparty reference cards
- Owner / supplier request generator
- CSV export

## Important note

The repository is public. Do not add real client names, owner names, supplier names, direct emails, phone numbers or sensitive chain information.

For real use, this should be moved into a private app with login, database, permissions and audit trail.

## Files used by the current app

- `index.html`
- `verge-parent.css`
- `verge-parent.js`

The older `styles.css` and `app.js` are kept in the repo for reference but are no longer loaded by `index.html`.
