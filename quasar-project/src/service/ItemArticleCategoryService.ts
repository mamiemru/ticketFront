
import { AxiosResponse } from 'axios';
import { TDCCategory } from '../models/models';
import ItemArticleCategoryApi from 'src/api/itemarticleCategoryApi';

class ItemArticleCategoryService {

    static getCategories(): Promise<AxiosResponse<TDCCategory[]>> {
        return ItemArticleCategoryApi.getCategories();
    }

}

export default ItemArticleCategoryService;