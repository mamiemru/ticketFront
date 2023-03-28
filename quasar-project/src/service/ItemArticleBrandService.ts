
import { AxiosResponse } from 'axios';
import { TDCBrand } from '../models/models';
import ItemArticleBrandApi from 'src/api/itemarticleBrandApi';

class ItemArticleBrandService {

    static getBrands(): Promise<AxiosResponse<TDCBrand[]>> {
        return ItemArticleBrandApi.getBrands();
    }

}

export default ItemArticleBrandService;