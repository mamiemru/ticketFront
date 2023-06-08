
import { AxiosResponse } from 'axios';
import { TicketDeCaisse } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class AttachementApi {

    static uploadAttachment(formData : FormData): Promise<AxiosResponse<TicketDeCaisse>> {
        return axiosConfig.post<TicketDeCaisse>(
            'detection/',
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

export default AttachementApi;