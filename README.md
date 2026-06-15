# Verge Chartering Desk Demo

Internal demo concept for a clean Verge Shipbrokers chartering and offshore desk tool.

This is not an official Verge publication until approved.

## What is included

- Minimalistic white and navy glass design
- Position list system saved in browser local storage
- Add, filter, delete and export vessel positions
- Demo position loader
- Charterparty reference cards
- Offshore and chartering workflow overview
- Chain protection checklist
- Supplier / owner enquiry message generator using ***Q*** and ***UQ*** markers

## Relevant charterparty references included

- SUPPLYTIME for offshore support vessels, PSV, AHTS and OSV time charter work
- TOWCON for lump sum towage
- TOWHIRE for daily hire towage
- BARECON for bareboat charter
- HEAVYCON for heavy lift and project cargo
- PROJECTCON for project cargo work
- GENCON for voyage charter reference
- NYPE for time charter reference
- WINDTIME for offshore wind support
- GUARDCON for maritime security services
- ASBATANKVOY for tanker voyage reference

Always verify the latest form and rider clauses before using anything commercially.

## How to run locally

Open `index.html` in your browser.

No installation is required.

## How to publish with GitHub Pages

1. Open the repository on GitHub.
2. Go to Settings.
3. Go to Pages.
4. Select branch `main` and folder `/root`.
5. Save.
6. GitHub will create a public demo link.

## Suggested next improvements

- Add password protection or move to private repo if used with real market information
- Add proper database instead of browser local storage
- Add separate owner, charterer and broker contact database
- Add enquiry pipeline with stages: Received, Clarifying, Sourcing, Quoted, Subjects, Fixed, Lost
- Add document upload placeholders for CP, specs, GA plans and certificates
- Add permission levels before using inside a company
- Add audit trail for who changed a position

## Important commercial note

Do not store real owner names, client names, phone numbers, emails or sensitive chain information in a public GitHub Pages demo.

For real use, the application should be private and backed by a secure database.
