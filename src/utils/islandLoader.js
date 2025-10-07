const islandMap = {
   "Pulau Sumatra": () => import("../assets/islands/sumatera.svg"),
   "Pulau Kalimantan": () => import("../assets/islands/kalimantan.svg"),
   "Pulau Sulawesi": () => import("../assets/islands/sulawesi.svg"),
   "Kepulauan Nusa Tenggara": () => import("../assets/islands/nusaTenggara.svg"),
   "Kepulauan Maluku": () => import("../assets/islands/maluku.svg"),
   "Pulau Papua": () => import("../assets/islands/papua.svg"),
   "Pulau Jawa": () => import("../assets/islands/jawa.svg"),
};

const loadDefault = () => import("../assets/islands/default.svg");

/**
 * Load gambar pulau berdasarkan nama.
 * @param {string} name - Nama pulau.
 * @returns {Promise<string>} URL dari gambar SVG.
 */
export async function loadIslandImage(name) {
   try {
      const mod = await (islandMap[name] ? islandMap[name]() : loadDefault());
      return mod.default;
   } catch (err) {
      console.error("Gagal load gambar:", err);
      const fallback = await loadDefault();
      return fallback.default;
   }
}
