
import { AxiosResponse } from 'axios';
import { TicketDeCaisse } from '../models/models';
import MLApi from 'src/api/mlApi';

class MLService {

    static uploadAttachment(formData : FormData): Promise<AxiosResponse<TicketDeCaisse>> {
        return MLApi.uploadAttachment(formData);
    }
}

export default MLService;