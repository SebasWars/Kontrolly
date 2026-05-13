import type { Actions, State } from "../Types/ReducerTypes";

export const initalState: State = {
  warehouses: [],
  selectedWarehouseId: null,
  warehouseItems: [],
  selectWarehouseSalesId: null,
  itemsSales: [],
  currentSale: [],
};

export const warehouseReducer = (state: State, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    /* WAREHOUSES FATHER ACTIONS */
    case "SET_WAREHOUSES":
      return { ...state, warehouses: payload };
    /* WAREHOUSE CHILDREN ACTIONS */
    case "SELECT_WAREHOUSE_STOCK":
      return { ...state, selectedWarehouseId: payload };
    case "SET_WAREHOUSE_ITEMS":
      return { ...state, warehouseItems: payload };
    /* WAREHOUSE FOR SALES */
    case "SET_WAREHOUSE_SALES":
      return { ...state, selectWarehouseSalesId: payload };
    case "SET_ITEMS_SALES":
      return { ...state, itemsSales: payload };
    case "ADD_ITEM_TO_CART":
      const exist = state.currentSale.find((item) => item.id === payload.id);
      const currentStock = state.itemsSales?.find(
        (item) => item.id === payload.id,
      );
      let updateCart;
      if (!currentStock || currentStock.quantity <= 0) return state;

      if (!exist) {
        updateCart = [...state.currentSale, payload];
      } else {
        return state;
      }

      const updateItemsStock = state.itemsSales?.map((item) =>
        item.id === payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

      return {
        ...state,
        currentSale: updateCart,
        itemsSales: updateItemsStock,
      };
    case "ADD_ONE":
      const stockItemAdd = state.itemsSales.find((item) => item.id === payload);
      if (!stockItemAdd || stockItemAdd.quantity <= 0) return state;

      const addOneCartQuantity = state.currentSale.map((item) =>
        item.id === payload ? { ...item, quantity: item.quantity + 1 } : item,
      );

      const removeOneItemsQuantity = state.itemsSales?.map((item) =>
        item.id === payload ? { ...item, quantity: item.quantity - 1 } : item,
      );

      return {
        ...state,
        currentSale: addOneCartQuantity,
        itemsSales: removeOneItemsQuantity,
      };
    case "REMOVE_ONE":

      const removeOneCartQuantity = state.currentSale
        .map((item) =>
          item.id === payload ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);

      const addOneItemsQuantity = state.itemsSales?.map((item) =>
        item.id === payload ? { ...item, quantity: item.quantity + 1 } : item,
      );

      return {
        ...state,
        currentSale: removeOneCartQuantity,
        itemsSales: addOneItemsQuantity,
      };
    default:
      return state;
  }
};
