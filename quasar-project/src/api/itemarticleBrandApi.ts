
import { AxiosResponse } from 'axios';
import { TDCBrand } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class ItemArticleBrandApi {

    static getBrands(): Promise<AxiosResponse<TDCBrand[]>> {
        return axiosConfig.get<TDCBrand[]>(
            'ticket_de_caisse/article/item/brand/',
        );
    }

    static post(brand : TDCBrand): Promise<AxiosResponse<TDCBrand>> {
        return axiosConfig.post<TDCBrand>(
            'ticket_de_caisse/article/item/brand/',
            brand
        );
    }

}

export default ItemArticleBrandApi;