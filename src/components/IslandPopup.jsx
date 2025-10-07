import { useIslandStore } from "../store/islandStore";
import IslandImage from "./IslandImage";

export default function IslandPopup({ onClose, onPrev, onNext }) {
   const { selectedIsland, imageSrc, loadingImage } = useIslandStore();

   return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[2000] transition-opacity duration-300">
         <div className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden w-[95%] max-w-[90vw]">
            <div className="flex flex-col items-center bg-gray-50 p-4 flex-1">
               <div className="relative w-full flex justify-center items-center">
                  <button onClick={onPrev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white rounded-full px-3 py-1 text-lg hover:bg-black/80 focus:outline-none">
                     ◀
                  </button>

                  <div className="relative z-10 pointer-events-none select-none">
                     <IslandImage src={imageSrc} alt={selectedIsland} isLoading={loadingImage} />
                  </div>

                  <button onClick={onNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white rounded-full px-3 py-1 text-lg hover:bg-black/80 focus:outline-none">
                     ▶
                  </button>
               </div>

               <button onClick={onClose} className="mt-4 bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-700 focus:outline-none">
                  ⬅ Back
               </button>
            </div>

            <div className="flex-1 p-6">
               <h2 className="text-2xl font-bold mb-2">{selectedIsland}</h2>
               <p className="text-gray-700 mb-3">Informasi tentang {selectedIsland}. Konten bisa disesuaikan nanti.</p>
               <p className="text-gray-700">
                  File SVG-nya di-load secara <em>lazy</em> saat popup dibuka.
               </p>
            </div>
         </div>
      </div>
   );
}
