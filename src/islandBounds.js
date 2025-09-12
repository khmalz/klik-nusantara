import * as turf from "@turf/turf";
import geojson from "./assets/indonesia.json";

// Jawa
const jawaStates = ["Yogyakarta", "Jawa Timur", "Jawa Barat", "Jawa Tengah", "Banten", "Jakarta Raya"];
const jawaProvinces = geojson.features.filter(f => jawaStates.includes(f.properties.state));
const fc = turf.featureCollection(jawaProvinces);
const jawaCombined = turf.combine(fc);
if (jawaCombined.features && jawaCombined.features.length) {
   jawaCombined.features.forEach(f => {
      f.properties = f.properties || {};
      f.properties._name = "Pulau Jawa";
   });
}

// Sumatera
const sumateraStates = ["Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung", "Kepulauan Riau", "Bangka-Belitung"];
const sumateraProvinces = geojson.features.filter(f => sumateraStates.includes(f.properties.state));
const fcSumatera = turf.featureCollection(sumateraProvinces);
const sumateraCombined = turf.combine(fcSumatera);

if (sumateraCombined.features && sumateraCombined.features.length) {
   sumateraCombined.features.forEach(f => {
      f.properties = f.properties || {};
      f.properties._name = "Pulau Sumatra";
   });
}

// Kalimantan
const kalimantanStates = ["Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara"];
const kalimantanProvinces = geojson.features.filter(f => kalimantanStates.includes(f.properties.state));
const fcKalimantan = turf.featureCollection(kalimantanProvinces);
const kalimantanCombined = turf.combine(fcKalimantan);

if (kalimantanCombined.features && kalimantanCombined.features.length) {
   kalimantanCombined.features.forEach(f => {
      f.properties = f.properties || {};
      f.properties._name = "Pulau Kalimantan";
   });
}

// Sulawesi
const sulawesiStates = ["Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara"];
const sulawesiProvinces = geojson.features.filter(f => sulawesiStates.includes(f.properties.state));
const fcSulawesi = turf.featureCollection(sulawesiProvinces);
const sulawesiCombined = turf.combine(fcSulawesi);

if (sulawesiCombined.features && sulawesiCombined.features.length) {
   sulawesiCombined.features.forEach(f => {
      f.properties = f.properties || {};
      f.properties._name = "Pulau Sulawesi";
   });
}

// Nusa Tenggara
const nusaTenggaraStates = ["Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur"];
const nusaTenggaraProvinces = geojson.features.filter(f => nusaTenggaraStates.includes(f.properties.state));
const fcNusaTenggara = turf.featureCollection(nusaTenggaraProvinces);
const nusaTenggaraCombined = turf.combine(fcNusaTenggara);

if (nusaTenggaraCombined.features && nusaTenggaraCombined.features.length) {
   nusaTenggaraCombined.features.forEach(f => {
      f.properties = f.properties || {};
      f.properties._name = "Kepulauan Nusa Tenggara";
   });
}

// Maluku
const malukuStates = ["Maluku", "Maluku Utara"];
const malukuProvinces = geojson.features.filter(f => malukuStates.includes(f.properties.state));
const fcMaluku = turf.featureCollection(malukuProvinces);
const malukuCombined = turf.combine(fcMaluku);

if (malukuCombined.features && malukuCombined.features.length) {
   malukuCombined.features.forEach(f => {
      f.properties = f.properties || {};
      f.properties._name = "Kepulauan Maluku";
   });
}

// Papua
const papuaStates = ["Papua", "Papua Barat"];
const papuaProvinces = geojson.features.filter(f => papuaStates.includes(f.properties.state));
const fcPapua = turf.featureCollection(papuaProvinces);
const papuaCombined = turf.combine(fcPapua);

if (papuaCombined.features && papuaCombined.features.length) {
   papuaCombined.features.forEach(f => {
      f.properties = f.properties || {};
      f.properties._name = "Pulau Papua";
   });
}

const allIslands = turf.featureCollection([
   ...sumateraCombined.features,
   ...kalimantanCombined.features,
   ...sulawesiCombined.features,
   ...nusaTenggaraCombined.features,
   ...malukuCombined.features,
   ...papuaCombined.features,
   ...jawaCombined.features,
]);

module.exports = allIslands;
