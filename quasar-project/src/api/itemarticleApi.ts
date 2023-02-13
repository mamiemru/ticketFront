
import { AxiosResponse } from 'axios';
import { Article, ItemArticlePagination } from '../models/models';
import { ItemArticle } from '../models/models';
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

    static putItemArticle(itemArticle: ItemArticle): Promise<AxiosResponse<ItemArticle>> {
        return axiosConfig.put<ItemArticle>(
            `/ticket_de_caisse/article/item/${itemArticle.id}/`,
            itemArticle,
            {
                headers: {
                    Accept: 'application/json'
                },
            }
        )
    }

    static postfilterItemArticle(article: Article): Promise<AxiosResponse<ItemArticlePagination>> {
        return axiosConfig.post<ItemArticlePagination>(
            '/ticket_de_caisse/article/item/filter/',
            article,
            {
                headers: {
                    Accept: 'application/json'
                },
            }
        )
    }
}

export default ItemArticleApi;