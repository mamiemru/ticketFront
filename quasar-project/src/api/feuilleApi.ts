
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
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }    

    static getSummaryOfTheMonth(feuille_id: number): Promise<AxiosResponse<TableFeuilleSummary>> {
        return axiosConfig.get<TableFeuilleSummary>(
            `/feuille/monthly/${feuille_id}/summary/`,
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }

    static getGraphOfTheMonth(feuille_id: number): Promise<AxiosResponse<ChartLines>> {
        return axiosConfig.get<ChartLines>(
            `/feuille/monthly/${feuille_id}/plot/`,
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }

    static getGraphOfTheMonthShop(feuille_id: number): Promise<AxiosResponse<ChartLines>> {
        return axiosConfig.get<ChartLines>(
            `feuille/monthly/${feuille_id}/plot/shop/`,
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }
    
    static getYearMonth(): Promise<AxiosResponse<FeuilleIds[]>> {
        return axiosConfig.get<FeuilleIds[]>(
            'feuille/',
            {
                headers: {
                    Accept: 'application/json'
                },
            },
        );
    }
}

export default FeuilleApi;