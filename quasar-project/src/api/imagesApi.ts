

import { AxiosResponse } from 'axios';
import { TDCAttachement } from 'src/models/models';
import axiosConfig from '../api/axiosConfig';

class ImageApi {

    static uploadAttachment(formData : FormData): Promise<AxiosResponse<TDCAttachement>> {
        return axiosConfig.post<TDCAttachement>(
            'attachements/',
            formData,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    }
}

export default ImageApi;