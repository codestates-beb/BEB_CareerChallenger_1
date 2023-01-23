import { purchase } from ".";

export const publicPurchase = (data) => {
  return purchase.post("publicPurchase", data);
};

export const privatePurchase = (data) => {
  return purchase.post("privatePurchase", data);
};

