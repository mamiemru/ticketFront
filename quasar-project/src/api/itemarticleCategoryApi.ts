
import { AxiosResponse } from 'axios';
import { TDCCategory } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class ItemArticleCategoryApi {

    static getCategories(): Promise<AxiosResponse<TDCCategory[]>> {
        return axiosConfig.get<TDCCategory[]>(
            'ticket_de_caisse/article/item/category/',
            
        );
    }

}

export default ItemArticleCategoryApi;