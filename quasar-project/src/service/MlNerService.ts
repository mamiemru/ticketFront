
import { AxiosResponse } from 'axios';
import { MlAttachementTicket } from '../models/models';
import MlNerApi from 'src/api/mlNerApi';

class MlNerService {

    static generate_ner_from_gcp_or_image(ml_attachement_ticket_id: number, reset: boolean): Promise<AxiosResponse<MlAttachementTicket>> {
        return MlNerApi.generate_ner_from_gcp_or_image(ml_attachement_ticket_id, reset);
    }

    static get_tokens(): Promise<AxiosResponse<string[]>> {
        return MlNerApi.get_tokens();
    }
}

export default MlNerService;