/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useImageFile = (imageUrl: string, fileName: string = "image.jpg") => {
  const [file, setFile] = useState<File | null>(null);

  const fetchImage = async () => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const imageFile = new File([blob], fileName, { type: blob.type });
      setFile(imageFile);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted && imageUrl) {
        fetchImage();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [imageUrl, fileName]);

  return file;
};

export default useImageFile;
