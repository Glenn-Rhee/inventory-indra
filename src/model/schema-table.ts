import z from "zod";

export const schema = z.object({
  Id: z.string(),
  Name: z.string(),
  Category: z.enum(["MEDICINE", "ESSENTIALS"]),
  Price: z.number(),
  StatusExpired: z.enum(["SAFE", "WARNING", "EXPIRED"]),
  ExpiredDate: z.coerce.date(),
});

export const schemaTransactions = z.object({
  product_id: z.string(),
  product_name: z.string(),
  transaction_type: z.enum(["IN", "OUT"]),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
  transaction_date: z.string(),
});

export const schemaStocks = z.object({
  id: z.string(),
  product_name: z.string(),
  stock: z.number(),
  expired_date: z.string(),
  expired_status: z.enum(["SAFE", "WARNING", "EXPIRED"]),
  last_updated: z.string(),
});
