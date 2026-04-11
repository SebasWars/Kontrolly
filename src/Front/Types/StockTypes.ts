export interface StocksTypes {
  warehouse: string;
  id: string;
  items: Items[];
}

export type Items = {
  id: string;
  name: string;
  image: File | null;
  description: string;
  quantity: number | "";
  purchase_price: number | "";
  sales_price: number | "";
};

export type NewItem = Omit<Items, "id">;

export type ModifyFormData = <K extends keyof NewItem>(
  key: K,
  value: NewItem[K],
) => void;

export interface PropsCreateItemChild {
  formData: NewItem;
  modifyFormData: ModifyFormData;
}

export type PropsCreateItemImage = Omit<PropsCreateItemChild, "formData">;
