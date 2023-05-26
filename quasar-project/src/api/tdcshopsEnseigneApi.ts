
import { AxiosResponse } from 'axios';
import { TDCEnseigne } from '../models/models';
import axiosConfig from './axiosConfig';

class TDCShopEnseigneApi {

    static getShopEnseignes(): Promise<AxiosResponse<TDCEnseigne[]>> {
        return axiosConfig.get<TDCEnseigne[]>(
            'ticket_de_caisse/shop/enseigne/',
        );
    }

    static postShopEnseigne(enseigne: TDCEnseigne): Promise<AxiosResponse<TDCEnseigne>> {
        return axiosConfig.post<TDCEnseigne>(
            'ticket_de_caisse/shop/enseigne/',
            enseigne,
        )
    }
}

export default TDCShopEnseigneApi;