import React, { useState, useEffect } from "react";
import { CircleX } from 'lucide-react';
import "./CSS/MultipleImageUploader.css";
export function MultipleImageUploader({
    onImageUpload,
    img
}: {
    onImageUpload: (images: File[]) => void;
    img?: File[];
}) {
  const [images, setImages] = useState<File[]>(img || []);
  const [previews, setPreviews] = useState<string[]>([]);

  // Generate previews when images are added
  useEffect(() => {
    const newPreviews = images.map((image) => URL.createObjectURL(image));
    setPreviews(newPreviews);

    // Cleanup previews on unmount or when images change
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [images]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      onImageUpload(Array.from(e.target.files || []));
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    onImageUpload(images.filter((_, i) => i !== index));
  };




  return (
    <div style={{width:'100%'}}>
      <h2 className="text-xl font-bold mb-4">Upload and Preview Images</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      {previews.length > 0 && (
        <div className="chosen-image-container">
          {previews.map((preview, index) => (
            <div key={index} className="show-winner-image-container">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="multi-image-uploader "

              />
              <CircleX className="dismiss-image-icon"
                onClick={() => removeImage(index)} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MultipleImageUploader;