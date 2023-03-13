
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

    static postShop(shop: TDCShop): Promise<AxiosResponse<TDCShop>> {
        return axiosConfig.post<TDCShop>(
            'ticket_de_caisse/shop/',
            shop,
            {
                headers: {
                    'Content-type': 'application/json;charset=utf8'
                },
            }
        )
    }

    static deleteShop(id: number): Promise<AxiosResponse<TDCShop>> {
        return axiosConfig.delete<TDCShop>(
            `ticket_de_caisse/shop/${id}/`,
            {
                headers: {
                    'Content-type': 'application/json;charset=utf8'
                },
            }
        )
    }

}

export default TDCShopApi;