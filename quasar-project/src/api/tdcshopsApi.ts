
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
            },
        );
    }

}

export default TDCShopApi;