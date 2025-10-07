import { create } from "zustand";
import { loadIslandImage } from "../utils/islandLoader";

export const useIslandStore = create(set => ({
   selectedIsland: null,
   imageSrc: null,
   loadingImage: false,

   setSelectedIsland: island => set({ selectedIsland: island }),
   setImageSrc: src => set({ imageSrc: src }),
   setLoadingImage: state => set({ loadingImage: state }),

   fetchIslandImage: async name => {
      set({ loadingImage: true });
      const src = await loadIslandImage(name);

      const img = new Image();
      img.src = src;
      img.onload = () => set({ imageSrc: src, loadingImage: false });
   },
}));
