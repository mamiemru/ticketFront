
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
}

export default ArticleService;