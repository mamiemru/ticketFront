
import { AxiosResponse } from 'axios';
import { FeuilleIds } from '../models/models';
import { TableFeuilleResponse } from '../models/models';
import { TableFeuilleSummary } from '../models/models';
import { ChartLines } from '../models/models';
import FeuilleApi from 'src/api/feuilleApi';

class FeuilleService {
    
    static getTableOfTheMonth(feuille_id: number | undefined): Promise<AxiosResponse<TableFeuilleResponse>> {
        if (feuille_id) {
            return FeuilleApi.getTableOfTheMonth(feuille_id);
        }
        throw new Error('id is undefined')
    }    

    static getSummaryOfTheMonth(feuille_id: number): Promise<AxiosResponse<TableFeuilleSummary>> {
        if (feuille_id) {
            return FeuilleApi.getSummaryOfTheMonth(feuille_id);
        }
        throw new Error('id is undefined')
    }

    static getGraphOfTheMonth(feuille_id: number): Promise<AxiosResponse<ChartLines>> {
        if (feuille_id) {
            return FeuilleApi.getGraphOfTheMonth(feuille_id);
        }
        throw new Error('id is undefined')
    }

    static getGraphOfTheMonthShop(feuille_id: number): Promise<AxiosResponse<ChartLines>> {
        if (feuille_id) {
            return FeuilleApi.getGraphOfTheMonthShop(feuille_id);
        }
        throw new Error('id is undefined')
    }
    
    static getYearMonth(): Promise<AxiosResponse<FeuilleIds[]>> {
        return FeuilleApi.getYearMonth();
    }
}

export default FeuilleService;