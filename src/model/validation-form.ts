import z from "zod";

export default class ValidationForm {
  static readonly CREATEUSER = z.object({
    username: z
      .string({ error: "Please fill username properly!" })
      .min(10, { error: "Minimum length of username is 10" }),
    password: z
      .string({ error: "Please fill password properly!" })
      .min(8, { error: "Minimum length of password is 8" }),
  });

  static readonly CREATEPRODUCT = z.object({
    name: z
      .string({ error: "Please fill name product properly!" })
      .min(3, { error: "Minimum length of product name is 3!" }),
    category: z.enum(["MEDICINE", "ESSENTIALS"], {
      error: "Please fill category only MEDICINE or ESSENTIALS",
    }),
    stock: z.number({ error: "Please fill stock of product properly!" }),
    price: z
      .number({ error: "Please fill price of product properly!" })
      .min(500, { error: "Minimum of price is Rp500" }),
    expiredDate: z.date({ error: "Please fill expired date properly!" }),
  });

  static readonly EDITPRODUCT = z.object({
    name: z
      .string({ error: "Please fill name product properly!" })
      .min(3, { error: "Minimum length of product name is 3!" }),
    category: z.enum(["MEDICINE", "ESSENTIALS"], {
      error: "Please fill category only MEDICINE or ESSENTIALS",
    }),
    price: z
      .number({ error: "Please fill price of product properly!" })
      .min(500, { error: "Minimum of price is Rp500" }),
  });
}
