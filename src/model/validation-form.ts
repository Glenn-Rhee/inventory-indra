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
}
