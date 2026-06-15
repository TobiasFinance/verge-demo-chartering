const STORAGE_KEY = "verge-chartering-positions";

const charterparties = [
  {
    name: "SUPPLYTIME",
    area: "Offshore support vessels",
    use: "Common starting point for OSV, PSV, AHTS and offshore support time charter work.",
    tags: ["OSV", "PSV", "AHTS", "Time charter"]
  },
  {
    name: "TOWCON",
    area: "Ocean towage lump sum",
    use: "For towage on a lump sum basis. Relevant when arranging tugs for project moves.",
    tags: ["Towage", "Lump sum", "Tugs"]
  },
  {
    name: "TOWHIRE",
    area: "Ocean towage daily hire",
    use: "For towage on a daily hire basis where time and waiting exposure matters.",
    tags: ["Towage", "Daily hire", "Tugs"]
  },
  {
    name: "BARECON",
    area: "Bareboat charter",
    use: "For bareboat charter structures where charterers take wider operational control.",
    tags: ["Bareboat", "Longer period", "Control"]
  },
  {
    name: "HEAVYCON",
    area: "Heavy lift and project cargo",
    use: "Relevant for special project cargo, floating equipment and heavy transport movements.",
    tags: ["Project", "Heavy lift", "Special cargo"]
  },
  {
    name: "PROJECTCON",
    area: "Project cargo",
    use: "Useful reference for project cargo movements where standard dry forms do not fit cleanly.",
    tags: ["Project", "Cargo", "Special terms"]
  },
  {
    name: "GENCON",
    area: "Voyage charter",
    use: "General voyage charter form, mostly dry cargo, but useful as a commercial reference.",
    tags: ["Voyage", "Dry cargo", "General"]
  },
  {
    name: "NYPE",
    area: "Time charter",
    use: "General time charter reference. Less offshore-specific but important to understand.",
    tags: ["Time charter", "Hire", "Operations"]
  },
  {
    name: "WINDTIME",
    area: "Offshore wind support",
    use: "Relevant where offshore wind support vessels and project work are involved.",
    tags: ["Wind", "Offshore", "Support"]
  },
  {
    name: "GUARDCON",
    area: "Security services",
    use: "Reference for security services where guards or maritime security contractors are involved.",
    tags: ["Security", "Risk", "Transit"]
  },
  {
    name: "ASBATANKVOY",
    area: "Tanker voyage",
    use: "Not offshore vessel-specific, but useful if offshore-related liquid cargo or tanker work appears.",
    tags: ["Tanker", "Voyage", "Cargo"]
  }
];

const demoPositions = [
  {
    vessel: "52m AHT, 106 TBP",
    type: "AHT",
    location: "East Med",
    availability: "Prompt",
    rate: "Indication required",
    status: "Hot",
    publicNotes: "SOLAS compliant, 240 sqm deck space, suitable for towing and anchor handling support.",
    privateNotes: "Source hidden. Confirm owner chain before forwarding details."
  },
  {
    vessel: "DP2 PSV, 800 sqm deck",
    type: "PSV",
    location: "Black Sea",
    availability: "Mid July",
    rate: "Owners to advise",
    status: "Checking",
    publicNotes: "DP2, supply duties, deck cargo, fuel, water and project support possible.",
    privateNotes: "Do not disclose contact. Need latest certs and trading limits."
  },
  {
    vessel: "Flat top barge, 80 x 24 m",
    type: "Barge",
    location: "Turkey",
    availability: "After inspection",
    rate: "WOG",
    status: "New",
    publicNotes: "Suitable for deck cargo, temporary support and marine project logistics.",
    privateNotes: "Check class, towing arrangement and insurance before marketing."
  }
];

let positions = loadPositions();

const form = document.getElementById("positionForm");
const tableBody = document.getElementById("positionsTable");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const clearButton = document.getElementById("clearPositions");
const exportButton = document.getElementById("exportCsv");
const seedButton = document.getElementById("seedDemo");
const templateForm = document.getElementById("templateForm");
const templateOutput = document.getElementById("templateOutput");

function loadPositions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function savePositions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
}

function updateStats() {
  document.getElementById("statPositions").textContent = positions.length;
  document.getElementById("statHot").textContent = positions.filter(position => position.status === "Hot").length;
  document.getElementById("statForms").textContent = charterparties.length;
}

function renderCharterparties() {
  const grid = document.getElementById("cpGrid");
  grid.innerHTML = charterparties.map(cp => `
    <article class="cp-card">
      <h3>${escapeHtml(cp.name)}</h3>
      <p><strong>${escapeHtml(cp.area)}</strong></p>
      <p>${escapeHtml(cp.use)}</p>
      <div class="cp-meta">
        ${cp.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderPositions() {
  const term = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;

  const filtered = positions.filter(position => {
    const matchesStatus = selectedStatus === "All" || position.status === selectedStatus;
    const haystack = `${position.vessel} ${position.type} ${position.location} ${position.availability} ${position.publicNotes}`.toLowerCase();
    return matchesStatus && haystack.includes(term);
  });

  if (!filtered.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7">No positions yet. Add one above or load demo positions.</td>
      </tr>
    `;
    updateStats();
    return;
  }

  tableBody.innerHTML = filtered.map((position, index) => `
    <tr>
      <td>
        <strong>${escapeHtml(position.vessel)}</strong><br>
        <small>${escapeHtml(position.publicNotes || "No public notes added.")}</small>
      </td>
      <td>${escapeHtml(position.type)}</td>
      <td>${escapeHtml(position.location || "TBA")}</td>
      <td>${escapeHtml(position.availability || "TBA")}</td>
      <td>${escapeHtml(position.rate || "TBA")}</td>
      <td><span class="badge ${escapeHtml(position.status)}">${escapeHtml(position.status)}</span></td>
      <td>
        <div class="row-actions">
          <button class="text-button" type="button" onclick="copySafeBrief(${index})">Copy brief</button>
          <button class="text-button" type="button" onclick="deletePosition(${index})">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");
  updateStats();
}

function addPosition(data) {
  positions.unshift(data);
  savePositions();
  renderPositions();
}

function deletePosition(index) {
  const filtered = getFilteredPositions();
  const target = filtered[index];
  positions = positions.filter(position => position !== target);
  savePositions();
  renderPositions();
}

function getFilteredPositions() {
  const term = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  return positions.filter(position => {
    const matchesStatus = selectedStatus === "All" || position.status === selectedStatus;
    const haystack = `${position.vessel} ${position.type} ${position.location} ${position.availability} ${position.publicNotes}`.toLowerCase();
    return matchesStatus && haystack.includes(term);
  });
}

function copySafeBrief(index) {
  const position = getFilteredPositions()[index];
  const brief = `Good day,\n\nPlease note we are checking below unit basis availability:\n\nVessel / Ref: ${position.vessel}\nType: ${position.type}\nLocation: ${position.location || "TBA"}\nAvailability: ${position.availability || "TBA"}\nRate indication: ${position.rate || "TBA"}\nPublic notes: ${position.publicNotes || "TBA"}\n\nAll details are given in good faith, subject to owners' final confirmation, availability and contract terms.\n\nAlways at your disposal.`;
  navigator.clipboard.writeText(brief);
}

function exportCsv() {
  const headers = ["Vessel", "Type", "Location", "Availability", "Rate", "Status", "Public Notes", "Private Notes"];
  const rows = positions.map(position => [
    position.vessel,
    position.type,
    position.location,
    position.availability,
    position.rate,
    position.status,
    position.publicNotes,
    position.privateNotes
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell || "").replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "verge-position-list.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  addPosition(data);
  form.reset();
});

searchInput.addEventListener("input", renderPositions);
statusFilter.addEventListener("change", renderPositions);

clearButton.addEventListener("click", () => {
  const confirmed = confirm("Clear all saved positions from this browser?");
  if (!confirmed) return;
  positions = [];
  savePositions();
  renderPositions();
});

exportButton.addEventListener("click", exportCsv);

seedButton.addEventListener("click", () => {
  positions = [...demoPositions, ...positions];
  savePositions();
  renderPositions();
});

templateForm.addEventListener("submit", event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(templateForm).entries());
  const text = `Good day,\n\nPlease advise whether you may have suitable availability for the below requirement:\n\n***Q***\nRequirement: ${data.requirement || "TBA"}\nArea: ${data.area || "TBA"}\nStart / duration: ${data.period || "TBA"}\nMinimum specs: ${data.specs || "TBA"}\nScope: ${data.scope || "TBA"}\n***UQ***\n\nKindly advise availability, suitability, rate indication, mobilisation/demobilisation basis, main exclusions, required notice and any operational restrictions.\n\nPlease consider 10% commission for our office and 30 days payment terms.\n\nAlways at your disposal.`;
  templateOutput.textContent = text;
  navigator.clipboard.writeText(text);
});

renderCharterparties();
renderPositions();
