
import { AxiosResponse } from 'axios';
import { TDCEnseigne } from '../models/models';
import TDCShopEnseigneApi from '../api/tdcshopsEnseigneApi'

class TDCShopEnseigneService {

    static getShopEnseignes(): Promise<AxiosResponse<TDCEnseigne[]>> {
        return TDCShopEnseigneApi.getShopEnseignes();
    }

    static postShopEnseigne(shop: TDCEnseigne): Promise<AxiosResponse<TDCEnseigne>> {
        return TDCShopEnseigneApi.postShopEnseigne(shop);
    }

}

export default TDCShopEnseigneService;