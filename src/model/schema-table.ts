import z from "zod";

export const schema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.enum(["MEDICINE", "ESSENTIALS"]),
  stock: z.number(),
  price: z.number(),
  expired_status: z.enum(["SAFE", "WARNING", "EXPIRED"]),
  expired_date: z.string(),
});

export const schemaTransactions = z.object({
  product_id: z.number(),
  product_name: z.string(),
  transaction_type: z.enum(["IN", "OUT"]),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
  transaction_date: z.string(),
});

export const schemaStocks = z.object({
  id: z.number(),
  product_name: z.string(),
  stock: z.number(),
  expired_date: z.string(),
  expired_status: z.enum(["SAFE", "WARNING", "EXPIRED"]),
  last_updated: z.string(),
});
