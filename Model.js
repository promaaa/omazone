.pragma library

var CITY_ICONS = {
  "Asia/Tokyo": "🗼",
  "America/New_York": "🗽",
  "America/Los_Angeles": "🎬",
  "America/Chicago": "🌭",
  "America/Denver": "🤠",
  "America/Phoenix": "🌵",
  "America/Anchorage": "🐻",
  "Pacific/Honolulu": "🌺",
  "America/Toronto": "🍁",
  "America/Vancouver": "🏔",
  "America/Mexico_City": "🌮",
  "America/Sao_Paulo": "⚽",
  "America/Buenos_Aires": "💃",
  "America/Bogota": "☕",
  "America/Lima": "🦙",
  "America/Santiago": "🍷",
  "America/Havana": "🚗",
  "Europe/London": "🎡",
  "Europe/Paris": "🥐",
  "Europe/Rome": "🏛",
  "Europe/Madrid": "🥘",
  "Europe/Berlin": "🍺",
  "Europe/Amsterdam": "🌷",
  "Europe/Moscow": "🏰",
  "Europe/Athens": "🫒",
  "Europe/Istanbul": "🕌",
  "Europe/Zurich": "🍫",
  "Europe/Vienna": "🎻",
  "Europe/Dublin": "🍀",
  "Europe/Lisbon": "⚓",
  "Europe/Stockholm": "❄",
  "Europe/Oslo": "🎿",
  "Europe/Copenhagen": "🧜",
  "Europe/Warsaw": "🎹",
  "Europe/Prague": "🕰",
  "Asia/Dubai": "🌇",
  "Asia/Kolkata": "🛕",
  "Asia/Calcutta": "🛕",
  "Asia/Shanghai": "🐉",
  "Asia/Hong_Kong": "🥟",
  "Asia/Singapore": "🦁",
  "Asia/Seoul": "🍜",
  "Asia/Bangkok": "🛺",
  "Asia/Jakarta": "🌋",
  "Asia/Taipei": "🧋",
  "Asia/Jerusalem": "🕍",
  "Asia/Riyadh": "🏜",
  "Australia/Sydney": "🦘",
  "Pacific/Auckland": "🥝",
  "Africa/Cairo": "🐫",
  "Africa/Johannesburg": "🦓",
  "Africa/Lagos": "🥁",
  "Africa/Nairobi": "🦒"
}

function friendlyName(id) {
  var parts = String(id || "").split("/")
  var last = parts[parts.length - 1] || id
  return last.replace(/_/g, " ")
}

function regionName(id) {
  var parts = String(id || "").split("/")
  if (parts.length < 2) return ""
  return parts[0].replace(/_/g, " ")
}

function cityIcon(id) {
  return CITY_ICONS[id] || "🌐"
}

function parseTimesLine(line) {
  var parts = String(line || "").split("|")
  if (parts.length < 8) return null
  return {
    id: parts[0],
    time24: parts[1],
    time12: parts[2],
    ampm: parts[3],
    date: parts[4],
    weekday: parts[5],
    utcOffset: parts[6],
    abbr: parts[7]
  }
}

function parseTimesOutput(text) {
  var out = {}
  var lines = String(text || "").split("\n")
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim()
    if (line === "") continue
    var parsed = parseTimesLine(line)
    if (parsed) out[parsed.id] = parsed
  }
  return out
}

function toUTCms(dateStr) {
  var p = String(dateStr || "").split("-")
  if (p.length < 3) return NaN
  return Date.UTC(Number(p[0]), Number(p[1]) - 1, Number(p[2]))
}

function dayBadge(zoneDate, localDate) {
  if (!zoneDate || !localDate || zoneDate === localDate) return ""
  var diff = Math.round((toUTCms(zoneDate) - toUTCms(localDate)) / 86400000)
  if (diff === 1) return "+1"
  if (diff === -1) return "−1"
  return ""
}

function formatOffset(minutes) {
  var m = Math.round(Number(minutes) || 0)
  if (m === 0) return "Now"
  var sign = m > 0 ? "+" : "−"
  var abs = Math.abs(m)
  var h = Math.floor(abs / 60)
  var mm = abs % 60
  var out = sign
  if (h > 0) out += h + "h"
  if (mm > 0) out += (h > 0 ? " " : "") + mm + "m"
  return out
}
