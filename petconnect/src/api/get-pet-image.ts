import { api } from "./axios";

export const getPetImage = async (image: string | null) => {
  const response = await api.get<Blob>(`pet/image/${image}`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });
  const url = URL.createObjectURL(blob);
  return url;
  //   return api.get<Blob>(`/pet/image/${imageUrl}`, {responseType:'blob'})
};
