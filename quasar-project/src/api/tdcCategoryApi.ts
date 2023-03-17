
import { AxiosResponse } from 'axios';
import { TDCCategory } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class TDCCategoryApi {

    static getCategories(): Promise<AxiosResponse<TDCCategory[]>> {
        return axiosConfig.get<TDCCategory[]>(
            'ticket_de_caisse/category/',
            
        );
    }

    static put(id: number, category: TDCCategory): Promise<AxiosResponse<TDCCategory>> {
        return axiosConfig.put<TDCCategory>(
            `ticket_de_caisse/category/${id}/`,
            category,
        )
    }

    static post(category: TDCCategory): Promise<AxiosResponse<TDCCategory>> {
        return axiosConfig.post<TDCCategory>(
            'ticket_de_caisse/category/',
            category,
        )
    }

    static delete(id: number): Promise<AxiosResponse<TDCCategory>> {
        return axiosConfig.delete<TDCCategory>(
            `ticket_de_caisse/category/${id}/`,
        )
    }
}

export default TDCCategoryApi;