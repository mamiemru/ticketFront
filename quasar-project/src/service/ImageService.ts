

import { AxiosResponse } from 'axios';
import { TDCAttachement } from 'src/models/models';
import axiosConfig from 'src/api/axiosConfig';
import ImageApi from 'src/api/imagesApi';

class ImageService {

    static getImage(categorie : string, imageName : string): string {
        return `${axiosConfig.defaults.baseURL}/images/${categorie}/${imageName}`;
    }

    static uploadAttachment(formData : FormData): Promise<AxiosResponse<TDCAttachement>> {
        return ImageApi.uploadAttachment(formData);
    }
}

export default ImageService;