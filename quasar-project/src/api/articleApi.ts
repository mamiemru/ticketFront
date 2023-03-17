
import { AxiosResponse } from 'axios';
import { Article } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class ArticleApi {
    
    static listArticleByIdent(ident : string): Promise<AxiosResponse<Article[]>> {
        return axiosConfig.get<Article[]>(
            `/ticket_de_caisse/article/?ident=${ident}`,
            
        );
    }
}

export default ArticleApi;