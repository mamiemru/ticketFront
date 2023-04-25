
import { AxiosResponse } from 'axios';
import { ShopNameResponse } from '../models/models';
import { OnChangedShopNameResponse } from '../models/models';
import { Article } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class CompletionApi {

    static getCompletionShopName(): Promise<AxiosResponse<ShopNameResponse>> {
        return axiosConfig.post<ShopNameResponse>(
            'completion/changed/',
            
        );
    }

    static getCompletionOnChangedShopId(shop_id : number): Promise<AxiosResponse<OnChangedShopNameResponse>> {
        return axiosConfig.get<OnChangedShopNameResponse>(
            `completion/changed/${shop_id}/`,
            
        );
    }    
    
    static getCompletionOnChangedArticleIdent(shop : string, itemArticle: string): Promise<AxiosResponse<Article>> {
        return axiosConfig.get<Article>(
            `completion/changed/${shop}/article/item/${itemArticle}/`,
            
        );
    }
}

export default CompletionApi;