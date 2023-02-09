
import { AxiosResponse } from 'axios';
import { TDCGroup } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class ItemArticleGroupApi {

    static getGroups(): Promise<AxiosResponse<TDCGroup[]>> {
        return axiosConfig.get<TDCGroup[]>(
            'ticket_de_caisse/article/item/group/',
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }

}

export default ItemArticleGroupApi;