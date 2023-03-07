
import { AxiosResponse } from 'axios';
import { TDCShop } from '../models/models';
import axiosConfig from './axiosConfig';

class TDCShopApi {

    static getShops(): Promise<AxiosResponse<TDCShop[]>> {
        return axiosConfig.get<TDCShop[]>(
            'ticket_de_caisse/shop/',
            {
                headers: {
                    Accept: 'application/json'
                },
            }
        );
    }

    static putShop(id: number, shop: TDCShop): Promise<AxiosResponse<TDCShop>> {
        return axiosConfig.put<TDCShop>(
            `ticket_de_caisse/shop/${id}/`,
            shop,
            {
                headers: {
                    'Content-type': 'application/json;charset=utf8'
                },
            }
        )
    }

}

export default TDCShopApi;