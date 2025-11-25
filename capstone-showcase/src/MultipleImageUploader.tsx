import React, { useEffect, useMemo } from "react";
import { CircleX, HardDriveUpload } from "lucide-react";
import "./CSS/MultipleImageUploader.css";

export type UploadableImage = File | string;

type MultipleImageUploaderProps = {
  images: UploadableImage[];
  onChange: (images: UploadableImage[]) => void;
  inputId: string;
  multiple?: boolean;
  existingBaseUrl?: string;
};

const isFile = (image: UploadableImage): image is File =>
  typeof File !== "undefined" && image instanceof File;

const buildPreviewUrl = (image: UploadableImage, baseUrl: string) => {
  if (typeof image === "string") {
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }
    return `${baseUrl}${image}`;
  }
  return URL.createObjectURL(image);
};

export function MultipleImageUploader({
  images,
  onChange,
  inputId,
  multiple = true,
  existingBaseUrl = "",
}: MultipleImageUploaderProps) {
  const previews = useMemo(
    () => images.map((image) => buildPreviewUrl(image, existingBaseUrl)),
    [images, existingBaseUrl]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview, index) => {
        if (isFile(images[index])) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [previews, images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const selectedFiles = Array.from(e.target.files);
    const nextImages = multiple ? [...images, ...selectedFiles] : selectedFiles.slice(0, 1);
    onChange(nextImages);

    // Allow selecting the same file again if needed
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div style={{ width: "100%" }}>
      {previews.length === 0 && (
        <label htmlFor={inputId} className="custom-file-upload">
          <HardDriveUpload className="w-4 h-4 mr-2 upload-icon" /> Choose File
        </label>
      )}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="multi-image-uploader-input"
      />
      {previews.length > 0 && (
        <div className="chosen-image-container">
          {previews.map((preview, index) => (
            <div key={`${preview}-${index}`} className="show-winner-image-container">
              <img src={preview} alt={`Preview ${index + 1}`} className="multi-image-uploader " />
              <CircleX className="dismiss-image-icon" onClick={() => removeImage(index)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultipleImageUploader;
