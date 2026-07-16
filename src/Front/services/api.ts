export const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json()
};
