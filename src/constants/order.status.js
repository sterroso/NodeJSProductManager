const ORDER_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
  PACKING: "packing",
  SHIPPED: "shipped",
  LOCAL_DELIVERY: "local delivery",
  FULFILLED: "fulfilled",
};

export const DEFAULT_ORDER_STATUS = ORDER_STATUS.OPEN;

export default ORDER_STATUS;
