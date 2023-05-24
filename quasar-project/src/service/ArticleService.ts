
import { AxiosResponse } from 'axios';
import { Article } from '../models/models';
import ArticleApi from 'src/api/articleApi';

class ArticleService {
    
    static listArticleByIdent(ident : string | undefined): Promise<AxiosResponse<Article[]>> {
        if (ident) {
            return ArticleApi.listArticleByIdent(ident);
        }
        throw new Error('ident is undefined');
    }

    static getArticleByEan13Gs1(code: string | undefined): Promise<AxiosResponse<Article>> {
        if (code) {
            return ArticleApi.getArticleByEan13Gs1(code);
        }
        throw new Error('code is undefined');
    }
}

export default ArticleService;