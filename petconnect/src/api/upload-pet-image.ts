import { api } from "./axios";


type petImage = FormData

export function uploadPetImage(params: petImage, petId: string) {
    return api.post(`files/upload-image/${petId}`, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}