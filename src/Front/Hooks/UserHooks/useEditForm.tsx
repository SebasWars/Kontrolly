import { useEffect, useState } from "react";
import { useAuthorization } from "../UseAuthorization";
import type {
  FormEditUser,
  User,
} from "../../context/RecuderTypes/Authorization";
import { updateUserInformation } from "../../services/userHTTP";

export function UseEditForm() {
  const { user } = useAuthorization();
  const [editMode, setEditMode] = useState(false);

  function mapUserFormData(user: User | null): FormEditUser | null {
    if (!user) return null;

    return {
      companyName: user.companyName,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      postalCode: user.postalCode,
      userImage: null,
      address: user.address,
      city: user.city,
    };
  }
  const [formData, setFormdata] = useState<FormEditUser | null>(() =>
    mapUserFormData(user),
  );

  const handleEdit = () => {
    setEditMode((prev) => !prev);
  };

  const handleChage = (
    fiel: keyof Omit<FormEditUser, "userImage">,
    value: string,
  ) => {
    setFormdata((prev) => (prev ? { ...prev, [fiel]: value } : prev));
  };

  const handleImageChange = (file: File) => {
    setFormdata((prev) => (prev ? { ...prev, userImage: file } : prev));
  };

  async function updateUser(formData: FormEditUser, id: string) {
    if (!user) return;
    try {
      const updatedUser = await updateUserInformation(formData, id);
      return updatedUser
    } catch (error) {
      console.error("Error updating user:", error);
      throw error
    }
  }

  useEffect(() => {
    setFormdata(mapUserFormData(user));
  }, [user]);

  return {
    editMode,
    formData,
    handleEdit,
    handleChage,
    handleImageChange,
    updateUser,
  };
}
