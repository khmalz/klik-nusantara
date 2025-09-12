import * as turf from "@turf/turf";
import indoJson from "./assets/indonesia-province-simple.json";

/**
 * Helper function to filter, combine, and name features in a GeoJSON based on a list of province names.
 * @param {object} geojson - The source GeoJSON
 * @param {string[]} provinceNames - An array of province names
 * @param {string} islandName - The name of the new feature collection
 * @returns {object} The new feature collection.
 */
function createIslandFeature(geojson, provinceNames, islandName) {
   const provinces = geojson.features.filter(f => provinceNames.includes(f.properties.Propinsi));

   if (provinces.length === 0) {
      return null;
   }

   const featureCollection = turf.featureCollection(provinces);
   const combined = turf.combine(featureCollection);

   if (combined.features && combined.features.length) {
      combined.features.forEach(f => {
         f.properties = f.properties || {};
         f.properties._name = islandName;
      });
   }
   return combined;
}

const jawaStates = ["DAERAH ISTIMEWA YOGYAKARTA", "JAWA TENGAH", "PROBANTEN", "JAWA TIMUR", "DKI JAKARTA", "JAWA BARAT"];
const sumateraStates = ["SUMATERA UTARA", "BANGKA BELITUNG", "SUMATERA BARAT", "SUMATERA SELATAN", "JAMBI", "LAMPUNG", "BENGKULU", "DI. ACEH", "RIAU"];
const kalimantanStates = ["KALIMANTAN SELATAN", "KALIMANTAN BARAT", "KALIMANTAN TIMUR", "KALIMANTAN TENGAH"];
const sulawesiStates = ["GORONTALO", "SULAWESI TENGGARA", "SULAWESI SELATAN", "SULAWESI TENGAH", "SULAWESI UTARA"];
const nusaTenggaraStates = ["NUSATENGGARA BARAT", "NUSA TENGGARA TIMUR", "BALI"];
const malukuStates = ["MALUKU UTARA", "MALUKU"];
const papuaStates = ["IRIAN JAYA TIMUR", "IRIAN JAYA TENGAH", "IRIAN JAYA BARAT"];

const jawaCombined = createIslandFeature(indoJson, jawaStates, "Pulau Jawa");
const sumateraCombined = createIslandFeature(indoJson, sumateraStates, "Pulau Sumatra");
const kalimantanCombined = createIslandFeature(indoJson, kalimantanStates, "Pulau Kalimantan");
const sulawesiCombined = createIslandFeature(indoJson, sulawesiStates, "Pulau Sulawesi");
const nusaTenggaraCombined = createIslandFeature(indoJson, nusaTenggaraStates, "Kepulauan Nusa Tenggara");
const malukuCombined = createIslandFeature(indoJson, malukuStates, "Kepulauan Maluku");
const papuaCombined = createIslandFeature(indoJson, papuaStates, "Pulau Papua");

const allIslandFeatures = [jawaCombined, sumateraCombined, kalimantanCombined, sulawesiCombined, nusaTenggaraCombined, malukuCombined, papuaCombined].filter(Boolean).flatMap(island => island.features);

const allIslands = turf.featureCollection(allIslandFeatures);

module.exports = allIslands;
