
import { AxiosResponse } from 'axios';
import { MlAttachementTicket } from '../models/models';
import mlAxiosConfig from '../api/mlaxiosConfig';

class MlNerApi {

    static generate_ner_from_gcp_or_image(ml_attachement_ticket_id: number, reset: boolean): Promise<AxiosResponse<MlAttachementTicket>> {
        return mlAxiosConfig.post<MlAttachementTicket>(
            `ml/attachement/ticket/ner/${ml_attachement_ticket_id}${(reset)? '?reset=true': ''}`,
        )
    }

    static get_tokens(): Promise<AxiosResponse<string[]>> {
        return mlAxiosConfig.get<string[]>(
            'ml/attachement/ticket/ner/tokens/'
        )
    }
}

export default MlNerApi;