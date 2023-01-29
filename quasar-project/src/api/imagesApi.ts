

import axiosConfig from '../api/axiosConfig';

class ImageApi {

    static getImage(categorie : string, imageName : string): string {
        return `${axiosConfig.defaults.baseURL}/images/${categorie}/${imageName}`;
    }
}

export default ImageApi;