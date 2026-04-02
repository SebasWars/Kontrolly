export interface StocksTypes {
  warehouse: string;
  id: string;
  items: Items[];
}

export type Items = {
  id: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  purchase_price: number;
  sales_price: number;
};
