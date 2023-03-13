
import { AxiosResponse } from 'axios';
import { TDCCategory } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class TDCCategoryApi {

    static getCategories(): Promise<AxiosResponse<TDCCategory[]>> {
        return axiosConfig.get<TDCCategory[]>(
            'ticket_de_caisse/category/',
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }

    static putCategory(id: number, category: TDCCategory): Promise<AxiosResponse<TDCCategory>> {
        return axiosConfig.put<TDCCategory>(
            `ticket_de_caisse/category/${id}/`,
            category,
            {
                headers: {
                    'Content-type': 'application/json;charset=utf8'
                },
            }
        )
    }

    static postCategory(category: TDCCategory): Promise<AxiosResponse<TDCCategory>> {
        return axiosConfig.post<TDCCategory>(
            'ticket_de_caisse/category/',
            category,
            {
                headers: {
                    'Content-type': 'application/json'
                },
            }
        )
    }
}

export default TDCCategoryApi;