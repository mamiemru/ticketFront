
import { AxiosResponse } from 'axios';
import { TicketDeCaisse, TicketDeCaisseHeaderResponse } from '../models/models';
import TicketdecaisseApi from '../api/ticketdecaisseApi';

class TicketdecaisseService {

    static getTicketDeCaisseList(limit: number): Promise<AxiosResponse<TicketDeCaisseHeaderResponse[]>> {
        return TicketdecaisseApi.getTicketDeCaisseList(limit);
    }    
    
    static getTicketDeCaisse(tdcId : string): Promise<AxiosResponse<TicketDeCaisse>> {
        return TicketdecaisseApi.getTicketDeCaisse(tdcId);
    }

    static deleteTicketDeCaisse(tdcId : string | undefined): Promise<AxiosResponse<TicketDeCaisse>> {
        if (tdcId) {
            return TicketdecaisseApi.deleteTicketDeCaisse(tdcId);
        }
        throw new Error('id is undefined');
    }

    static postTicketDeCaisse(tdc : TicketDeCaisse): Promise<AxiosResponse<TicketDeCaisse>> {
        return TicketdecaisseApi.postTicketDeCaisse(tdc);
    }

    static putTicketDeCaisse(tdc : TicketDeCaisse, tdcId : string | undefined): Promise<AxiosResponse<TicketDeCaisse>> {
        if (tdcId) {
            return TicketdecaisseApi.putTicketDeCaisse(tdc, tdcId);
        }
        throw new Error('id is undefined');
    }
}

export default TicketdecaisseService;