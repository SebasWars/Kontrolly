import type { NewItem } from "../Types/StockTypes";

export function validateNewItem(form: NewItem) {
  const errors: Partial<Record<keyof NewItem, string>> = {};

  if (form.name.trim() === "") {
    errors.name = "Required";
  }

  if (form.description.trim() === "") {
    errors.description = "Required";
  }

  if (form.purchase_price.trim() === "") {
    errors.purchase_price = "Required";
  }

  if (form.sales_price.trim() === "") {
    errors.sales_price = "Required";
  }

  if (form.quantity.trim() === "") {
    errors.quantity = "Required";
  }

  if (!form.image) {
    errors.image = "Required";
  }

  return errors;
}


export function validateUpdateItem(form: NewItem) {
  const errors: Partial<Record<keyof NewItem, string>> = {};

  if (form.name.trim() === "") {
    errors.name = "Required";
  }

  if (form.description.trim() === "") {
    errors.description = "Required";
  }

  if (form.purchase_price.trim() === "") {
    errors.purchase_price = "Required";
  }

  if (form.sales_price.trim() === "") {
    errors.sales_price = "Required";
  }

  if (form.quantity.trim() === "") {
    errors.quantity = "Required";
  }


  return errors;
}