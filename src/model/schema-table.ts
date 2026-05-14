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
  Id: z.string(),
  ProductName: z.string(),
  TransactionType: z.enum(["IN", "OUT"]),
  Quantity: z.number(),
  Price: z.number(),
  TotalPrice: z.number(),
  TransactionDate: z.date(),
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
