
import { AxiosResponse } from 'axios';
import { ShopNameResponse } from '../models/models';
import { OnChangedShopNameResponse } from '../models/models';
import { OnChangedArticleIdentResponse } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class CompletionApi {

    static getCompletionShopName(): Promise<AxiosResponse<ShopNameResponse>> {
        return axiosConfig.post<ShopNameResponse>(
            'completion/changed/',
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }

    static getCompletionOnChangedShopName(shop : string): Promise<AxiosResponse<OnChangedShopNameResponse>> {
        return axiosConfig.get<OnChangedShopNameResponse>(
            `completion/changed/${shop}/`,
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }    
    
    static getCompletionOnChangedArticleIdent(shop : string, itemArticle: string): Promise<AxiosResponse<OnChangedArticleIdentResponse>> {
        return axiosConfig.get<OnChangedArticleIdentResponse>(
            `completion/changed/${shop}/article/item/${itemArticle}/`,
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }
}

export default CompletionApi;