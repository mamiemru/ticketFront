
import { AxiosResponse } from 'axios';
import axiosConfig from '../api/axiosConfig';

class ApiKeyApi {
    
    static check(): Promise<AxiosResponse<null>> {
        return axiosConfig.get<null>(
            '/api-auth/check/',
        );
    }
}

export default ApiKeyApi;