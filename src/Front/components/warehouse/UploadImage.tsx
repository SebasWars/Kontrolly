import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import type { PropsCreateItemImage } from "../../Types/StockTypes";

function UploadImage({ modifyFormData, initialImage }: PropsCreateItemImage) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImage || null,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      modifyFormData("image", file);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="image_container">
      <div className="image_box">
        <label>
          {imagePreview ? (
            <img src={imagePreview} alt={imagePreview} />
          ) : (
            <FontAwesomeIcon className="uploadIcon" icon={faCloudArrowUp} />
          )}
          <input onChange={handleImageChange} type="file" accept="image/*" />
        </label>
      </div>
      {!imagePreview ? <p>Subir imagen</p> : <p>Cambiar imagen</p>}
    </div>
  );
}
export default UploadImage;
