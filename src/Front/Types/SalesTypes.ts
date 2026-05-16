export interface SaleItems {
  id: string;
  name: string;
  image_url: string | null;
  quantity: number;
  sales_price: number;
}

export type PopupState = {
  open: boolean,
  type: "create" | "update" | "sale" | null;
  title: string;
  message: string;
}