
import { AxiosResponse } from 'axios';
import { Article, ItemArticlePagination, ItemArticle } from '../models/models';
import ItemArticleApi from 'src/api/itemarticleApi';

class ItemArticleService {

    static getItemArticlePagination(prebuiltUrl : string | null): Promise<AxiosResponse<ItemArticlePagination>> {
        return ItemArticleApi.getItemArticlePagination(prebuiltUrl);
    }    
    
    static getItemArticlePaginationPerPage(page: string): Promise<AxiosResponse<ItemArticlePagination>> {
        return ItemArticleApi.getItemArticlePaginationPerPage(page);
    }

    static putItemArticle(itemArticle: ItemArticle): Promise<AxiosResponse<ItemArticle>> {
        return ItemArticleApi.putItemArticle(itemArticle);
    }

    static postfilterItemArticle(article: Article): Promise<AxiosResponse<ItemArticlePagination>> {
        return ItemArticleApi.postfilterItemArticle(article);
    }
}

export default ItemArticleService;