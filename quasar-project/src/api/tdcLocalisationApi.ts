
import { AxiosResponse } from 'axios';
import { TDCLocalisation } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class TDCLocalisationApi {

    static getLocalisations(): Promise<AxiosResponse<TDCLocalisation[]>> {
        return axiosConfig.get<TDCLocalisation[]>(
            'ticket_de_caisse/localisation/',
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }

}

export default TDCLocalisationApi;