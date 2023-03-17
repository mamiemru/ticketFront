
import { AxiosResponse } from 'axios';
import { TicketDeCaisse, TicketDeCaisseHeaderResponse } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class TicketdecaisseApi {

    static getTicketDeCaisseList(limit: number): Promise<AxiosResponse<TicketDeCaisseHeaderResponse[]>> {
        return axiosConfig.get<TicketDeCaisseHeaderResponse[]>(
            `ticket_de_caisse/last_n/${limit}/`,
            
        );
    }    
    
    static getTicketDeCaisse(tdcId : string): Promise<AxiosResponse<TicketDeCaisse>> {
        return axiosConfig.get<TicketDeCaisse>(
            `ticket_de_caisse/${tdcId}/`,
            
        );
    }

    static deleteTicketDeCaisse(tdcId : string): Promise<AxiosResponse<TicketDeCaisse>> {
        return axiosConfig.delete<TicketDeCaisse>(
            `ticket_de_caisse/${tdcId}/`,
            
        );
    }

    static postTicketDeCaisse(tdc : TicketDeCaisse): Promise<AxiosResponse<TicketDeCaisse>> {
        return axiosConfig.post<TicketDeCaisse>(
            'ticket_de_caisse/',
            tdc,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
            },
        );
    }

    static putTicketDeCaisse(tdc : TicketDeCaisse, tdcId : string): Promise<AxiosResponse<TicketDeCaisse>> {
        return axiosConfig.post<TicketDeCaisse>(
            `TicketDeCaisse/tdc/${tdcId}`,
            { shop: tdc.shop, date: tdc.date, categorie: tdc.category, articles: tdc.articles },
            
        );
    }
}

export default TicketdecaisseApi;