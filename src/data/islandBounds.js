import * as turf from "@turf/turf";
import indoJson from "../assets/indonesia-province-simple.json";

function createIslandFeature(geojson, provinceNames, islandName) {
   const provinces = geojson.features.filter(f => provinceNames.includes(f.properties.Propinsi));
   if (provinces.length === 0) return null;

   const featureCollection = turf.featureCollection(provinces);
   const combined = turf.combine(featureCollection);

   if (combined.features?.length) {
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

const islands = [
   createIslandFeature(indoJson, jawaStates, "Pulau Jawa"),
   createIslandFeature(indoJson, sumateraStates, "Pulau Sumatra"),
   createIslandFeature(indoJson, kalimantanStates, "Pulau Kalimantan"),
   createIslandFeature(indoJson, sulawesiStates, "Pulau Sulawesi"),
   createIslandFeature(indoJson, nusaTenggaraStates, "Kepulauan Nusa Tenggara"),
   createIslandFeature(indoJson, malukuStates, "Kepulauan Maluku"),
   createIslandFeature(indoJson, papuaStates, "Pulau Papua"),
].filter(Boolean);

const allIslandFeatures = islands.flatMap(island => island.features);
const allIslands = turf.featureCollection(allIslandFeatures);

export default allIslands;
