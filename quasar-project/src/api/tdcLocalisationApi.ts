
import { AxiosResponse } from 'axios';

class TDCLocalisationApi {

    static getLocalisations(): Promise<AxiosResponse<string[]>> {
        throw new Error('Deprecated call');
        /*
        return axiosConfig.get<string[]>(
            'ticket_de_caisse/localisation/',
            
        );*/
    }

}

export default TDCLocalisationApi;