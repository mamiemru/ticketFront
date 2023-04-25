
import { AxiosResponse } from 'axios';
import { ShopNameResponse } from '../models/models';
import { OnChangedShopNameResponse } from '../models/models';
import { Article } from '../models/models';
import CompletionApi from 'src/api/completionApi';

class CompletionService {

    static getCompletionShopName(): Promise<AxiosResponse<ShopNameResponse>> {
        return CompletionApi.getCompletionShopName();
    }

    static getCompletionOnChangedShopId(shop_id : number): Promise<AxiosResponse<OnChangedShopNameResponse>> {
        return CompletionApi.getCompletionOnChangedShopId(shop_id);
    }    
    
    static getCompletionOnChangedArticleIdent(shop : string | undefined, itemArticle: string | undefined): Promise<AxiosResponse<Article>> {
        if (shop && itemArticle) {
            return CompletionApi.getCompletionOnChangedArticleIdent(shop, itemArticle);
        }
        throw new Error('shop or itemArticle is undefined');
    }
}

export default CompletionService;