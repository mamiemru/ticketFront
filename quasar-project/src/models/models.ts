
export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface TDCShop {
  id: number;
  name: string;
}

export interface TDCLocalisation {
  id: number;
  name: string;
}

export interface TDCCategory {
  id: number;
  name: string;
  required: boolean;
}

export interface TDCGroup {
  id?: number;
  name?: string;
}

export interface ShopNameResponse {
  shop: string[];
  categorie: string[];
}

export interface OnChangedShopNameResponse {
  tdc_localisation: string[];
  tdc_category: string[];
  item_ident: string[];
  item_category: string[];
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
  localisation: TDCLocalisation;
  date: string;
  category: TDCCategory;
  total?: number;
}

export interface TDCAttachement {
  category: string;
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
  ident: string;
  name?: string;
  category?: TDCCategory;
  group?: TDCGroup;
  attachement?: TDCAttachement;
}

export interface Article {
  quantity: number,
  price: number;
  remise: number,
  item: ItemArticle
}

export interface TicketDeCaisse {
  id: string;
  shop: TDCShop;
  localisation: TDCLocalisation;
  date: string;
  category: TDCCategory;
  articles: Article[];
  attachement: TDCAttachement;
  total?: number | null;
}

export interface ItemArticlePagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: ItemArticle[];
}