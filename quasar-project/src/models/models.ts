
export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Ref<T> {
  value: T;
}

export interface TDCEnseigne {
  id: number | undefined;
  name: string;
  icon: string;
}

export interface TDCShop {
  id: number | undefined;
  enseigne: TDCEnseigne;
  ident: string;
  name: string;
  city: string;
  postal_code: number;
  localisation: string;
  valide: boolean;
}

export interface TDCCategory {
  id: number;
  name: string;
  required: boolean;
  description: string;
}

export interface TDCGroup {
  id: number;
  name: string;
}

export interface TDCBrand {
  id: number;
  name: string;
}

export interface ShopNameResponse {
  shop: string[];
  categorie: string[];
}

export interface OnChangedShopNameResponse {
  tdc: TDCShop
  tdc_category: string[];
  item_ident: string[];
  item_category: string[];
  item_brand: string[];
  item_name: string[];
  item_group: string[];
  quant: number;
  remise: number;
}

export interface OnChangedArticleIdentResponse {
  name: string;
  category: TDCCategory;
  attachement: TDCAttachement;
  price: number;
  group: TDCGroup;
  quant: number;
  remise: number;
}

export interface TicketDeCaisseHeaderResponse {
  id: number;
  shop: TDCShop;
  date: string;
  category: TDCCategory;
  total: number;
  type: string;
  remise: number;
}

export interface TDCAttachement {
  category: string;
  type: string;
  id: number;
  image: string;
  name: string;
}

export interface TableFeuilleRow {
    name : string;
    date : string;
    price : number;
    priceOnlyRequired : number;
}

export interface TableFeuilleBody {
    name: string;
    header: TableFeuilleRow;
    rows: TableFeuilleRow[];
}

export interface TableFeuilleCategory {
    category: string;
    header: TableFeuilleRow;
    body: Map<string, TableFeuilleBody>;
}

export interface TableFeuilleResponse {
    items: Map<string, TableFeuilleCategory>;
}

export interface TableFeuilleSummary {
  tttheorique_v: number;
  ttdepense: number;
  factures: number;
  ttevitable: number;
  tteparge: number;
  ttconfort: number;
  dep: number;
  mj: number;
}

export interface PlotLineMonthResponse {
  x: number[],
  xy: number[],
  threeshold: number,
  currentDay: number,
  yearmonth: string
}

export interface FeuilleIds {
  id: number;
  date: number;
}

export interface ItemArticle {
  id: number;
  ean13: number;
  ident: string;
  name?: string;
  category?: TDCCategory;
  group?: TDCGroup;
  attachement?: TDCAttachement;
  brand?: TDCBrand;
}

export interface TicketDeCaisseHeader {
  id: string;
  shop: TDCShop;
  date: string;
  category: TDCCategory;
  total: number;
  type: string;
  remise: number;
}

export interface Article {
  quantity: number;
  price: number;
  remise: number;
  item: ItemArticle;
  tdc: TicketDeCaisseHeader
}

export interface TicketDeCaisse {
  id: string;
  shop: TDCShop;
  date: string;
  category: TDCCategory;
  articles: Article[];
  attachement: TDCAttachement;
  total: number;
  type: string;
  remise: number;
  need_to_be_validated: boolean;
}

export interface UnvalidatedTicketDeCaisse {
  id: string;
  field: TicketDeCaisse
}

export interface ItemArticlePagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: ItemArticle[];
}

export interface ChartSerie {
  name: string;
  data: number[];
}

export interface ChartOptionsText {
  text?: string;
}

export interface ChartOptionsAxisTitle {
  text?: string;
}

export interface ChartOptionsAxis {
  categories?: string[];
  title: ChartOptionsAxisTitle;
  min?: number;
  max?: number;
}

export interface ChartOptions {
  colors: string[];
  title: ChartOptionsText;
  xaxis: ChartOptionsAxis;
  yaxis: ChartOptionsAxis;
}

export interface IChartOptionsChart {
  height: number
  type: string,
  dropShadow: {
    enabled: boolean,
    color: string,
    top: number,
    left: number,
    blur: number,
    opacity: number
  },
  toolbar: {
    show: false
  }
}

export interface IChartLines {
  series:  ChartSerie[];
  chartOptions: ChartOptions;
}

export class ChartPie {
  series = [] as number[];
  chartOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: [] as string[],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
}

export class ChartLines implements IChartLines {
  series = [] as ChartSerie[];
  chartOptions = {
    chart: { 
      height:350, type:'line',
      dropShadow: { enabled: true, color: '#000', top: 18, left: 7, blur: 10, opacity: 0.2 },
      toolbar: { show: false }
    },
    dataLabels: { enabled: true, },
    stroke: { curve: 'smooth' },
    colors: [ '#545454'],
    title: { text: '', align: 'left' },
    xaxis: { categories: [], title: { text: '' } } as ChartOptionsAxis,
    yaxis: { title: { text: '' } } as ChartOptionsAxis,
    grid: { borderColor: '#e7e7e7', row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } },
    markers: { size: 1 },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  } as ChartOptions;
}

export class AArticle implements Article {
  quantity = 0;
  remise = 0.0;
  price = 0;
  item = { group: {} as TDCGroup, category: {} as TDCCategory } as ItemArticle;
  tdc = { shop: {} as TDCShop, category: {} as TDCCategory } as TicketDeCaisseHeader;
  
}

export interface RemiseInterface {
  remise: number;
  total: number;
}

export interface MlAttachementTicket {
  id: number;
  attachement: TDCAttachement;
  gcp_datas: object;
  json_datas: object;
  valide: boolean;
  tdc: TicketDeCaisseHeaderResponse;
}

export interface MlAttachementTicketPagginationResult {
  count: number;
  next: string;
  previous: string;
  results: MlAttachementTicket[];

}