
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

    static put(id: number, category: TDCCategory): Promise<AxiosResponse<TDCCategory>> {
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

    static post(category: TDCCategory): Promise<AxiosResponse<TDCCategory>> {
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

    static delete(id: number): Promise<AxiosResponse<TDCCategory>> {
        return axiosConfig.delete<TDCCategory>(
            `ticket_de_caisse/category/${id}/`,
            {
                headers: {
                    'Content-type': 'application/json;charset=utf8'
                },
            }
        )
    }
}

export default TDCCategoryApi;