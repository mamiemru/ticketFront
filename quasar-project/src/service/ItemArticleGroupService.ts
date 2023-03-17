
import { AxiosResponse } from 'axios';
import { TDCGroup } from '../models/models';
import ItemArticleGroupApi from 'src/api/itemarticleGroupApi';

class ItemArticleGroupService {

    static getGroups(): Promise<AxiosResponse<TDCGroup[]>> {
        return ItemArticleGroupApi.getGroups();
    }

}

export default ItemArticleGroupService;