
import { AxiosResponse } from 'axios';
import { TDCCategory } from '../models/models';
import TDCCategoryApi from 'src/api/tdcCategoryApi';

class TDCCategoryService {

    static getCategories(): Promise<AxiosResponse<TDCCategory[]>> {
        return TDCCategoryApi.getCategories();
    }

    static put(id: number | undefined, category: TDCCategory): Promise<AxiosResponse<TDCCategory>> {
        if (id) {
            return TDCCategoryApi.put(id, category);
        }
        throw new Error('id is undefined');
    }

    static post(category: TDCCategory): Promise<AxiosResponse<TDCCategory>> {
        return TDCCategoryApi.post(category);
    }

    static delete(id: number | undefined): Promise<AxiosResponse<TDCCategory>> {
        if (id) {
            return TDCCategoryApi.delete(id);
        }
        throw new Error('id is undefined');
    }
}

export default TDCCategoryService;