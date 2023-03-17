
import { AxiosResponse } from 'axios';
import { TDCShop } from '../models/models';
import TDCShopApi from '../api/tdcshopsApi'

class TDCShopService {

    static getShops(): Promise<AxiosResponse<TDCShop[]>> {
        return TDCShopApi.getShops();
    }

    static putShop(id: number | undefined, shop: TDCShop): Promise<AxiosResponse<TDCShop>> {
        if (id) {
            return TDCShopApi.putShop(id, shop);
        }
        throw new Error('id is undefined');
    }

    static postShop(shop: TDCShop): Promise<AxiosResponse<TDCShop>> {
        return TDCShopApi.postShop(shop);
    }

    static deleteShop(id: number | undefined): Promise<AxiosResponse<TDCShop>> {
        if (id) {
            return TDCShopApi.deleteShop(id);
        }
        throw new Error('id is undefined');
    }

}

export default TDCShopService;