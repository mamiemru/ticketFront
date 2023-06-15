
import { AxiosResponse } from 'axios';
import { MlAttachementTicket, MlAttachementTicketPagginationResult } from '../models/models';
import axiosConfig from './axiosConfig';

class MlAttachementTicketApi {

    static paggination_from_url(url: string): Promise<AxiosResponse<MlAttachementTicketPagginationResult>> {
        return axiosConfig.get<MlAttachementTicketPagginationResult>(
            url,
        );
    }

    static paggination_from_page_url(page: string | null): Promise<AxiosResponse<MlAttachementTicketPagginationResult>> {
        return axiosConfig.get<MlAttachementTicketPagginationResult>(
            `ml/attachement/ticket/?page=${page}`
        );
    }

    static list(): Promise<AxiosResponse<MlAttachementTicketPagginationResult>> {
        return axiosConfig.get<MlAttachementTicketPagginationResult>(
            'ml/attachement/ticket/',
        );
    }

    static get(id: number): Promise<AxiosResponse<MlAttachementTicket>> {
        return axiosConfig.get<MlAttachementTicket>(
            `ml/attachement/ticket/${id}/`,
        )
    }

    static put(id: number, attachement: MlAttachementTicket): Promise<AxiosResponse<MlAttachementTicket>> {
        return axiosConfig.put<MlAttachementTicket>(
            `ml/attachement/ticket/${id}/`,
            attachement
        )
    }

    static delete(id: number): Promise<AxiosResponse<MlAttachementTicket>> {
        return axiosConfig.delete<MlAttachementTicket>(
            `ml/attachement/ticket/${id}/`,
        )
    }
}

export default MlAttachementTicketApi;