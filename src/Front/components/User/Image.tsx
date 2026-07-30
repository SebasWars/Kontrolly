import { faCloudArrowUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Props {
  editMode: boolean;
  imageUrl: string | null | undefined;
  newImageFile: File | null | undefined;
  handleImageChange: (file: File) => void;
}

export function UserImage({
  editMode,
  imageUrl,
  newImageFile,
  handleImageChange,
}: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleImageChange(file);
  };

  useEffect(() => {
    if (!newImageFile) {
      setImagePreview(null);
      return;
    }

    const objURL = URL.createObjectURL(newImageFile);
    setImagePreview(objURL);

    return () => URL.revokeObjectURL(objURL);
  }, [newImageFile]);

  const displaySrc = imagePreview ?? imageUrl;

  return (
    <div className="image_container">
      {displaySrc ? (
        <img
          src={displaySrc}
          alt="user_profile_picture"
          className={
            editMode ? "user_picture_profile_change" : "user_picture_profile"
          }
        />
      ) : (
        !editMode && (
          <FontAwesomeIcon className="user_placeholder_icon" icon={faUser} />
        )
      )}

      {editMode && (
        <label className="upload_label">
          <FontAwesomeIcon className="uploadIcon" icon={faCloudArrowUp} />
          <input
            onChange={handleImage}
            type="file"
            accept="image/*"
            hidden
          />
        </label>
      )}
    </div>
  );
}
