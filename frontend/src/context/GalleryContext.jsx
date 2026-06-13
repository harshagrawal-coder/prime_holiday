import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { galleryItems as defaultGallery } from "../data/galleryItems.js";
import { logActivity } from "../utils/activityLogger";

const GALLERY_STORAGE_KEY = "prime-holiday-gallery";

const GalleryContext = createContext(null);

const createLocalId = () => globalThis.crypto?.randomUUID?.() ?? `gallery-${Date.now()}`;

const readStoredGallery = () => {
  try {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultGallery;
  } catch {
    return defaultGallery;
  }
};

export const GalleryProvider = ({ children }) => {
  const [images, setImages] = useState(readStoredGallery);

  const addImage = useCallback((newImage) => {
    const mergedImage = {
      ...newImage,
      id: createLocalId(),
      heightClass: newImage.heightClass || "h-[300px]",
    };

    setImages((currentImages) => {
      const updatedImages = [mergedImage, ...currentImages];
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedImages));
      return updatedImages;
    });

    logActivity("Added image to gallery");
  }, []);

  const deleteImage = useCallback((id) => {
    setImages((currentImages) => {
      const updatedImages = currentImages.filter((image) => image.id !== id);
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedImages));
      return updatedImages;
    });

    logActivity("Deleted image from gallery");
  }, []);

  const value = useMemo(
    () => ({ images, addImage, deleteImage }),
    [addImage, deleteImage, images]
  );

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within GalleryProvider");
  }
  return context;
};
