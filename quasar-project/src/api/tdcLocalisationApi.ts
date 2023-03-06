
import { AxiosResponse } from 'axios';
import axiosConfig from '../api/axiosConfig';

class TDCLocalisationApi {

    static getLocalisations(): Promise<AxiosResponse<string[]>> {
        return axiosConfig.get<string[]>(
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