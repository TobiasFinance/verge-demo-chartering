export function loadItems(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

export function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function exportCsv(filename, rows) {
  if (!rows.length) return false;
  const headers = Object.keys(rows[0]);
  const csv = [headers, ...rows.map((row) => headers.map((key) => row[key] || ""))]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}
