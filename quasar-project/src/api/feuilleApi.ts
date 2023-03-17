
import { AxiosResponse } from 'axios';
import { FeuilleIds } from '../models/models';
import { TableFeuilleResponse } from '../models/models';
import { TableFeuilleSummary } from '../models/models';
import { ChartLines } from '../models/models';
import axiosConfig from '../api/axiosConfig';

class FeuilleApi {
    
    static getTableOfTheMonth(feuille_id: number): Promise<AxiosResponse<TableFeuilleResponse>> {
        return axiosConfig.get<TableFeuilleResponse>(
            `/feuille/monthly/${feuille_id}/table/`,
        );
    }    

    static getSummaryOfTheMonth(feuille_id: number): Promise<AxiosResponse<TableFeuilleSummary>> {
        return axiosConfig.get<TableFeuilleSummary>(
            `/feuille/monthly/${feuille_id}/summary/`,
        );
    }

    static getGraphOfTheMonth(feuille_id: number): Promise<AxiosResponse<ChartLines>> {
        return axiosConfig.get<ChartLines>(
            `/feuille/monthly/${feuille_id}/plot/`,
        );
    }

    static getGraphOfTheMonthShop(feuille_id: number): Promise<AxiosResponse<ChartLines>> {
        return axiosConfig.get<ChartLines>(
            `feuille/monthly/${feuille_id}/plot/shop/`,
            
        );
    }
    
    static getYearMonth(): Promise<AxiosResponse<FeuilleIds[]>> {
        return axiosConfig.get<FeuilleIds[]>(
            'feuille/',
            
        );
    }
}

export default FeuilleApi;