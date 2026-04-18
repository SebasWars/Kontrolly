import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import type { PropsCreateItemImage } from "../../Types/StockTypes";

function UploadImage({modifyFormData}: PropsCreateItemImage) {
  const [imagePreviwe, setImagePreviwe] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreviwe(objectUrl);
      modifyFormData('image', file)
    }
  };

  return (
    <div className="image_container">
      <div className="image_box">
        <label>
          {imagePreviwe ? (
            <img src={imagePreviwe} alt={imagePreviwe} />
          ) : (
            <FontAwesomeIcon className="uploadIcon" icon={faCloudArrowUp} />
          )}
          <input onChange={handleImageChange} type="file" accept="image/*" />
        </label>
      </div>
      {!imagePreviwe ? <p>Subir imagen</p> : <p>Cambiar imagen</p>}
    </div>
  );
}
export default UploadImage;
