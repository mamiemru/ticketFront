
import { AxiosResponse } from 'axios';
import { ShopNameResponse } from '../models/models';
import { OnChangedShopNameResponse } from '../models/models';
import { Article } from '../models/models';
import CompletionApi from 'src/api/completionApi';

class CompletionService {

    static getCompletionShopName(): Promise<AxiosResponse<ShopNameResponse>> {
        return CompletionApi.getCompletionShopName();
    }

    static getCompletionOnChangedShopName(shop : string | undefined): Promise<AxiosResponse<OnChangedShopNameResponse>> {
        if (shop) {
            return CompletionApi.getCompletionOnChangedShopName(shop);
        }
        throw new Error('shop is undefined');
    }    
    
    static getCompletionOnChangedArticleIdent(shop : string | undefined, itemArticle: string | undefined): Promise<AxiosResponse<Article>> {
        if (shop && itemArticle) {
            return CompletionApi.getCompletionOnChangedArticleIdent(shop, itemArticle);
        }
        throw new Error('shop or itemArticle is undefined');
    }
}

export default CompletionService;