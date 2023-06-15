
import { AxiosResponse } from 'axios';
import { MlAttachementTicket, MlAttachementTicketPagginationResult } from '../models/models';
import MlAttachementTicketApi from 'src/api/mlAttachementTicketApi';

class MlAttachementTicketService {

    static list(url: string | null=null): Promise<AxiosResponse<MlAttachementTicketPagginationResult>> {
        if (url)  {
            return MlAttachementTicketApi.paggination_from_url(url);
        }
        return MlAttachementTicketApi.list();
    }

    static list_per_page(page: string | null): Promise<AxiosResponse<MlAttachementTicketPagginationResult>> {
        return MlAttachementTicketApi.paggination_from_page_url(page)
    }

    static get(id: number | undefined): Promise<AxiosResponse<MlAttachementTicket>> {
        if (id) {
            return MlAttachementTicketApi.get(id);
        }
        throw new Error('id is undefined');
    }

    static put(id: number | undefined, attachement: MlAttachementTicket): Promise<AxiosResponse<MlAttachementTicket>> {
        if (id) {
            return MlAttachementTicketApi.put(id, attachement);
        }
        throw new Error('id is undefined');
    }

    static delete(id: number | undefined): Promise<AxiosResponse<MlAttachementTicket>> {
        if (id) {
            return MlAttachementTicketApi.delete(id);
        }
        throw new Error('id is undefined');
    }
}

export default MlAttachementTicketService;