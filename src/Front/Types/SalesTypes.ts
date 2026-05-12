export interface SaleItems {
  id: string;
  name: string;
  image_url: string | null;
  quantity: number;
  sales_price: number;
}

export interface currentSale {
  id: string;
  name: string;
  image_url: string | null;
  sales_price: number;
  quantity: number;
}
