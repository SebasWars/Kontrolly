export interface WarehousesMeta {
  warehouse: string;
  id: string;
}

export interface WarehousesDetails extends WarehousesMeta {
  items: Items[];
}

export type CreateStockType = Omit<WarehousesDetails, "id">;

export type Items = {
  id: string;
  name: string;
  image_url: string | null;
  description: string;
  quantity: number;
  purchase_price: number;
  sales_price: number;
};

export type NewItem = {
  name: string;
  image: File | null;
  description: string;
  quantity: string;
  purchase_price: string;
  sales_price: string;
};

export type ModifyFormData = <K extends keyof NewItem>(
  key: K,
  value: NewItem[K],
) => void;

export interface PropsCreateItemChild {
  formData: NewItem;
  modifyFormData: ModifyFormData;
}

export type PropsCreateItemImage = Omit<PropsCreateItemChild, "formData">;
