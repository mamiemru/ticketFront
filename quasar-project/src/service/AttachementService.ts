
import { AxiosResponse } from 'axios';
import { TicketDeCaisse } from '../models/models';
import AttachementApi from 'src/api/AttachementApi';

class AttachementService {

    static uploadAttachment(formData : FormData): Promise<AxiosResponse<TicketDeCaisse>> {
        return AttachementApi.uploadAttachment(formData);
    }
}

export default AttachementService;