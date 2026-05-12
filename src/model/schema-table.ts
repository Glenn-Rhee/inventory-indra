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
  Id: z.string(),
  Name: z.string(),
  Stock: z.number(),
  StatusStock: z.enum(["SAFE", "LOW-STOCK", "SOLD-OUT"]),
  StatusExpired: z.enum(["SAFE", "WARNING", "EXPIRED"]),
  ExpiredDate: z.date(),
  LastUpdate: z.date(),
});
