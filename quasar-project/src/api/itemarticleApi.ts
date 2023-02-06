
import { AxiosResponse } from 'axios';
import { ItemArticlePagination } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class ItemArticleApi {

    static getItemArticlePagination(prebuiltUrl : string | null): Promise<AxiosResponse<ItemArticlePagination>> {
        return axiosConfig.get<ItemArticlePagination>(
            (prebuiltUrl)? prebuiltUrl : '/ticket_de_caisse/article/item/',
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }    
    
    static getItemArticlePaginationPerPage(page: string): Promise<AxiosResponse<ItemArticlePagination>> {
        return axiosConfig.get<ItemArticlePagination>(
            `/ticket_de_caisse/article/item/?page=${page}`,
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }    
}

export default ItemArticleApi;